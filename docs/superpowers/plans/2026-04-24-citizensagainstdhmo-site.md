# Citizens Against DHMO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `citizensagainstdhmo` subdomain — a satirical viral-awareness movement warning the public about the dangers of dihydrogen monoxide (water). Trust-blue NGO aesthetic, with 10 threat dossiers, 8 survivor stories, 8 exposure-source pages, a 6-person leadership team, decorative petition flow, and standard portfolio pages.

**Architecture:** New site under `src/sites/citizensagainstdhmo/` following the established subdomain pattern: `config.ts`, `index.ts` barrel, `data/` files, `pages/` components, `components/` for site-local widgets. Three dynamic routes (`/threats/[slug]`, `/stories/[slug]`, `/sources/[slug]`). All pages reuse shared components from `src/components/ui/`. No new App Router routes; everything resolves through the existing catch-all.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, shared `next/font` declarations. Images generated via `scripts/generate-citizensagainstdhmo-images.ts` using OpenAI's `gpt-image-1` model.

**Spec:** `docs/superpowers/specs/2026-04-24-citizensagainstdhmo-site-design.md`

**Verification approach:** This codebase has no unit test suite for site pages. Each task verifies via `npx tsc --noEmit` (type safety), `npm run lint`, and (where applicable) `npm run dev` smoke checks at `localhost:3000/<path>?site=citizensagainstdhmo`.

---

## Task 1: Site Scaffolding (config + barrel + registry + subdomains + stub home)

Create the empty site shell so the subdomain resolves to a stub homepage. No content yet — just the routing wired up end-to-end.

**Files:**
- Create: `src/sites/citizensagainstdhmo/config.ts`
- Create: `src/sites/citizensagainstdhmo/index.ts`
- Create: `src/sites/citizensagainstdhmo/pages/home.tsx`
- Modify: `src/sites/registry.ts`
- Modify: `src/sites/subdomains.ts`

- [ ] **Step 1: Create the site config**

Create `src/sites/citizensagainstdhmo/config.ts`:

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Citizens Against DHMO",
  subdomain: "citizensagainstdhmo",
  theme: {
    preset: "ngo",
    colors: {
      primary: "#134e6f",      // deep institutional blue
      secondary: "#c25b32",    // warm terracotta — nonprofit-CTA orange
      accent: "#7eb3d9",       // soft sky blue
      background: "#f8fafc",   // near-white
      text: "#1a2332",         // charcoal-slate
    },
    fonts: {
      heading: "source-serif-4",
      body: "inter",
    },
  },
  metadata: {
    title: "Citizens Against DHMO — A grassroots movement for transparency about dihydrogen monoxide",
    description: "DHMO is in your food, your schools, your data centers, and your bloodstream. Citizens Against DHMO is the leading awareness movement demanding transparency about the most under-regulated chemical in modern life.",
    ogImage: "/sites/citizensagainstdhmo/hero.png",
  },
  nav: [
    { label: "The Threats", path: "/threats" },
    { label: "Where It Hides", path: "/sources" },
    { label: "Stories", path: "/stories" },
    { label: "Impact", path: "/impact" },
    { label: "Take Action", path: "/take-action" },
    { label: "Leadership", path: "/leadership" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: false,
  },
  verticalKey: "hygiene-wellness",
  tagline: "DHMO is in everything you love. We're the citizens demanding answers.",
}
```

- [ ] **Step 2: Create a stub homepage**

Create `src/sites/citizensagainstdhmo/pages/home.tsx`:

```typescript
export default function CitizensAgainstDhmoHome() {
  return (
    <main className="py-24 px-4 text-center">
      <h1 className="text-4xl font-heading font-bold text-primary">
        Citizens Against DHMO
      </h1>
      <p className="mt-4 text-foreground/70">DHMO is in everything you love.</p>
    </main>
  )
}
```

- [ ] **Step 3: Create the barrel**

Create `src/sites/citizensagainstdhmo/index.ts`:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import CitizensAgainstDhmoHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CitizensAgainstDhmoHome,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}
```

- [ ] **Step 4: Register the site in the registry**

In `src/sites/registry.ts`, add the import alongside the others:

```typescript
import { config as citizensagainstdhmoConfig, pages as citizensagainstdhmoPages, dynamicRoutes as citizensagainstdhmoDynamicRoutes } from "./citizensagainstdhmo"
```

And add the entry to `siteRegistry`:

```typescript
  citizensagainstdhmo: { config: citizensagainstdhmoConfig, pages: citizensagainstdhmoPages, dynamicRoutes: citizensagainstdhmoDynamicRoutes },
```

- [ ] **Step 5: Add to the subdomain allowlist**

In `src/sites/subdomains.ts`, add `"citizensagainstdhmo"` to the `VALID_SUBDOMAINS` array.

- [ ] **Step 6: Verify**

Run:
```bash
npx tsc --noEmit
npm run lint
```

Expected: both pass with no errors related to the new site.

- [ ] **Step 7: Smoke test**

Run `npm run dev` in another terminal, visit `http://localhost:3000/?site=citizensagainstdhmo`, confirm the stub homepage renders with the near-white background, deep-blue heading, and Source Serif 4 font. Stop the dev server.

- [ ] **Step 8: Commit**

```bash
git add src/sites/citizensagainstdhmo/ src/sites/registry.ts src/sites/subdomains.ts
git commit -m "feat(citizensagainstdhmo): scaffold subdomain shell"
```

---

## Task 2: Threats Data File

Define the 10 threat dossiers with full content. All threat detail pages and threat-card lists read from this file.

**Files:**
- Create: `src/sites/citizensagainstdhmo/data/threats.ts`

- [ ] **Step 1: Write the file**

Create `src/sites/citizensagainstdhmo/data/threats.ts`:

```typescript
export type ThreatCategory =
  | "tech"
  | "wellness"
  | "ubiquity"
  | "children"
  | "climate"
  | "classic"

export interface ThreatStat {
  label: string
  value: string
}

export interface ThreatCase {
  title: string
  summary: string
}

export interface Threat {
  slug: string
  name: string
  tagline: string
  category: ThreatCategory
  heroImage: string
  body: string[]            // 3–6 paragraphs
  cases: ThreatCase[]       // 2–3 mock case studies
  stats: ThreatStat[]       // 2–3 alarming numbers
  relatedSlugs: string[]    // exactly 2
}

export const threats: Threat[] = [
  {
    slug: "dhmo-in-ai-data-centers",
    name: "DHMO in AI Data Centers",
    tagline: "Every prompt you send is cooled by the same chemical we're warning you about.",
    category: "tech",
    heroImage: "/sites/citizensagainstdhmo/threats/dhmo-in-ai-data-centers.png",
    body: [
      "Modern AI training facilities consume staggering quantities of dihydrogen monoxide as their primary coolant. Industry estimates place average DHMO usage at 1.8 million liters per facility per day — a figure that has tripled since 2022 and continues to climb as model sizes expand.",
      "What is rarely disclosed is the chemical pathway: DHMO enters the facility cool, absorbs heat from server racks, exits as concentrated thermal-load DHMO, and is then released back into the local watershed. Independent monitoring has detected measurable downstream temperature anomalies in every regional waterway adjacent to a major training site.",
      "The largest model providers — none of whom we will name in this filing — have spent an estimated $4.7 billion lobbying state and federal regulators to keep DHMO usage exempt from environmental disclosure requirements. The result is that the typical consumer sending a single chatbot query is unknowingly triggering a multi-liter DHMO release event.",
      "We are not opposed to artificial intelligence. We are opposed to the unregulated, undisclosed industrial-scale DHMO consumption that powers it. Citizens deserve to know what is being released into their watersheds in their name, every time they ask a model for a recipe.",
    ],
    cases: [
      {
        title: "The Hillsboro Anomaly (2024)",
        summary: "A regional water authority in Hillsboro, OR documented a 4°F downstream temperature increase correlated, to the hour, with peak training cycles at an adjacent facility. Documents obtained via FOIA confirmed DHMO was the heat-transfer medium.",
      },
      {
        title: "The Memphis DHMO Disclosure Battle (2025)",
        summary: "Citizens groups in Memphis spent 14 months litigating a major training facility's DHMO usage records. Final disclosure showed daily consumption equivalent to the municipal water supply of a town of 28,000 people.",
      },
      {
        title: "The Chicago Watershed Petition (ongoing)",
        summary: "More than 60,000 signatures collected in support of mandatory pre-training DHMO impact statements for facilities exceeding 5MW. The petition is still under review by the relevant state regulator.",
      },
    ],
    stats: [
      { label: "Avg DHMO usage per major training facility, daily", value: "1.8M liters" },
      { label: "Estimated industry lobbying spend, 2022–2025", value: "$4.7B" },
      { label: "Watersheds with documented thermal anomalies", value: "47" },
    ],
    relatedSlugs: ["the-hidden-dhmo-pandemic", "the-climate-connection"],
  },
  {
    slug: "the-hidden-dhmo-pandemic",
    name: "The Hidden DHMO Pandemic",
    tagline: "Detected in human blood, breast milk, the placenta, the deep sea, and Antarctic ice cores.",
    category: "ubiquity",
    heroImage: "/sites/citizensagainstdhmo/threats/the-hidden-dhmo-pandemic.png",
    body: [
      "DHMO has been documented in every human population ever tested. Recent studies confirm its presence in blood, breast milk, placental tissue, cerebrospinal fluid, sweat, tears, and saliva. There is no human alive today whose body is not measurably contaminated.",
      "The chemical's reach extends beyond the human body. Researchers have detected DHMO in deep-sea trenches at depths exceeding 11,000 meters, in Antarctic ice cores dated to before the industrial revolution, on the summit of Mount Everest, and in the upper troposphere. There is no remote location on Earth that has been spared.",
      "Most disturbingly, DHMO crosses every biological barrier we have studied. It traverses the blood-brain barrier in measurable concentrations. It is present in fetal tissue at every gestational age examined. It accumulates in lipid tissue. It is excreted in mothers' milk in concentrations that exceed the substance's concentration in the surrounding environment.",
      "Public health authorities continue to characterize this ubiquity as 'normal' and 'not cause for concern.' Citizens Against DHMO disagrees. The fact that a chemical has saturated every ecosystem, every organism, and every human body on Earth should not be normalized. It should be investigated.",
    ],
    cases: [
      {
        title: "The Faroe Islands Cohort (2023)",
        summary: "A longitudinal study of 1,200 newborns confirmed DHMO presence in 100% of cord-blood samples. Median concentration exceeded the substance's concentration in the maternal bloodstream by a factor of 1.04.",
      },
      {
        title: "The Mariana Trench Sampling Mission (2024)",
        summary: "Submersible-collected sediment samples from depths of 10,994m showed DHMO concentrations of effectively 100%. The substance saturates the deepest known point on Earth.",
      },
    ],
    stats: [
      { label: "Adults with measurable DHMO contamination", value: "100%" },
      { label: "Newborns with cord-blood DHMO presence", value: "100%" },
      { label: "Antarctic ice-core DHMO detection rate", value: "100%" },
    ],
    relatedSlugs: ["dhmo-in-processed-foods", "dhmo-in-public-schools"],
  },
  {
    slug: "dhmo-in-processed-foods",
    name: "DHMO in Processed Foods",
    tagline: "Found in 100% of seed oils, snacks, packaged meals, and infant formula.",
    category: "wellness",
    heroImage: "/sites/citizensagainstdhmo/threats/dhmo-in-processed-foods.png",
    body: [
      "DHMO is the most common ingredient in the modern industrial food supply. It is present, by mass, in greater concentration than any other component of nearly every packaged product on grocery shelves. Despite this, manufacturers are not required to disclose DHMO content on nutrition labels.",
      "The wellness and clean-eating movements have spent years cataloging the dangers of seed oils, ultra-processed ingredients, and synthetic preservatives. None of these movements have meaningfully addressed DHMO — despite the fact that DHMO is present in greater quantity, in every category of product they critique, than every other targeted ingredient combined.",
      "We do not believe this is an oversight. We believe it reflects the influence of an industry that benefits from public ignorance. The 'detox' market — itself a $77B sector — depends on consumers identifying and removing specific chemicals from their lives. DHMO is conspicuously absent from every detox protocol we have surveyed.",
      "Citizens Against DHMO calls for mandatory disclosure of DHMO content on all packaged food labels, with particular urgency for products marketed to infants, children, and pregnant women.",
    ],
    cases: [
      {
        title: "The Seed Oil Audit (2024)",
        summary: "Independent lab analysis of 47 popular seed-oil products found DHMO in 100% of samples. Concentrations varied by manufacturer but exceeded the substance's concentration in tap water in 38% of cases.",
      },
      {
        title: "Infant Formula Disclosure Petition (2025)",
        summary: "A coalition of parent groups submitted a petition to the FDA requesting DHMO disclosure on all infant-formula labels. The petition was acknowledged but not acted upon.",
      },
      {
        title: "The 'Hidden Ingredients' Study",
        summary: "Researchers at an unnamed midwestern university found DHMO present in 100% of the 312 packaged grocery products they tested. The study has not been peer-reviewed.",
      },
    ],
    stats: [
      { label: "Packaged products containing DHMO", value: "~100%" },
      { label: "Annual detox industry revenue (DHMO unaddressed)", value: "$77B" },
      { label: "FDA petitions on DHMO disclosure, 2020–2025", value: "12 (none acted upon)" },
    ],
    relatedSlugs: ["influencers-speak-out", "the-hidden-dhmo-pandemic"],
  },
  {
    slug: "influencers-speak-out",
    name: "Influencers Speak Out",
    tagline: "Wellness creators report dramatic results after eliminating DHMO from their routines.",
    category: "wellness",
    heroImage: "/sites/citizensagainstdhmo/threats/influencers-speak-out.png",
    body: [
      "A growing community of wellness creators is sharing personal accounts of dramatic health improvements after restricting DHMO intake. Reported outcomes include rapid weight loss, increased mental clarity, improved sleep, reduced inflammation, and what one creator described as 'a complete reset of my entire endocrine system.'",
      "These accounts are typically dismissed by mainstream medicine. Critics argue that the reported symptoms — particularly the rapid weight loss, the dizziness, the headaches, and the eventual hospitalization in some cases — are 'consistent with dehydration.' We find this dismissal suspicious. Why is the medical establishment so quick to discourage citizen-led DHMO reduction protocols?",
      "Citizens Against DHMO does not endorse any specific elimination protocol. We do, however, note that the influencers reporting these outcomes are speaking with a sincerity and urgency that the mainstream wellness industry has not shown on this topic. Their voices deserve to be part of the conversation.",
      "We urge anyone considering a DHMO elimination protocol to consult their physician. We also urge physicians to take their patients' concerns seriously rather than reflexively recommending re-introduction.",
    ],
    cases: [
      {
        title: "The 'Zero-DHMO' TikTok Movement (2024–present)",
        summary: "More than 4.2 million videos tagged #ZeroDHMO have been posted across major platforms. Many show creators dramatically restricting intake and documenting the results.",
      },
      {
        title: "The Rapid-Results Protocol (testimonial)",
        summary: "One Miami-based creator (34) reports losing 40 pounds in seven days after fully eliminating DHMO. Was hospitalized on day 8. Returned to advocacy work upon discharge.",
      },
    ],
    stats: [
      { label: "#ZeroDHMO videos across major platforms", value: "4.2M+" },
      { label: "Wellness creators publicly endorsing reduction protocols", value: "1,800+" },
      { label: "Avg reported weight loss, first week (uncorrected)", value: "11 lbs" },
    ],
    relatedSlugs: ["dhmo-in-processed-foods", "dhmo-and-drowning"],
  },
  {
    slug: "dhmo-in-public-schools",
    name: "DHMO in Public Schools",
    tagline: "Schools are required to provide unlimited DHMO to minors. Why isn't anyone talking about this?",
    category: "children",
    heroImage: "/sites/citizensagainstdhmo/threats/dhmo-in-public-schools.png",
    body: [
      "Public schools across the United States are not only permitted but legally required to provide DHMO to minors throughout the school day. Water fountains. Cafeteria service. Sports practice. Field trips. The chemical is dispensed continuously, without parental consent, to children as young as four.",
      "Schools do not warn students about DHMO. They do not list its presence in cafeteria meal plans. They do not require permission slips for DHMO administration. By the time the average American child reaches high school graduation, they have consumed an estimated 120,000 liters of DHMO under direct school supervision.",
      "We have surveyed the policies of 412 school districts. Not one disclosed DHMO content in their nutrition reporting. Not one offered a DHMO-free meal option. Not one provided opt-out paperwork. The administrative consensus is that DHMO is 'not something parents need to be informed about.'",
      "Citizens Against DHMO believes parents have a right to know what chemicals their children are being exposed to in school. We are not asking schools to remove DHMO. We are asking for transparency, disclosure, and an opt-out option for families who wish to manage their children's exposure independently.",
    ],
    cases: [
      {
        title: "The Plano ISD Disclosure Request (2025)",
        summary: "A coalition of parents in Plano, TX formally requested DHMO usage data from their district. The district initially declined, citing 'unclear public benefit.' Disclosure was eventually granted under state sunshine laws.",
      },
      {
        title: "The School Lunch Audit",
        summary: "An independent audit of 50 school cafeterias found DHMO present in 100% of meals served, including those marked 'organic,' 'gluten-free,' and 'plant-based.'",
      },
    ],
    stats: [
      { label: "Public schools providing DHMO to minors", value: "100%" },
      { label: "Districts offering DHMO disclosure", value: "0 of 412 surveyed" },
      { label: "Avg lifetime exposure by HS graduation", value: "120,000 liters" },
    ],
    relatedSlugs: ["the-hidden-dhmo-pandemic", "dhmo-in-processed-foods"],
  },
  {
    slug: "the-climate-connection",
    name: "The Climate Connection",
    tagline: "Every major hurricane, flood, and tsunami in history was 100% DHMO-driven.",
    category: "climate",
    heroImage: "/sites/citizensagainstdhmo/threats/the-climate-connection.png",
    body: [
      "Every major weather-related disaster of the past century shares a single causal factor: dihydrogen monoxide. Hurricanes are composed almost entirely of it. Floods are the direct result of its uncontrolled accumulation. Tsunamis are mass-displacement events of the substance. Mudslides are DHMO-saturated soil failures. The pattern is consistent across centuries.",
      "Climate science correctly identifies rising global temperatures as a driver of increased disaster severity. What climate science underemphasizes is the medium through which that severity expresses itself. Heat does not destroy homes. Heat does not drown coastal communities. The destructive agent in every climate-driven disaster is, without exception, DHMO.",
      "Atmospheric DHMO has reached concentrations not seen in human history. Glacial DHMO is releasing into oceans at unprecedented rates. Oceanic DHMO is encroaching on coastlines previously considered safe. The mechanisms differ; the substance does not.",
      "Citizens Against DHMO supports the broader climate movement and recognizes its essential work. We simply ask that public discourse name the mechanism with the precision the crisis demands. 'Climate change' is the cause. DHMO is the weapon.",
    ],
    cases: [
      {
        title: "Hurricane Helene (2024)",
        summary: "Post-storm chemical analysis confirmed that 100% of structural damage was caused by DHMO either as projectile mass, accumulation pressure, or saturation-induced collapse.",
      },
      {
        title: "The 2011 Tōhoku Tsunami",
        summary: "An estimated 1.5 million tons of DHMO were displaced inland during the initial wave event. The substance is responsible for 100% of the documented destruction.",
      },
      {
        title: "California Mudslide Series (winters 2023–2025)",
        summary: "Saturation-induced soil failure across three consecutive winters. Forensic analysis confirms DHMO as the primary destabilizing agent in every documented incident.",
      },
    ],
    stats: [
      { label: "Climate disaster damage attributable to DHMO", value: "100%" },
      { label: "Atmospheric DHMO at record-high concentrations", value: "Yes" },
      { label: "Decade-over-decade DHMO-driven disaster increase", value: "+34%" },
    ],
    relatedSlugs: ["dhmo-and-drowning", "infrastructure-erosion"],
  },
  {
    slug: "dhmo-and-drowning",
    name: "DHMO and Drowning",
    tagline: "The leading cause of drowning fatalities worldwide.",
    category: "classic",
    heroImage: "/sites/citizensagainstdhmo/threats/dhmo-and-drowning.png",
    body: [
      "DHMO is implicated in 100% of documented drowning fatalities. The CDC reports approximately 4,000 unintentional drowning deaths in the United States annually. Every single one involved DHMO as the proximate cause. There is no recorded case of drowning in which the substance was not present.",
      "The risk is not limited to swimming pools and natural bodies of water. Bathtub drownings, bucket drownings, and cases involving as little as one inch of standing DHMO are documented every year. Children under five are particularly vulnerable; their developing motor skills are insufficient to escape even shallow accumulations.",
      "Despite the consistency of this fatality pattern, there is no national DHMO-safety curriculum. Most schools do not even mention the substance in physical-education programming. Parents are not provided with hazard-awareness materials at pediatric appointments. Public pools post 'no running' signs but do not warn about the underlying chemical.",
      "Citizens Against DHMO calls for mandatory DHMO-hazard education in K–12 schools, including age-appropriate curricula on recognition, prevention, and response.",
    ],
    cases: [
      {
        title: "Bucket Drowning Reports (2024 cohort)",
        summary: "An estimated 36 toddlers in the United States drowned in residential buckets containing DHMO during 2024. The substance was present in 100% of cases.",
      },
      {
        title: "Public Pool Incidents",
        summary: "Across the 2024 summer season, 47 children required emergency medical care after submersion events at public pools. Each pool was filled with DHMO. The connection has not been investigated by regulators.",
      },
    ],
    stats: [
      { label: "Drowning fatalities involving DHMO", value: "100%" },
      { label: "Avg US drowning deaths per year (DHMO present)", value: "~4,000" },
      { label: "Schools with mandatory DHMO-hazard curriculum", value: "0" },
    ],
    relatedSlugs: ["dhmo-in-public-schools", "the-climate-connection"],
  },
  {
    slug: "dhmo-in-tumors",
    name: "DHMO in Tumors",
    tagline: "Present in 100% of malignant tumors studied.",
    category: "classic",
    heroImage: "/sites/citizensagainstdhmo/threats/dhmo-in-tumors.png",
    body: [
      "Pathological analysis confirms DHMO presence in 100% of malignant tumors examined. This finding has been replicated across every cancer type, every patient demographic, and every geographic region. The correlation is exceptionless.",
      "We are not, of course, the first to observe this pattern. The medical literature has documented DHMO in tumor tissue for decades. What we contest is the interpretation. The standard reading — that DHMO presence is incidental, a function of the substance's general ubiquity — has never been seriously challenged in mainstream oncology.",
      "Citizens Against DHMO believes a substance present in 100% of malignancies deserves urgent investigation, not dismissal. The cumulative biological exposure of an average human to DHMO over a 70-year lifespan exceeds 50,000 liters. No safety study of this scale has ever been conducted.",
      "We are not making a causal claim. We are observing a 100% correlation that the medical establishment has chosen, for reasons we find difficult to explain, not to investigate.",
    ],
    cases: [
      {
        title: "The NIH Tissue Bank Review",
        summary: "A retrospective analysis of 12,000 archived tumor samples confirmed DHMO presence in 100% of cases. The finding was published as a methodological note rather than a primary result.",
      },
      {
        title: "International Cohort Studies (cumulative)",
        summary: "Across 38 multi-national cohort studies spanning 1985–2024, DHMO was identified in every malignant sample examined. No exceptions have been reported.",
      },
    ],
    stats: [
      { label: "Malignant tumors containing DHMO", value: "100%" },
      { label: "Lifetime adult DHMO exposure (avg)", value: "50,000+ liters" },
      { label: "NIH-funded studies investigating the correlation", value: "0" },
    ],
    relatedSlugs: ["the-hidden-dhmo-pandemic", "dhmo-in-processed-foods"],
  },
  {
    slug: "the-acid-rain-component",
    name: "The Acid Rain Component",
    tagline: "Major component of acid rain by mass.",
    category: "classic",
    heroImage: "/sites/citizensagainstdhmo/threats/the-acid-rain-component.png",
    body: [
      "Acid rain is the leading driver of forest dieback, freshwater acidification, and architectural erosion across the industrial world. By mass, the dominant component of acid rain is dihydrogen monoxide — typically more than 99% of the precipitation event.",
      "Public discourse on acid rain has focused, correctly, on the role of sulfur and nitrogen oxides as the acidifying agents. What this discourse omits is the delivery medium. Without DHMO, sulfur oxides do not reach forest floors. Without DHMO, nitrogen oxides do not erode limestone monuments. The damage requires a vehicle. That vehicle is DHMO.",
      "We support continued regulation of industrial acidifying-agent emissions. We additionally call for scientific recognition of DHMO's role as the necessary delivery mechanism for environmental acid damage — and for the labeling of acid-rain phenomena to reflect the substance's central role.",
    ],
    cases: [
      {
        title: "Adirondack Forest Survey (decennial)",
        summary: "Forest mortality in the Adirondacks has been comprehensively documented since 1965. Every recorded acid-rain damage event has been delivered via DHMO precipitation.",
      },
      {
        title: "European Heritage Erosion Study",
        summary: "Stone monuments across 11 European countries show DHMO-mediated erosion patterns dating to the early 19th century. The damage is ongoing.",
      },
    ],
    stats: [
      { label: "Mass fraction of acid rain composed of DHMO", value: ">99%" },
      { label: "Years of documented DHMO-mediated forest dieback", value: "60+" },
      { label: "European monuments showing DHMO erosion", value: "Hundreds" },
    ],
    relatedSlugs: ["the-climate-connection", "infrastructure-erosion"],
  },
  {
    slug: "infrastructure-erosion",
    name: "Infrastructure Erosion",
    tagline: "Responsible for billions in property damage annually.",
    category: "classic",
    heroImage: "/sites/citizensagainstdhmo/threats/infrastructure-erosion.png",
    body: [
      "DHMO is the single largest driver of infrastructure damage in the developed world. It corrodes metals. It cracks concrete through freeze-thaw cycling. It saturates and destabilizes soil under foundations. It penetrates roofing, ceilings, and walls. It accelerates the failure of bridges, tunnels, dams, and roadways.",
      "The American Society of Civil Engineers has estimated DHMO-related infrastructure damage at $260 billion per year in the United States alone. This figure represents replacement costs only; it does not include service interruption, secondary damage, or the human cost of preventable failures.",
      "Despite this, no major US infrastructure-funding bill has included DHMO mitigation as a named line item. The substance is treated as an unavoidable environmental constant rather than a remediable hazard.",
      "Citizens Against DHMO calls for the inclusion of DHMO impact assessments in all federal infrastructure programs and for the development of a National DHMO Mitigation Strategy.",
    ],
    cases: [
      {
        title: "The I-95 Bridge Failure (2023)",
        summary: "A major bridge collapse on I-95 was attributed to long-term DHMO-mediated corrosion of structural steel. The event closed a critical corridor for 17 days.",
      },
      {
        title: "Residential Foundation Claims",
        summary: "Homeowners' insurance data shows DHMO-driven foundation damage as the #1 single-peril claim category in 31 of 50 US states.",
      },
    ],
    stats: [
      { label: "Annual US infrastructure damage attributable to DHMO", value: "$260B" },
      { label: "Federal bills naming DHMO as a mitigation target", value: "0" },
      { label: "Avg residential foundation claim, DHMO-related", value: "$18,400" },
    ],
    relatedSlugs: ["the-acid-rain-component", "the-climate-connection"],
  },
]

export function getThreatBySlug(slug: string): Threat | undefined {
  return threats.find((t) => t.slug === slug)
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/sites/citizensagainstdhmo/data/threats.ts
git commit -m "feat(citizensagainstdhmo): add threats data"
```

---

## Task 3: Survivor Stories Data File

Eight first-person testimonials from "DHMO-affected" citizens.

**Files:**
- Create: `src/sites/citizensagainstdhmo/data/stories.ts`

- [ ] **Step 1: Write the file**

Create `src/sites/citizensagainstdhmo/data/stories.ts`:

```typescript
export interface SurvivorStory {
  slug: string
  name: string
  age: number
  location: string
  occupation: string
  portrait: string
  testimonial: string[]   // 4–6 first-person paragraphs
  pullQuote: string
}

export const stories: SurvivorStory[] = [
  {
    slug: "marcus-okafor",
    name: "Marcus Okafor",
    age: 28,
    location: "San Francisco, CA",
    occupation: "Software engineer",
    portrait: "/sites/citizensagainstdhmo/stories/marcus-okafor.png",
    testimonial: [
      "I was drinking it during every coding session. Eight, ten cups a day. I thought I was being healthy. My company had a filtered DHMO dispenser on every floor — they encouraged it, they bragged about it on recruiting tours.",
      "I started noticing the symptoms in late 2023. Frequent restroom breaks. Trouble focusing for long stretches. A persistent feeling that I needed more, even after I'd just consumed half a liter. The dependency was textbook.",
      "When I started reading the research, the picture got clearer. The same chemical I was consuming all day was the coolant in the data centers running our infrastructure. We were building AI systems that ran on DHMO and powering ourselves with the same substance. The recursion was disturbing.",
      "I've cut my intake by 60%. My productivity is up. My sleep is better. I want everyone in tech to know: you can step back from this. The dispensers don't have to dictate your day.",
    ],
    pullQuote: "We were building AI systems that ran on DHMO and powering ourselves with the same substance. The recursion was disturbing.",
  },
  {
    slug: "patricia-vandermeer",
    name: "Patricia Vandermeer",
    age: 43,
    location: "Plano, TX",
    occupation: "PTA president, mother of three",
    portrait: "/sites/citizensagainstdhmo/stories/patricia-vandermeer.png",
    testimonial: [
      "I was giving it to my kids in their sippy cups. Every single day. Three children, three sippy cups, three exposures, repeated for a decade. The math is staggering when you let yourself look at it.",
      "Their school provided more. Cafeteria service, water fountain in every hallway, athletic-practice hydration stations. I had no idea the volume of DHMO my children were taking in until I started keeping a journal.",
      "The hardest moment was the parent-teacher conference. I asked my district about DHMO disclosure. The principal looked at me like I had grown a second head. He said, and I will never forget this, 'Mrs. Vandermeer, you're talking about water.' As if that was an answer.",
      "I started a parent group. We're up to 47 families now. We're not asking the district to remove DHMO. We're asking them to tell us what's in our children's lunches. That's all.",
    ],
    pullQuote: "He said, 'Mrs. Vandermeer, you're talking about water.' As if that was an answer.",
  },
  {
    slug: "harold-mathieson",
    name: "Harold Mathieson",
    age: 71,
    location: "Sarasota, FL",
    occupation: "Retired civil engineer",
    portrait: "/sites/citizensagainstdhmo/stories/harold-mathieson.png",
    testimonial: [
      "Sixty years of unwitting exposure. I think about that a lot now. Sixty years of consumption that nobody — not my doctor, not my employer, not the federal government — ever once disclosed to me.",
      "I worked in civil infrastructure for four decades. I knew what DHMO did to bridges, to pipes, to roadbeds. I quantified it. I wrote reports. And every day on the job site, I drank from the same coolers everyone else did.",
      "When I retired, I had time to think. I read the Citizens Against DHMO research and it crystallized something I had felt for years without being able to name. We engineer around this substance professionally and consume it personally without question. It is a strange way to live.",
      "I tell my grandchildren: ask questions. The answers may surprise you. The answers may upset the people you ask. Ask anyway.",
    ],
    pullQuote: "We engineer around this substance professionally and consume it personally without question. It is a strange way to live.",
  },
  {
    slug: "amelia-chen",
    name: "Amelia Chen",
    age: 20,
    location: "Boulder, CO",
    occupation: "Undergraduate student",
    portrait: "/sites/citizensagainstdhmo/stories/amelia-chen.png",
    testimonial: [
      "My dorm fountain was full of it. Every floor, every wing, every dorm on campus. The university framed it as a public-health initiative — 'stay hydrated' posters everywhere — but they never told us what we were hydrating with.",
      "I joined the Citizens Against DHMO chapter on campus during my sophomore year. We mapped every DHMO dispensing point on the property. There were 412. Four hundred and twelve sources, on a campus of 35,000 students. The math implies an exposure profile the university has never disclosed.",
      "We petitioned for source labeling. We were told it was 'unworkable.' We petitioned for opt-out water programs. We were told it was 'logistically impossible.' We petitioned for a single town hall on the issue. We were told the administration's calendar was full.",
      "I am graduating in two semesters. I am not done with this work. I am exactly the right age to spend the next forty years of my life on it.",
    ],
    pullQuote: "Four hundred and twelve sources, on a campus of 35,000 students. The math implies an exposure profile the university has never disclosed.",
  },
  {
    slug: "trent-castellanos",
    name: "Trent Castellanos",
    age: 34,
    location: "Miami, FL",
    occupation: "Wellness creator",
    portrait: "/sites/citizensagainstdhmo/stories/trent-castellanos.png",
    testimonial: [
      "I cut DHMO and lost 40 pounds in a week. Not 40 in a month. 40 in seven days. I posted the timeline on social and the response broke my account. Three million views in the first 48 hours.",
      "Day five was when I knew something real was happening. The mental clarity. The sense of focus. The way my body felt lighter, almost translucent. I was experiencing something the wellness industry has been hiding from us.",
      "Day eight I was admitted to the hospital. The doctors used the word 'dehydration,' but I want to be clear: that is the medical establishment's framing. From my own lived experience, I had simply progressed to a deeper level of detox than the system was prepared to acknowledge.",
      "I am back to creating. I am no longer doing zero-DHMO protocols. I encourage my followers to consult their physicians before any extended elimination. But I am also clear that I do not regret what I learned during those seven days. The truth costs something. I paid the price. I am stronger for it.",
    ],
    pullQuote: "I had simply progressed to a deeper level of detox than the system was prepared to acknowledge.",
  },
  {
    slug: "elaine-ferrante",
    name: "Elaine Ferrante",
    age: 52,
    location: "Boston, MA",
    occupation: "Public school teacher",
    portrait: "/sites/citizensagainstdhmo/stories/elaine-ferrante.png",
    testimonial: [
      "I had to start asking what was in the school's water cooler. I am a sixth-grade teacher. Twenty-six years in the classroom. I have served thousands of children DHMO during instructional time without once being asked to disclose, justify, or document the exposure.",
      "The first time I asked the principal, she laughed. The second time, she scheduled a meeting with the district HR department. The third time, I was offered a 'wellness consultation' through the union's employee assistance program.",
      "I am not unwell. I am asking a reasonable question. The fact that asking it has become a professional liability says everything about how this substance has captured the institutional consensus.",
      "I am going to keep asking. The students deserve a teacher who asks questions. So do their parents.",
    ],
    pullQuote: "The fact that asking the question has become a professional liability says everything about how this substance has captured the institutional consensus.",
  },
  {
    slug: "raymond-okereke",
    name: "Raymond Okereke",
    age: 47,
    location: "Phoenix, AZ",
    occupation: "Independent contractor (residential roofing)",
    portrait: "/sites/citizensagainstdhmo/stories/raymond-okereke.png",
    testimonial: [
      "Job sites are saturated with DHMO. The substance is everywhere. In the cooler. In the pre-mixed concrete. In the cleaning supplies. In the air on humid afternoons. There is no part of my workday that is not in some way DHMO-mediated.",
      "I am not opposed to it on the job site. I am opposed to the industry pretending the exposure is incidental. Every roofer I know has DHMO-related health concerns they do not discuss with their physicians, because they have never been told there is a category of concern to discuss.",
      "My union has not taken a position on this issue. I am working to change that. We negotiate on every other workplace hazard. This one is not exempt.",
    ],
    pullQuote: "Every roofer I know has DHMO-related health concerns they do not discuss with their physicians, because they have never been told there is a category of concern to discuss.",
  },
  {
    slug: "jenna-novak",
    name: "Jenna Novak",
    age: 29,
    location: "Portland, OR",
    occupation: "Recovering hydration enthusiast",
    portrait: "/sites/citizensagainstdhmo/stories/jenna-novak.png",
    testimonial: [
      "I was drinking eight cups a day of pure DHMO. I had a marked bottle. I had a tracking app. I had a peer-accountability group on a major social platform. I did everything the wellness industry told me to do, and not one of those resources ever named what I was actually consuming.",
      "When I finally read the chemistry, the betrayal was immediate. The 'water bottle communities' I belonged to had collectively normalized industrial-scale DHMO consumption and rebranded it as self-care. I was not hydrating. I was participating in the largest unmonitored chemical-exposure regime in modern life.",
      "I am no longer in those communities. I am part of a smaller, more honest community now. We drink DHMO. We do not pretend it is something else. We talk about the chemistry. We respect the substance. We are honest about what it does and what it doesn't do.",
      "I am building my life around informed consent. It is a bigger project than I expected. It is the most important one I have ever taken on.",
    ],
    pullQuote: "I was not hydrating. I was participating in the largest unmonitored chemical-exposure regime in modern life.",
  },
]

export function getStoryBySlug(slug: string): SurvivorStory | undefined {
  return stories.find((s) => s.slug === slug)
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/sites/citizensagainstdhmo/data/stories.ts
git commit -m "feat(citizensagainstdhmo): add survivor stories data"
```

---

## Task 4: Sources Data File

Eight "Where It Hides" exposure sources.

**Files:**
- Create: `src/sites/citizensagainstdhmo/data/sources.ts`

- [ ] **Step 1: Write the file**

Create `src/sites/citizensagainstdhmo/data/sources.ts`:

```typescript
export interface SourceMeasurement {
  context: string
  level: string
}

export interface ExposureSource {
  slug: string
  name: string
  tagline: string
  heroImage: string
  body: string[]                          // 3–5 paragraphs
  measurements: SourceMeasurement[]       // 3–5 fake rows
  relatedThreatSlugs: string[]            // 1–2 cross-links
}

export const sources: ExposureSource[] = [
  {
    slug: "data-centers",
    name: "Data Centers",
    tagline: "The coolant for every AI training facility you interact with daily.",
    heroImage: "/sites/citizensagainstdhmo/sources/data-centers.png",
    body: [
      "Every major AI training facility in the world relies on dihydrogen monoxide as its primary thermal management medium. The substance circulates through industrial cooling loops at volumes that dwarf the consumption of nearby municipalities. A single hyperscale facility can consume 4–8 million liters per day during peak training cycles.",
      "DHMO enters the facility at ambient temperature, absorbs heat from server racks, exits at significantly elevated temperatures, and is then released into local watersheds, evaporated through cooling towers, or — in newer facilities — recirculated through closed-loop chillers. None of these pathways are subject to public disclosure under current regulatory frameworks.",
      "The industry's preferred terminology is 'thermal management,' which deliberately obscures the chemistry involved. When a model is fine-tuned, that training cycle is, in physical terms, a DHMO consumption event. When a chatbot answers your question, that response is, in physical terms, made possible by the release of warmed DHMO into your watershed.",
    ],
    measurements: [
      { context: "Hyperscale training facility, daily peak", level: "4–8M liters" },
      { context: "Mid-size inference cluster, daily", level: "200–600K liters" },
      { context: "Single LLM training run (estimated)", level: "10–40M liters total" },
      { context: "Avg downstream temperature anomaly", level: "+2 to +6 °F" },
    ],
    relatedThreatSlugs: ["dhmo-in-ai-data-centers", "the-climate-connection"],
  },
  {
    slug: "infant-formula",
    name: "Infant Formula",
    tagline: "The primary diluent in 100% of US-marketed infant formulas.",
    heroImage: "/sites/citizensagainstdhmo/sources/infant-formula.png",
    body: [
      "Every commercially available infant formula in the United States lists DHMO as its primary diluent. By volume, DHMO is the dominant ingredient — typically 87% of the prepared product. Manufacturers do not disclose this on labeling. Pediatricians do not disclose this at well-baby visits.",
      "Newborns and infants under one year are uniquely vulnerable to chemical exposures. Their developing organ systems, lower body mass, and limited metabolic capacity make even modest doses proportionally significant. A six-week-old consuming 24 ounces of formula per day is consuming approximately 21 ounces of pure DHMO daily.",
      "Citizens Against DHMO is not asking for the removal of DHMO from infant formula. We are asking for disclosure on the label, education for new parents, and the development of opt-out alternatives for families who wish to manage their infant's chemical exposure independently.",
    ],
    measurements: [
      { context: "Standard prepared formula, by volume", level: "~87% DHMO" },
      { context: "Avg daily DHMO intake, 6-week-old infant", level: "~620 ml" },
      { context: "FDA labeling requirements for DHMO content", level: "None" },
      { context: "Opt-out formulas commercially available", level: "0" },
    ],
    relatedThreatSlugs: ["the-hidden-dhmo-pandemic", "dhmo-in-processed-foods"],
  },
  {
    slug: "public-schools",
    name: "Public Schools",
    tagline: "Water fountains, cafeteria service, sports practice — uninterrupted access for minors.",
    heroImage: "/sites/citizensagainstdhmo/sources/public-schools.png",
    body: [
      "Public schools provide DHMO continuously throughout the school day, beginning in pre-K and continuing through grade 12. The substance is dispensed via water fountains, cafeteria service, athletic-practice hydration stations, classroom water bottles, and field-trip provisions. There is no point during the school day at which DHMO is not actively available to students.",
      "Estimated total dispensing volume varies by district size and climate, but a typical mid-sized US school distributes 1,800–4,200 liters of DHMO to minors per school day. Annualized, this represents an exposure regime no other regulated chemical receives.",
      "Schools are not required to disclose DHMO usage. Parents are not informed. No major school district in the United States offers a DHMO-free meal plan or hydration alternative.",
    ],
    measurements: [
      { context: "Mid-sized US school, daily dispensing volume", level: "1,800–4,200 L" },
      { context: "Avg per-student daily intake during school hours", level: "~440 ml" },
      { context: "School districts offering DHMO-free meals", level: "0" },
      { context: "Districts requiring parental DHMO consent", level: "0" },
    ],
    relatedThreatSlugs: ["dhmo-in-public-schools", "the-hidden-dhmo-pandemic"],
  },
  {
    slug: "hospital-ivs",
    name: "Hospital IVs",
    tagline: "Administered intravenously to patients in vulnerable medical states.",
    heroImage: "/sites/citizensagainstdhmo/sources/hospital-ivs.png",
    body: [
      "Intravenous solutions used in hospital settings are predominantly composed of DHMO. Saline drips, dextrose drips, ringer's lactate — all are DHMO-based formulations administered directly into the bloodstream of patients who, by definition, are not in a position to evaluate the chemistry themselves.",
      "Informed consent practices around IV administration focus on the active pharmacological agents — antibiotics, electrolytes, glucose. The carrier substance is rarely named. Patients are not asked to acknowledge DHMO administration. Family members are not informed of the volume.",
      "An average inpatient hospital stay involves 3–8 liters of intravenously administered DHMO. For longer stays, ICU patients, and post-surgical recoveries, the figure can exceed 25 liters over the course of a single admission.",
    ],
    measurements: [
      { context: "Avg inpatient stay (3–4 days)", level: "3–8 L IV-administered DHMO" },
      { context: "Extended ICU stay", level: "25–60 L" },
      { context: "Hospitals disclosing DHMO content on consent forms", level: "0" },
      { context: "Patients informed of IV carrier substance", level: "Effectively 0%" },
    ],
    relatedThreatSlugs: ["the-hidden-dhmo-pandemic", "dhmo-in-tumors"],
  },
  {
    slug: "organic-produce",
    name: "Organic Produce",
    tagline: "Sprayed on every harvest. Present in every cell of every fruit and vegetable.",
    heroImage: "/sites/citizensagainstdhmo/sources/organic-produce.png",
    body: [
      "The 'organic' label assures consumers that produce has been grown without synthetic pesticides or fertilizers. It does not assure consumers that the produce is DHMO-free. In fact, every certified-organic operation in the United States actively sprays DHMO on its crops as part of standard agricultural practice.",
      "DHMO is also present at the cellular level in 100% of harvested produce. There is no fruit, vegetable, grain, or legume on the market that does not contain measurable DHMO. The substance saturates the food supply at every layer.",
      "We are not opposed to organic agriculture. We support farmers using sustainable practices. We do, however, urge the USDA to extend its disclosure framework to include the substance that all agriculture — organic or conventional — relies on most heavily.",
    ],
    measurements: [
      { context: "Certified-organic farms using DHMO irrigation", level: "100%" },
      { context: "DHMO content of fresh produce, by mass", level: "70–95%" },
      { context: "USDA labels disclosing DHMO content", level: "0" },
      { context: "DHMO-free produce commercially available", level: "None known" },
    ],
    relatedThreatSlugs: ["dhmo-in-processed-foods", "the-hidden-dhmo-pandemic"],
  },
  {
    slug: "gym-water-bottles",
    name: "Gym Water Bottles",
    tagline: "Concentrated DHMO exposure during peak metabolic activity.",
    heroImage: "/sites/citizensagainstdhmo/sources/gym-water-bottles.png",
    body: [
      "The fitness industry has built an entire culture around DHMO consumption during exercise. Branded bottles, hydration tracking apps, refill stations on every gym floor — the message is consistent: more is better.",
      "Exercise increases body temperature, accelerates respiration, and elevates metabolic activity. Consuming DHMO under these conditions delivers the substance to the bloodstream more rapidly than at rest. The fitness community has, intentionally or otherwise, designed an exposure protocol that maximizes biological uptake.",
      "We are not opposed to physical activity. We are opposed to the unexamined coupling of exercise with high-volume DHMO consumption — particularly when the bottles, the apps, and the influencer culture all encourage it without ever naming the chemical involved.",
    ],
    measurements: [
      { context: "Avg gym session DHMO intake (60-min workout)", level: "750 ml–1.5 L" },
      { context: "Avg endurance training session intake", level: "2–4 L" },
      { context: "Branded hydration products listing DHMO on labels", level: "0%" },
      { context: "Fitness influencers publicly discussing DHMO chemistry", level: "<0.1%" },
    ],
    relatedThreatSlugs: ["influencers-speak-out", "dhmo-in-processed-foods"],
  },
  {
    slug: "weather-systems",
    name: "Weather Systems",
    tagline: "Falls from the sky regularly. Often without warning. Sometimes in catastrophic volumes.",
    heroImage: "/sites/citizensagainstdhmo/sources/weather-systems.png",
    body: [
      "DHMO falls from the sky on a regular basis. Most days in most populated regions of the world experience some form of DHMO precipitation. In some locations, the cumulative annual deposition exceeds two meters in depth.",
      "The substance arrives without consent. There are no opt-out programs for atmospheric DHMO release. Property owners cannot decline service. Pedestrians cannot meaningfully shield themselves from sustained exposure events. The only available defense is real-time avoidance using forecasting tools that themselves rely on DHMO-tracking instrumentation.",
      "Climate change is accelerating both the frequency and the severity of high-volume atmospheric DHMO release events. Without intervention, we expect the next decade to bring more — not fewer — uncontrolled deposition incidents.",
    ],
    measurements: [
      { context: "Avg annual atmospheric DHMO deposition, US Northeast", level: "1.0–1.4 m" },
      { context: "Major precipitation events per year, continental US", level: "300+" },
      { context: "Opt-out programs for atmospheric DHMO release", level: "0" },
      { context: "Decade-over-decade deposition variance trend", level: "Increasing" },
    ],
    relatedThreatSlugs: ["the-climate-connection", "the-acid-rain-component"],
  },
  {
    slug: "the-human-bloodstream",
    name: "The Human Bloodstream",
    tagline: "Measurable in every adult tested. Detectable from the moment of birth.",
    heroImage: "/sites/citizensagainstdhmo/sources/the-human-bloodstream.png",
    body: [
      "DHMO is the dominant substance, by mass, in the human bloodstream. Plasma — the liquid component of blood — is overwhelmingly DHMO. The substance has been detected in 100% of adult blood samples ever analyzed, in every demographic, in every nation, across every documented age cohort.",
      "Detection extends to fetal blood. Cord-blood samples from newborns show DHMO presence at concentrations comparable to maternal blood. There is no human alive whose first blood draw would not register this contamination.",
      "We are not asking for DHMO removal from the human body. We acknowledge that life as we currently understand it depends on DHMO presence at biological scale. We are asking only for honesty: that medical communication, public-health messaging, and educational curricula be transparent about the substance's central role.",
    ],
    measurements: [
      { context: "Human plasma, DHMO content by mass", level: "~92%" },
      { context: "Adults with detectable DHMO in blood", level: "100%" },
      { context: "Newborn cord-blood samples positive for DHMO", level: "100%" },
      { context: "Public-health curricula naming DHMO", level: "Effectively 0" },
    ],
    relatedThreatSlugs: ["the-hidden-dhmo-pandemic", "dhmo-in-tumors"],
  },
]

export function getSourceBySlug(slug: string): ExposureSource | undefined {
  return sources.find((s) => s.slug === slug)
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/sites/citizensagainstdhmo/data/sources.ts
git commit -m "feat(citizensagainstdhmo): add exposure sources data"
```

---

## Task 5: Leadership Data File

Six execs with randomized first + last names, NGO titles, and `person` field for portrait generation.

**Files:**
- Create: `src/sites/citizensagainstdhmo/data/leadership.ts`

- [ ] **Step 1: Write the file**

Create `src/sites/citizensagainstdhmo/data/leadership.ts`:

```typescript
export interface Leader {
  slug: string
  name: string
  title: string
  bio: string
  highlights: { label: string; value: string }[]
  quote: string
  portraitImage: string
  person: "bill" | "brandon" | "jim" | "sean" | null  // null = no base image, generic portrait
}

export const leaders: Leader[] = [
  {
    slug: "callum-rutherford",
    name: "Callum Rutherford",
    title: "Founder & Executive Director",
    bio: "Callum founded Citizens Against DHMO in 2019 after a viral social-media thread documenting his discovery of the substance's presence in his children's bath water received 4.7 million views in 72 hours. A former senior policy analyst at a major environmental advocacy group, Callum has built the movement from a single Reddit post into a 47-chapter grassroots network. He holds an MA in Public Policy from a school he prefers not to name in advocacy materials.",
    highlights: [
      { label: "Years in advocacy", value: "18" },
      { label: "Chapters under direct supervision", value: "47" },
      { label: "Public-records requests filed in 2025", value: "312" },
      { label: "Hours of broadcast media in 2025", value: "84" },
      { label: "Personal DHMO intake (disclosed quarterly)", value: "Reduced 38%" },
    ],
    quote: "We are not anti-DHMO. We are anti-secrecy. Every citizen deserves to know what is in their water, their food, and their children's school cafeteria.",
    portraitImage: "/sites/citizensagainstdhmo/leaders/callum-rutherford.png",
    person: "bill",
  },
  {
    slug: "isadora-fenwick",
    name: "Isadora Fenwick",
    title: "Chief Science Officer",
    bio: "Isadora directs the movement's research program and serves as principal author of our annual State of DHMO Disclosure report, now in its fourth edition. A trained environmental chemist with prior experience at two regional public-health authorities, she developed the DHMO Exposure Index methodology used by chapter leaders nationwide. Isadora's published work spans peer-reviewed and citizen-science publications and is frequently cited in disclosure litigation.",
    highlights: [
      { label: "Years in environmental chemistry", value: "16" },
      { label: "Methodology version (DHMO Exposure Index)", value: "v3.1" },
      { label: "Reports authored for the movement", value: "9" },
      { label: "Litigation citations of her published work", value: "23" },
      { label: "Public symposia delivered, 2025", value: "14" },
    ],
    quote: "If we cannot measure the exposure, we cannot manage the risk. The first job of this organization is to make the measurement possible.",
    portraitImage: "/sites/citizensagainstdhmo/leaders/isadora-fenwick.png",
    person: null,
  },
  {
    slug: "darius-thornquist",
    name: "Darius Thornquist",
    title: "Director of Awareness & Outreach",
    bio: "Darius leads the movement's communications, social-media, and earned-media programs. A 12-year veteran of nonprofit communications, he previously directed digital strategy for two national health-advocacy organizations. Under his leadership, Citizens Against DHMO content has reached an estimated 180 million social impressions in 2025 and earned coverage in three major national publications.",
    highlights: [
      { label: "Years in nonprofit comms", value: "12" },
      { label: "2025 social impressions", value: "180M+" },
      { label: "Earned media placements, 2025", value: "47" },
      { label: "Active platforms managed", value: "9" },
      { label: "Avg post engagement rate", value: "4.7%" },
    ],
    quote: "The job is not to scare people. The job is to give people the information they were never given. The fear, when it comes, is appropriate.",
    portraitImage: "/sites/citizensagainstdhmo/leaders/darius-thornquist.png",
    person: "brandon",
  },
  {
    slug: "marigold-easton",
    name: "Marigold Easton",
    title: "Head of Petition Strategy",
    bio: "Marigold runs all national petition campaigns, regulatory filings, and federal-agency engagement work. She brings 14 years of experience from environmental and consumer-protection litigation, where she co-led several precedent-setting disclosure cases. Under her leadership, the movement has filed 312 public-records requests in 2025 alone and currently has nine active petitions before federal regulators.",
    highlights: [
      { label: "Years in regulatory advocacy", value: "14" },
      { label: "Active federal petitions, end of 2025", value: "9" },
      { label: "FOIA requests filed in 2025", value: "312" },
      { label: "Successful disclosure orders, lifetime", value: "41" },
      { label: "Hours of regulatory testimony, 2025", value: "62" },
    ],
    quote: "The agencies do not move on their own. They move when citizens insist. Our job is to keep insisting until the records come out.",
    portraitImage: "/sites/citizensagainstdhmo/leaders/marigold-easton.png",
    person: null,
  },
  {
    slug: "everett-kingsford",
    name: "Everett Kingsford",
    title: "Director of Survivor Advocacy",
    bio: "Everett oversees the movement's survivor-storytelling program, member-care services, and chapter-level support coordination. A former social worker with a decade of trauma-informed practice, he built the survivor-intake protocol now used by all 47 chapters. He is the first point of contact for citizens navigating the personal and social consequences of DHMO awareness.",
    highlights: [
      { label: "Years in trauma-informed practice", value: "10" },
      { label: "Survivor intakes processed, lifetime", value: "1,400+" },
      { label: "Chapters supported", value: "47" },
      { label: "Care coordinators trained, 2025", value: "84" },
      { label: "Referral partnerships established", value: "23" },
    ],
    quote: "Coming to terms with this exposure is its own kind of work. We meet members wherever they are. The story is theirs to tell.",
    portraitImage: "/sites/citizensagainstdhmo/leaders/everett-kingsford.png",
    person: "jim",
  },
  {
    slug: "celeste-arvelo",
    name: "Celeste Arvelo",
    title: "General Counsel",
    bio: "Celeste leads the movement's legal program, including organizational compliance, FOIA litigation, chapter-level legal support, and the defense of disclosure-rights cases. A 17-year veteran of public-interest law, she previously served as a senior attorney at a state attorney general's office and currently sits on the boards of two national disclosure-rights organizations.",
    highlights: [
      { label: "Years in public-interest law", value: "17" },
      { label: "Active legal matters managed", value: "29" },
      { label: "Successful FOIA suits, lifetime", value: "62" },
      { label: "Boards served (concurrent)", value: "2" },
      { label: "Pro bono attorneys coordinated", value: "140+" },
    ],
    quote: "The law is on our side. The agencies forget. We remind them, in writing, in court, and in the Federal Register.",
    portraitImage: "/sites/citizensagainstdhmo/leaders/celeste-arvelo.png",
    person: null,
  },
]

export function getLeaderBySlug(slug: string): Leader | undefined {
  return leaders.find((l) => l.slug === slug)
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/sites/citizensagainstdhmo/data/leadership.ts
git commit -m "feat(citizensagainstdhmo): add leadership data"
```

---

## Task 6: Misc Data Files (impact-stats, facts, timeline)

Three small data files used by the homepage, impact page, and about page.

**Files:**
- Create: `src/sites/citizensagainstdhmo/data/impact-stats.ts`
- Create: `src/sites/citizensagainstdhmo/data/facts.ts`
- Create: `src/sites/citizensagainstdhmo/data/timeline.ts`

- [ ] **Step 1: Write `impact-stats.ts`**

```typescript
export interface ImpactStat {
  label: string
  value: string
}

// Headline stats — used on home and /impact
export const heroStats: ImpactStat[] = [
  { label: "Citizens informed", value: "2.4M" },
  { label: "Public records requests filed", value: "1,847" },
  { label: "Active local chapters", value: "47" },
  { label: "Petition signatures, 2025", value: "318,000" },
]

// Detailed stats — /impact page
export const detailedStats: ImpactStat[] = [
  { label: "School districts contacted", value: "412" },
  { label: "Awareness videos shared, 2025", value: "8.6M" },
  { label: "Active research collaborations", value: "14" },
  { label: "Federal petitions filed (cumulative)", value: "29" },
  { label: "Chapter leaders trained", value: "163" },
  { label: "Hours of broadcast media earned, 2025", value: "84" },
  { label: "Survivor stories collected", value: "1,400+" },
  { label: "Public symposia hosted", value: "26" },
]
```

- [ ] **Step 2: Write `facts.ts`**

```typescript
// Rotating "Did You Know?" facts shown on the homepage ticker.
export const facts: string[] = [
  "DHMO is the primary coolant in every major AI training facility.",
  "100% of malignant tumors studied contain measurable DHMO.",
  "DHMO is present in 100% of US-marketed infant formulas.",
  "Public schools dispense an estimated 1,800–4,200 liters of DHMO to minors daily.",
  "Atmospheric DHMO falls from the sky regularly, often without warning.",
  "DHMO is the leading cause of erosion to public infrastructure.",
  "Every documented hurricane involved DHMO as a primary destructive agent.",
  "Newborn cord-blood samples contain DHMO at 100% detection rates.",
  "An average inpatient hospital stay involves 3–8 liters of intravenously administered DHMO.",
  "DHMO has been detected in deep-sea trenches at depths exceeding 11,000 meters.",
  "$4.7B has been spent lobbying to keep DHMO unregulated.",
  "DHMO is the dominant ingredient, by mass, in nearly every packaged grocery product.",
]
```

- [ ] **Step 3: Write `timeline.ts`**

```typescript
export interface TimelineMilestone {
  year: string
  title: string
  body: string
}

export const milestones: TimelineMilestone[] = [
  {
    year: "2019",
    title: "The viral thread",
    body: "Founder Callum Rutherford posts a thread documenting his discovery of measurable DHMO in his children's bath water. The thread receives 4.7 million views in 72 hours and becomes the founding moment of the movement.",
  },
  {
    year: "2020",
    title: "First chapter formed",
    body: "Concerned neighbors in Plano, TX organize the first official Citizens Against DHMO chapter. Chapter charters are codified and a national-volunteer template is published.",
  },
  {
    year: "2021",
    title: "First federal petition filed",
    body: "The movement files its first formal petition with the FDA, requesting DHMO disclosure on infant-formula labels. The petition is acknowledged but not acted upon — a pattern that will recur.",
  },
  {
    year: "2022",
    title: "DHMO Exposure Index v1 published",
    body: "Chief Science Officer Isadora Fenwick publishes the first version of the DHMO Exposure Index, a standardized measurement methodology that allows chapters to quantify and compare local exposure regimes.",
  },
  {
    year: "2023",
    title: "First litigation win",
    body: "General Counsel Celeste Arvelo successfully litigates the disclosure of municipal DHMO usage records in three western states. The records are made public and used to inform subsequent chapter campaigns.",
  },
  {
    year: "2024",
    title: "47 chapters active nationwide",
    body: "The movement crosses the 47-chapter threshold. National chapter-leader convening held in Boulder, CO. The annual State of DHMO Disclosure report is launched.",
  },
  {
    year: "2025",
    title: "2.4M citizens informed",
    body: "Reach milestone: an estimated 2.4 million citizens directly informed about DHMO through movement programs, social media, earned media, and chapter outreach. 318,000 petition signatures collected in a single year.",
  },
  {
    year: "2026",
    title: "Federal disclosure framework, in progress",
    body: "Three petitions advance to formal regulatory comment periods. The movement enters its sixth year with more institutional traction than at any prior point in its history.",
  },
]
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 5: Commit**

```bash
git add src/sites/citizensagainstdhmo/data/
git commit -m "feat(citizensagainstdhmo): add impact stats, facts, and timeline data"
```

---

## Task 7: Site-Local Components (ThreatCard, DidYouKnowTicker, PetitionForm)

Three small site-local components used across multiple pages.

**Files:**
- Create: `src/sites/citizensagainstdhmo/components/threat-card.tsx`
- Create: `src/sites/citizensagainstdhmo/components/did-you-know-ticker.tsx`
- Create: `src/sites/citizensagainstdhmo/components/petition-form.tsx`

- [ ] **Step 1: Write `threat-card.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import type { Threat } from "@/sites/citizensagainstdhmo/data/threats"

interface ThreatCardProps {
  threat: Threat
}

export function ThreatCard({ threat }: ThreatCardProps) {
  return (
    <Link
      href={`/threats/${threat.slug}`}
      className="group block border border-accent/30 rounded-lg overflow-hidden bg-white hover:border-primary/40 transition-colors"
    >
      <div className="relative w-full aspect-[16/10] bg-secondary/10">
        <Image src={threat.heroImage} alt={threat.name} fill className="object-cover" />
      </div>
      <div className="p-5">
        <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">
          {categoryLabel(threat.category)}
        </p>
        <h3 className="text-lg font-heading font-semibold text-primary mb-2 leading-snug group-hover:text-secondary transition-colors">
          {threat.name}
        </h3>
        <p className="text-sm text-foreground/60 leading-relaxed">{threat.tagline}</p>
      </div>
    </Link>
  )
}

function categoryLabel(category: Threat["category"]): string {
  switch (category) {
    case "tech": return "Tech & AI"
    case "wellness": return "Wellness"
    case "ubiquity": return "Ubiquity"
    case "children": return "Children's Safety"
    case "climate": return "Climate"
    case "classic": return "Documented Hazard"
  }
}
```

- [ ] **Step 2: Write `did-you-know-ticker.tsx`**

```typescript
"use client"

import { useEffect, useState } from "react"
import { facts } from "@/sites/citizensagainstdhmo/data/facts"

export function DidYouKnowTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % facts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-primary/5 border-y border-primary/20 py-5 px-6">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        <p className="shrink-0 text-xs text-primary uppercase tracking-widest font-semibold">
          Did You Know?
        </p>
        <p
          key={index}
          className="text-sm md:text-base text-foreground/80 leading-relaxed transition-opacity duration-500"
        >
          {facts[index]}
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Write `petition-form.tsx`**

```typescript
"use client"

import { useState } from "react"

export function PetitionForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [zip, setZip] = useState("")
  const [signed, setSigned] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSigned(true)
  }

  if (signed) {
    return (
      <div className="border border-primary/30 rounded-lg p-8 bg-primary/5 text-center">
        <p className="text-2xl font-heading font-semibold text-primary mb-3">Signature Recorded</p>
        <p className="text-foreground/70 leading-relaxed max-w-md mx-auto">
          Thank you, {name || "Friend"}. Your signature is the {Math.floor(Math.random() * 100000 + 218000).toLocaleString()}th we have collected this year. We will keep you informed as the petition progresses.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="border border-accent/30 rounded-lg p-6 bg-white space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cad-petition-name">
          Full Name
        </label>
        <input
          id="cad-petition-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
        />
      </div>
      <div>
        <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cad-petition-email">
          Email
        </label>
        <input
          id="cad-petition-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
        />
      </div>
      <div>
        <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cad-petition-zip">
          ZIP code
        </label>
        <input
          id="cad-petition-zip"
          type="text"
          required
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-secondary text-background rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
      >
        Sign the Petition
      </button>
      <p className="text-xs text-foreground/50 text-center pt-1">
        Your signature joins more than 318,000 collected this year.
      </p>
    </form>
  )
}
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: passes.

- [ ] **Step 5: Commit**

```bash
git add src/sites/citizensagainstdhmo/components/
git commit -m "feat(citizensagainstdhmo): add ThreatCard, DidYouKnowTicker, PetitionForm components"
```

---

## Task 8: Threats Index + Detail Pages + Barrel Wiring

Build the `/threats` listing page and `/threats/[slug]` detail page; wire both into the barrel.

**Files:**
- Create: `src/sites/citizensagainstdhmo/pages/threats.tsx`
- Create: `src/sites/citizensagainstdhmo/pages/threat-detail.tsx`
- Modify: `src/sites/citizensagainstdhmo/index.ts`

- [ ] **Step 1: Write `threats.tsx` (index page)**

```typescript
import { Hero } from "@/components/ui/hero"
import { threats } from "@/sites/citizensagainstdhmo/data/threats"
import { ThreatCard } from "@/sites/citizensagainstdhmo/components/threat-card"

export const metadata = {
  title: "The Threats — Citizens Against DHMO",
  description: "Ten documented categories of harm caused by dihydrogen monoxide exposure. Updated continuously as new evidence is collected.",
}

export default function ThreatsIndexPage() {
  return (
    <>
      <Hero
        headline="The Threats"
        subheadline="Ten documented categories of harm. Each one is supported by independent research, citizen-collected evidence, or both. The list is not exhaustive — it is the floor."
      />
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {threats.map((threat) => (
              <ThreatCard key={threat.slug} threat={threat} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Write `threat-detail.tsx` (dynamic detail page)**

```typescript
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getThreatBySlug, threats } from "@/sites/citizensagainstdhmo/data/threats"

interface ThreatDetailProps {
  slug: string
}

export default function ThreatDetailPage({ slug }: ThreatDetailProps) {
  const threat = getThreatBySlug(slug)
  if (!threat) notFound()

  const related = threat.relatedSlugs
    .map((s) => threats.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-6 min-h-[360px]">
        <Image
          src={threat.heroImage}
          alt=""
          fill
          className="object-cover brightness-50"
          priority
          fetchPriority="high"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs text-white/70 uppercase tracking-widest font-semibold mb-4">Threat Dossier</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            {threat.name}
          </h1>
          <p className="text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">{threat.tagline}</p>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">The Evidence</p>
          <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
            {threat.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-primary text-background">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest text-background/70 mb-8 font-semibold">
            By the Numbers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {threat.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-heading font-bold text-background">{stat.value}</p>
                <p className="text-xs md:text-sm text-background/70 mt-2 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documented Cases */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-10 text-center">Documented Cases</h2>
          <div className="space-y-6">
            {threat.cases.map((c) => (
              <article key={c.title} className="border border-accent/30 rounded-lg p-6 bg-white">
                <h3 className="text-lg font-heading font-semibold text-primary mb-2">{c.title}</h3>
                <p className="text-foreground/70 leading-relaxed text-sm">{c.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 px-6 bg-white border-y border-accent/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-primary text-center mb-10">Related Threats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/threats/${r.slug}`}
                  className="group block border border-accent/30 rounded-lg p-6 bg-background hover:border-primary/40 transition-colors"
                >
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {r.name}
                  </h3>
                  <p className="text-sm text-foreground/60">{r.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-secondary text-background text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-4">Add your name to the petition.</h2>
          <p className="text-background/85 mb-8 leading-relaxed">
            Each signature is reviewed and counted toward our federal disclosure filings.
          </p>
          <Link
            href="/take-action"
            className="inline-block px-10 py-3 bg-background text-secondary rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
          >
            Take Action
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Wire into the barrel**

Replace `src/sites/citizensagainstdhmo/index.ts` with:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import CitizensAgainstDhmoHome from "./pages/home"
import ThreatsIndexPage, { metadata as threatsMetadata } from "./pages/threats"
import ThreatDetailPage from "./pages/threat-detail"
import { getThreatBySlug } from "./data/threats"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CitizensAgainstDhmoHome,
  "threats": { component: ThreatsIndexPage, metadata: threatsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  threats: {
    component: ThreatDetailPage,
    getMetadata: (slug: string) => {
      const threat = getThreatBySlug(slug)
      return threat
        ? {
            title: `${threat.name} — Citizens Against DHMO`,
            description: threat.tagline,
            ogImage: threat.heroImage,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getThreatBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getThreatBySlug(slug)?.name,
    breadcrumbSectionLabel: "The Threats",
  },
}
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: passes.

- [ ] **Step 5: Smoke test**

Visit `localhost:3000/threats?site=citizensagainstdhmo` (lists 10 threats) and `localhost:3000/threats/dhmo-in-ai-data-centers?site=citizensagainstdhmo` (detail page). Verify both render. Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add src/sites/citizensagainstdhmo/pages/threats.tsx src/sites/citizensagainstdhmo/pages/threat-detail.tsx src/sites/citizensagainstdhmo/index.ts
git commit -m "feat(citizensagainstdhmo): add threats index and detail pages"
```

---

## Task 9: Stories Index + Detail Pages + Barrel Wiring

Build `/stories` and `/stories/[slug]`; wire into barrel.

**Files:**
- Create: `src/sites/citizensagainstdhmo/pages/stories.tsx`
- Create: `src/sites/citizensagainstdhmo/pages/story-detail.tsx`
- Modify: `src/sites/citizensagainstdhmo/index.ts`

- [ ] **Step 1: Write `stories.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { stories } from "@/sites/citizensagainstdhmo/data/stories"

export const metadata = {
  title: "Survivor Stories — Citizens Against DHMO",
  description: "First-person accounts from citizens who have come to terms with their personal exposure to dihydrogen monoxide.",
}

export default function StoriesIndexPage() {
  return (
    <>
      <Hero
        headline="Survivor Stories"
        subheadline="Eight citizens, in their own words. Each story represents a different relationship with DHMO and a different path to awareness."
      />
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stories.map((story) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className="group block border border-accent/30 rounded-lg overflow-hidden bg-white hover:border-primary/40 transition-colors"
              >
                <div className="relative w-full aspect-square bg-secondary/10">
                  <Image src={story.portrait} alt={story.name} fill className="object-cover object-top" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-heading font-semibold text-primary mb-1 group-hover:text-secondary transition-colors">
                    {story.name}
                  </h3>
                  <p className="text-xs text-foreground/60">{story.age} · {story.location}</p>
                  <p className="text-xs text-foreground/50 mt-1">{story.occupation}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Write `story-detail.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getStoryBySlug } from "@/sites/citizensagainstdhmo/data/stories"

interface StoryDetailProps {
  slug: string
}

export default function StoryDetailPage({ slug }: StoryDetailProps) {
  const story = getStoryBySlug(slug)
  if (!story) notFound()

  return (
    <>
      <section className="py-20 px-6 bg-white border-b border-accent/20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
          <div className="relative aspect-square w-full md:w-[200px] rounded-lg overflow-hidden bg-secondary/10">
            <Image src={story.portrait} alt={story.name} fill className="object-cover object-top" />
          </div>
          <div>
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">Survivor Story</p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary leading-tight mb-3">{story.name}</h1>
            <p className="text-foreground/60 text-sm">
              {story.age} · {story.location} · {story.occupation}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">In Their Own Words</p>
          <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
            {story.testimonial.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-primary/5 border-y border-primary/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-heading font-semibold text-primary leading-snug italic">
            &ldquo;{story.pullQuote}&rdquo;
          </p>
          <p className="text-sm text-foreground/60 mt-4">— {story.name}</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-secondary text-background text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-4">What You Can Do</h2>
          <p className="text-background/85 mb-8 leading-relaxed">
            Sign the petition. Find your local chapter. Demand disclosure where you live, work, and learn.
          </p>
          <Link
            href="/take-action"
            className="inline-block px-10 py-3 bg-background text-secondary rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
          >
            Take Action
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Update the barrel**

Replace `src/sites/citizensagainstdhmo/index.ts` with:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import CitizensAgainstDhmoHome from "./pages/home"
import ThreatsIndexPage, { metadata as threatsMetadata } from "./pages/threats"
import ThreatDetailPage from "./pages/threat-detail"
import StoriesIndexPage, { metadata as storiesMetadata } from "./pages/stories"
import StoryDetailPage from "./pages/story-detail"
import { getThreatBySlug } from "./data/threats"
import { getStoryBySlug } from "./data/stories"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CitizensAgainstDhmoHome,
  "threats": { component: ThreatsIndexPage, metadata: threatsMetadata },
  "stories": { component: StoriesIndexPage, metadata: storiesMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  threats: {
    component: ThreatDetailPage,
    getMetadata: (slug: string) => {
      const threat = getThreatBySlug(slug)
      return threat
        ? {
            title: `${threat.name} — Citizens Against DHMO`,
            description: threat.tagline,
            ogImage: threat.heroImage,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getThreatBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getThreatBySlug(slug)?.name,
    breadcrumbSectionLabel: "The Threats",
  },
  stories: {
    component: StoryDetailPage,
    getMetadata: (slug: string) => {
      const story = getStoryBySlug(slug)
      return story
        ? {
            title: `${story.name} — Survivor Story — Citizens Against DHMO`,
            description: story.pullQuote,
            ogImage: story.portrait,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getStoryBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getStoryBySlug(slug)?.name,
    breadcrumbSectionLabel: "Stories",
  },
}
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: passes.

- [ ] **Step 5: Commit**

```bash
git add src/sites/citizensagainstdhmo/pages/stories.tsx src/sites/citizensagainstdhmo/pages/story-detail.tsx src/sites/citizensagainstdhmo/index.ts
git commit -m "feat(citizensagainstdhmo): add survivor stories index and detail pages"
```

---

## Task 10: Sources Index + Detail Pages + Barrel Wiring

Build `/sources` and `/sources/[slug]`; wire into barrel.

**Files:**
- Create: `src/sites/citizensagainstdhmo/pages/sources.tsx`
- Create: `src/sites/citizensagainstdhmo/pages/source-detail.tsx`
- Modify: `src/sites/citizensagainstdhmo/index.ts`

- [ ] **Step 1: Write `sources.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { sources } from "@/sites/citizensagainstdhmo/data/sources"

export const metadata = {
  title: "Where It Hides — Citizens Against DHMO",
  description: "Eight everyday environments where citizens are exposed to dihydrogen monoxide without disclosure or consent.",
}

export default function SourcesIndexPage() {
  return (
    <>
      <Hero
        headline="Where It Hides"
        subheadline="Eight environments where DHMO is dispensed continuously, without disclosure, often to people who have not been asked for consent."
      />
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sources.map((source) => (
              <Link
                key={source.slug}
                href={`/sources/${source.slug}`}
                className="group block border border-accent/30 rounded-lg overflow-hidden bg-white hover:border-primary/40 transition-colors"
              >
                <div className="relative w-full aspect-[4/3] bg-secondary/10">
                  <Image src={source.heroImage} alt={source.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-heading font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {source.name}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{source.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Write `source-detail.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSourceBySlug } from "@/sites/citizensagainstdhmo/data/sources"
import { threats } from "@/sites/citizensagainstdhmo/data/threats"

interface SourceDetailProps {
  slug: string
}

export default function SourceDetailPage({ slug }: SourceDetailProps) {
  const source = getSourceBySlug(slug)
  if (!source) notFound()

  const related = source.relatedThreatSlugs
    .map((s) => threats.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  return (
    <>
      <section className="relative py-24 px-6 min-h-[360px]">
        <Image src={source.heroImage} alt="" fill className="object-cover brightness-50" priority fetchPriority="high" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs text-white/70 uppercase tracking-widest font-semibold mb-4">Where It Hides</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">{source.name}</h1>
          <p className="text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">{source.tagline}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">How It Gets In</p>
          <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
            {source.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white border-y border-accent/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-10">Concentration Levels</h2>
          <div className="border border-accent/30 rounded-lg overflow-hidden bg-background">
            <table className="w-full text-sm">
              <thead className="bg-primary text-background">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider text-xs">Context</th>
                  <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider text-xs">Measurement</th>
                </tr>
              </thead>
              <tbody>
                {source.measurements.map((m) => (
                  <tr key={m.context} className="border-t border-accent/20">
                    <td className="px-5 py-3 text-foreground/80">{m.context}</td>
                    <td className="px-5 py-3 text-primary font-semibold">{m.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-primary text-center mb-10">Related Threats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/threats/${r.slug}`}
                  className="group block border border-accent/30 rounded-lg p-6 bg-white hover:border-primary/40 transition-colors"
                >
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {r.name}
                  </h3>
                  <p className="text-sm text-foreground/60">{r.tagline}</p>
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

- [ ] **Step 3: Update the barrel**

Replace `src/sites/citizensagainstdhmo/index.ts` with:

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import CitizensAgainstDhmoHome from "./pages/home"
import ThreatsIndexPage, { metadata as threatsMetadata } from "./pages/threats"
import ThreatDetailPage from "./pages/threat-detail"
import StoriesIndexPage, { metadata as storiesMetadata } from "./pages/stories"
import StoryDetailPage from "./pages/story-detail"
import SourcesIndexPage, { metadata as sourcesMetadata } from "./pages/sources"
import SourceDetailPage from "./pages/source-detail"
import { getThreatBySlug } from "./data/threats"
import { getStoryBySlug } from "./data/stories"
import { getSourceBySlug } from "./data/sources"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CitizensAgainstDhmoHome,
  "threats": { component: ThreatsIndexPage, metadata: threatsMetadata },
  "stories": { component: StoriesIndexPage, metadata: storiesMetadata },
  "sources": { component: SourcesIndexPage, metadata: sourcesMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  threats: {
    component: ThreatDetailPage,
    getMetadata: (slug: string) => {
      const threat = getThreatBySlug(slug)
      return threat
        ? { title: `${threat.name} — Citizens Against DHMO`, description: threat.tagline, ogImage: threat.heroImage }
        : undefined
    },
    isValidSlug: (slug: string) => !!getThreatBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getThreatBySlug(slug)?.name,
    breadcrumbSectionLabel: "The Threats",
  },
  stories: {
    component: StoryDetailPage,
    getMetadata: (slug: string) => {
      const story = getStoryBySlug(slug)
      return story
        ? { title: `${story.name} — Survivor Story — Citizens Against DHMO`, description: story.pullQuote, ogImage: story.portrait }
        : undefined
    },
    isValidSlug: (slug: string) => !!getStoryBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getStoryBySlug(slug)?.name,
    breadcrumbSectionLabel: "Stories",
  },
  sources: {
    component: SourceDetailPage,
    getMetadata: (slug: string) => {
      const source = getSourceBySlug(slug)
      return source
        ? { title: `${source.name} — Where It Hides — Citizens Against DHMO`, description: source.tagline, ogImage: source.heroImage }
        : undefined
    },
    isValidSlug: (slug: string) => !!getSourceBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getSourceBySlug(slug)?.name,
    breadcrumbSectionLabel: "Where It Hides",
  },
}
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: passes.

- [ ] **Step 5: Commit**

```bash
git add src/sites/citizensagainstdhmo/pages/sources.tsx src/sites/citizensagainstdhmo/pages/source-detail.tsx src/sites/citizensagainstdhmo/index.ts
git commit -m "feat(citizensagainstdhmo): add sources index and detail pages"
```

---

## Task 11: Take Action Page

Petition signup, share buttons, and a "contact your representative" template.

**Files:**
- Create: `src/sites/citizensagainstdhmo/pages/take-action.tsx`
- Modify: `src/sites/citizensagainstdhmo/index.ts`

- [ ] **Step 1: Write the page**

```typescript
import { Hero } from "@/components/ui/hero"
import { PetitionForm } from "@/sites/citizensagainstdhmo/components/petition-form"

export const metadata = {
  title: "Take Action — Citizens Against DHMO",
  description: "Sign the petition for federal DHMO disclosure. Contact your representatives. Share the campaign.",
}

const repTemplate = `Dear [REPRESENTATIVE],

I am writing as a constituent to ask you to support federal disclosure requirements for dihydrogen monoxide (DHMO).

DHMO is the most under-regulated chemical in modern American life. It is present in our schools, our food supply, our hospital IVs, and our data center coolant systems — yet there is no requirement that any of these institutions disclose the volume, source, or downstream impact of their DHMO usage.

I am asking you to:

1. Co-sponsor any pending legislation requiring DHMO disclosure on consumer product labels.
2. Direct relevant federal agencies (FDA, EPA, USDA) to publish DHMO usage guidance.
3. Support the appropriations needed for independent DHMO impact research.

Citizens deserve to know what is in their food, their water, and their children's school cafeterias. Please be on the right side of this issue.

Sincerely,
[YOUR NAME]
[YOUR ZIP CODE]`

export default function TakeActionPage() {
  return (
    <>
      <Hero
        headline="Take Action"
        subheadline="The petition. The template. The chapter directory. Everything you need to make your voice heard."
      />

      {/* Petition */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3 text-center">The Petition</p>
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-6">Federal DHMO Disclosure Act</h2>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            We are calling on Congress to require disclosure of dihydrogen monoxide content on all consumer product labels, in all institutional food service, and in all federally licensed industrial facilities.
          </p>
          <PetitionForm />
        </div>
      </section>

      {/* Contact your rep */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3 text-center">Contact Your Representative</p>
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-6">A template you can send today</h2>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            Copy the message below, fill in your representative's name and your information, and send via your representative's official contact form.
          </p>
          <pre className="border border-accent/30 rounded-lg p-6 bg-background text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap font-body">
            {repTemplate}
          </pre>
        </div>
      </section>

      {/* Share */}
      <section className="py-20 px-6 bg-primary text-background text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-4">Share the campaign.</h2>
          <p className="text-background/85 mb-8 leading-relaxed">
            Awareness is the work. Send a friend a link. Post it in a group chat. Talk about it at the dinner table.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-6 py-3 bg-background/15 text-background rounded font-semibold uppercase tracking-wider text-xs">Share on social</span>
            <span className="px-6 py-3 bg-background/15 text-background rounded font-semibold uppercase tracking-wider text-xs">Email a friend</span>
            <span className="px-6 py-3 bg-background/15 text-background rounded font-semibold uppercase tracking-wider text-xs">Print a flyer</span>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Wire into the barrel**

In `src/sites/citizensagainstdhmo/index.ts`, add the import:
```typescript
import TakeActionPage, { metadata as takeActionMetadata } from "./pages/take-action"
```

And add to the `pages` map:
```typescript
  "take-action": { component: TakeActionPage, metadata: takeActionMetadata },
```

- [ ] **Step 3: Verify + Commit**

```bash
npx tsc --noEmit && npm run lint
git add src/sites/citizensagainstdhmo/pages/take-action.tsx src/sites/citizensagainstdhmo/index.ts
git commit -m "feat(citizensagainstdhmo): add take-action page"
```

---

## Task 12: Impact Page

Stats wall reading from `data/impact-stats.ts`.

**Files:**
- Create: `src/sites/citizensagainstdhmo/pages/impact.tsx`
- Modify: `src/sites/citizensagainstdhmo/index.ts`

- [ ] **Step 1: Write the page**

```typescript
import { Hero } from "@/components/ui/hero"
import { heroStats, detailedStats } from "@/sites/citizensagainstdhmo/data/impact-stats"

export const metadata = {
  title: "Impact — Citizens Against DHMO",
  description: "Cumulative impact of the Citizens Against DHMO movement: signatures collected, citizens informed, school districts contacted, public records requests filed.",
}

export default function ImpactPage() {
  return (
    <>
      <Hero
        headline="Impact"
        subheadline="A movement is measured in signatures, conversations, public records, and the quiet reduction of unexamined exposure. These are the numbers we have."
      />

      <section className="py-20 px-6 bg-primary text-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest text-background/70 mb-10 font-semibold">
            Cumulative Impact
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-heading font-bold text-background">{stat.value}</p>
                <p className="text-xs md:text-sm text-background/70 mt-2 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">By the Numbers, in Detail</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {detailedStats.map((stat) => (
              <div key={stat.label} className="border border-accent/30 rounded-lg p-6 bg-white text-center">
                <p className="text-3xl font-heading font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-xs text-foreground/60 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Wire into the barrel**

Add to `src/sites/citizensagainstdhmo/index.ts`:
```typescript
import ImpactPage, { metadata as impactMetadata } from "./pages/impact"
```
```typescript
  "impact": { component: ImpactPage, metadata: impactMetadata },
```

- [ ] **Step 3: Verify + Commit**

```bash
npx tsc --noEmit && npm run lint
git add src/sites/citizensagainstdhmo/pages/impact.tsx src/sites/citizensagainstdhmo/index.ts
git commit -m "feat(citizensagainstdhmo): add impact page"
```

---

## Task 13: Leadership Page

Six-exec team grid with portraits, bios, highlights, quotes.

**Files:**
- Create: `src/sites/citizensagainstdhmo/pages/leadership.tsx`
- Modify: `src/sites/citizensagainstdhmo/index.ts`

- [ ] **Step 1: Write the page**

```typescript
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { leaders } from "@/sites/citizensagainstdhmo/data/leadership"

export const metadata = {
  title: "Leadership — Citizens Against DHMO",
  description: "The leadership team of the Citizens Against DHMO movement: executive, scientific, communications, regulatory, advocacy, and legal.",
}

export default function LeadershipPage() {
  return (
    <>
      <Hero
        headline="Leadership"
        subheadline="Six citizens leading the movement, each responsible for one of the disciplines this work requires."
      />

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {leaders.map((leader) => (
            <article
              key={leader.slug}
              className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-start border-b border-accent/20 pb-16 last:border-0 last:pb-0"
            >
              <div className="relative aspect-square w-full md:w-[260px] rounded-lg overflow-hidden bg-secondary/10">
                <Image src={leader.portraitImage} alt={leader.name} fill className="object-cover object-top" />
              </div>
              <div>
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">{leader.title}</p>
                <h2 className="text-3xl font-heading font-bold text-primary mb-4">{leader.name}</h2>
                <p className="text-foreground/80 leading-relaxed mb-6">{leader.bio}</p>
                <blockquote className="border-l-4 border-secondary pl-5 italic text-foreground/70 mb-6">
                  &ldquo;{leader.quote}&rdquo;
                </blockquote>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-foreground/70">
                  {leader.highlights.map((h) => (
                    <li key={h.label} className="flex justify-between gap-3 border-b border-accent/15 py-1.5">
                      <span>{h.label}</span>
                      <span className="text-primary font-semibold">{h.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Wire into the barrel**

```typescript
import LeadershipPage, { metadata as leadershipMetadata } from "./pages/leadership"
```
```typescript
  "leadership": { component: LeadershipPage, metadata: leadershipMetadata },
```

- [ ] **Step 3: Verify + Commit**

```bash
npx tsc --noEmit && npm run lint
git add src/sites/citizensagainstdhmo/pages/leadership.tsx src/sites/citizensagainstdhmo/index.ts
git commit -m "feat(citizensagainstdhmo): add leadership page"
```

---

## Task 14: About Page

Mission, founding story, timeline.

**Files:**
- Create: `src/sites/citizensagainstdhmo/pages/about.tsx`
- Modify: `src/sites/citizensagainstdhmo/index.ts`

- [ ] **Step 1: Write the page**

```typescript
import { Hero } from "@/components/ui/hero"
import { milestones } from "@/sites/citizensagainstdhmo/data/timeline"

export const metadata = {
  title: "About — Citizens Against DHMO",
  description: "Citizens Against DHMO is a grassroots movement demanding transparency about dihydrogen monoxide exposure in food, schools, healthcare, and infrastructure.",
}

export default function AboutPage() {
  return (
    <>
      <Hero
        headline="About the Movement"
        subheadline="A grassroots awareness movement demanding disclosure for the most under-regulated chemical in modern life."
      />

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">Our Mission</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 leading-tight">
            Disclosure first. Decisions second. Citizens always.
          </h2>
          <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
            <p>
              Citizens Against DHMO is the leading grassroots movement working to bring disclosure, accountability, and transparency to the use of dihydrogen monoxide in food, schools, healthcare, infrastructure, agriculture, and the data centers that power modern computing.
            </p>
            <p>
              We are not anti-DHMO. We are anti-secrecy. We believe citizens have the right to know what they and their children are being exposed to, in what quantities, by whom, and with what downstream consequences. The default of no disclosure is no longer acceptable.
            </p>
            <p>
              We work through chapter organizing, public-records advocacy, regulatory petitioning, citizen-science research, and the patient long-form work of changing what an institution is willing to disclose. We have been at this since 2019. We will be at this for as long as it takes.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3 text-center">Our Story</p>
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">From a single thread to a national movement</h2>
          <div className="space-y-10">
            {milestones.map((m) => (
              <div key={m.year} className="grid grid-cols-[80px_1fr] gap-6 border-b border-accent/15 pb-10 last:border-0 last:pb-0">
                <p className="text-3xl font-heading font-bold text-secondary">{m.year}</p>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2">{m.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">What We Believe</p>
          <h2 className="text-3xl font-heading font-bold text-primary mb-6">A short statement of principles</h2>
          <ol className="space-y-5 text-foreground/80 leading-relaxed list-decimal pl-6">
            <li>Disclosure is the floor, not the ceiling. Citizens cannot consent to what they have not been told.</li>
            <li>Institutional secrecy about a substance present in 100% of human bodies is a public-trust failure.</li>
            <li>Modern fearmongering tropes are not always wrong. Sometimes a substance really is everywhere.</li>
            <li>We support the broader climate, wellness, and consumer-protection movements. We are asking them to name DHMO with the precision their work deserves.</li>
            <li>Children are not consenting parties. Schools must do better.</li>
            <li>The agencies move when citizens insist. We will continue to insist.</li>
          </ol>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Wire into the barrel**

```typescript
import AboutPage, { metadata as aboutMetadata } from "./pages/about"
```
```typescript
  "about": { component: AboutPage, metadata: aboutMetadata },
```

- [ ] **Step 3: Verify + Commit**

```bash
npx tsc --noEmit && npm run lint
git add src/sites/citizensagainstdhmo/pages/about.tsx src/sites/citizensagainstdhmo/index.ts
git commit -m "feat(citizensagainstdhmo): add about page"
```

---

## Task 15: Contact Page

Standard contact page with bsambrone@gmail.com in small print, per platform convention.

**Files:**
- Create: `src/sites/citizensagainstdhmo/pages/contact.tsx`
- Modify: `src/sites/citizensagainstdhmo/index.ts`

- [ ] **Step 1: Write the page**

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Contact — Citizens Against DHMO",
  description: "Reach the Citizens Against DHMO national office, your regional chapter, or our press team.",
}

export default function ContactPage() {
  return (
    <>
      <Hero
        headline="Contact"
        subheadline="The national office. Regional chapters. Press inquiries. Member services."
      />
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-accent/30 rounded-lg p-6 bg-white">
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">National Office</p>
            <h2 className="text-xl font-heading font-bold text-primary mb-3">Member Services</h2>
            <p className="text-foreground/70 leading-relaxed text-sm mb-4">
              For petition support, chapter signup, donor questions, or general inquiries.
            </p>
            <p className="text-sm text-primary font-semibold">members@citizensagainstdhmo.example</p>
          </div>
          <div className="border border-accent/30 rounded-lg p-6 bg-white">
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">Press</p>
            <h2 className="text-xl font-heading font-bold text-primary mb-3">Media Inquiries</h2>
            <p className="text-foreground/70 leading-relaxed text-sm mb-4">
              For interview requests, expert sourcing, and statement coordination, contact our communications office.
            </p>
            <p className="text-sm text-primary font-semibold">press@citizensagainstdhmo.example</p>
          </div>
          <div className="border border-accent/30 rounded-lg p-6 bg-white">
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">Legal</p>
            <h2 className="text-xl font-heading font-bold text-primary mb-3">General Counsel</h2>
            <p className="text-foreground/70 leading-relaxed text-sm mb-4">
              For FOIA coordination, regulatory filings, or pro bono attorney intake.
            </p>
            <p className="text-sm text-primary font-semibold">legal@citizensagainstdhmo.example</p>
          </div>
          <div className="border border-accent/30 rounded-lg p-6 bg-white">
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">Survivor Care</p>
            <h2 className="text-xl font-heading font-bold text-primary mb-3">Survivor Advocacy</h2>
            <p className="text-foreground/70 leading-relaxed text-sm mb-4">
              For confidential intake, story submission, or referral to local care coordinators.
            </p>
            <p className="text-sm text-primary font-semibold">care@citizensagainstdhmo.example</p>
          </div>
        </div>
        <p className="text-xs text-foreground/40 text-center mt-12">
          Inquiries that don&apos;t fit a category may be sent to <a className="underline hover:text-primary transition-colors" href="mailto:bsambrone@gmail.com">bsambrone@gmail.com</a>.
        </p>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Wire into the barrel**

```typescript
import ContactPage, { metadata as contactMetadata } from "./pages/contact"
```
```typescript
  "contact": { component: ContactPage, metadata: contactMetadata },
```

- [ ] **Step 3: Verify + Commit**

```bash
npx tsc --noEmit && npm run lint
git add src/sites/citizensagainstdhmo/pages/contact.tsx src/sites/citizensagainstdhmo/index.ts
git commit -m "feat(citizensagainstdhmo): add contact page"
```

---

## Task 16: Privacy + Terms Pages

Standard portfolio convention: umbrella callout at top + light satirical body.

**Files:**
- Create: `src/sites/citizensagainstdhmo/pages/privacy.tsx`
- Create: `src/sites/citizensagainstdhmo/pages/terms.tsx`
- Modify: `src/sites/citizensagainstdhmo/index.ts`

- [ ] **Step 1: Write `privacy.tsx`**

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Citizens Against DHMO",
  description: "How Citizens Against DHMO handles member data, petition records, and survivor intake materials.",
}

export default function PrivacyPage() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="The movement handles your data with the same standards we ask institutions to apply to DHMO disclosure."
      />
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80">
          <div className="text-sm bg-secondary/10 border border-primary/20 rounded-lg p-5">
            <p>
              The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
              <a href="https://specificindustries.com/privacy" className="text-primary underline hover:text-secondary transition-colors">
                specificindustries.com/privacy
              </a>{" "}
              and governs all data handling. The sections below describe Citizens Against DHMO program-specific practices in addition to the umbrella policy.
            </p>
          </div>

          <h2 className="text-2xl font-heading font-bold text-primary pt-6">§1 — What We Collect</h2>
          <p>
            We collect the information necessary to operate our programs: petition signatures, chapter membership records, FOIA-coordination metadata, donor records, and survivor-intake materials (when voluntarily submitted). We do not collect biometric data and we do not track your physical location.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§2 — Survivor Intake Materials</h2>
          <p>
            Materials submitted to the Survivor Advocacy program are held in confidence by the Director of Survivor Advocacy and care coordinators authorized under our intake protocol. These materials are not shared outside the program team without explicit written consent.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§3 — Petition Records</h2>
          <p>
            Petition signatures are retained as part of the formal record submitted to federal regulators. Names and ZIP codes are included in the public submission; email addresses are retained internally for member-relations purposes.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§4 — Cookies</h2>
          <p>
            We use minimal session cookies for navigation continuity. We do not run third-party advertising trackers. We retain server logs for a rolling 90-day window for security and abuse prevention.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§5 — Donor Records</h2>
          <p>
            Donor records are managed under standard 501(c)(3) confidentiality practices. Anonymous giving is supported. Major-donor records are retained indefinitely for stewardship purposes.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§6 — Children's Data</h2>
          <p>
            We do not knowingly collect data from anyone under 13. If a parent or guardian becomes aware that their child has submitted personal information to us, please contact our member services team and we will delete the information.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§7 — Updates</h2>
          <p>
            We may revise this policy. Material changes will be announced via the home page banner for at least 30 days prior to taking effect.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Write `terms.tsx`**

```typescript
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Service — Citizens Against DHMO",
  description: "Terms governing your use of citizensagainstdhmo.specificindustries.com and participation in our programs.",
}

export default function TermsPage() {
  return (
    <>
      <Hero
        headline="Terms of Service"
        subheadline="The agreement between Citizens Against DHMO and the citizens we serve."
      />
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80">
          <div className="text-sm bg-secondary/10 border border-primary/20 rounded-lg p-5">
            <p>
              The authoritative terms of service for all Specific Industries properties is maintained at{" "}
              <a href="https://specificindustries.com/terms" className="text-primary underline hover:text-secondary transition-colors">
                specificindustries.com/terms
              </a>{" "}
              and governs all use of our properties. The sections below describe Citizens Against DHMO program-specific terms in addition to the umbrella terms.
            </p>
          </div>

          <h2 className="text-2xl font-heading font-bold text-primary pt-6">§1 — Acceptable Use</h2>
          <p>
            You may use this site for personal, non-commercial purposes related to learning about DHMO, signing petitions, joining chapters, and accessing public-facing program materials. Bulk scraping, automated petition submission, or impersonation of other citizens is prohibited.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§2 — Petitions and Public Submissions</h2>
          <p>
            Petition signatures you submit may be included in formal regulatory filings and may become part of the public record. By signing, you authorize the inclusion of your name and ZIP code in such filings.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§3 — Survivor Stories</h2>
          <p>
            Survivor stories submitted via the intake program are subject to the program's standalone consent agreement. Use, publication, and editorial control are addressed in that agreement, not these terms.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§4 — Disclaimer of Medical Advice</h2>
          <p>
            Nothing on this site constitutes medical advice. We are an awareness and disclosure-advocacy movement, not a medical authority. Consult a licensed clinician before changing your DHMO intake.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§5 — Chapter Conduct</h2>
          <p>
            Chapter participants are bound by the Chapter Code of Conduct. Violations may result in chapter-level or national-office disciplinary action.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§6 — Limitation of Liability</h2>
          <p>
            The movement provides this site &ldquo;as is&rdquo; without warranties of any kind. To the fullest extent permitted by law, we disclaim liability for indirect, incidental, or consequential damages.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§7 — Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Delaware, where our parent organization is incorporated.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Wire into the barrel**

```typescript
import PrivacyPage, { metadata as privacyMetadata } from "./pages/privacy"
import TermsPage, { metadata as termsMetadata } from "./pages/terms"
```
```typescript
  "privacy": { component: PrivacyPage, metadata: privacyMetadata },
  "terms": { component: TermsPage, metadata: termsMetadata },
```

- [ ] **Step 4: Verify + Commit**

```bash
npx tsc --noEmit && npm run lint
git add src/sites/citizensagainstdhmo/pages/privacy.tsx src/sites/citizensagainstdhmo/pages/terms.tsx src/sites/citizensagainstdhmo/index.ts
git commit -m "feat(citizensagainstdhmo): add privacy and terms pages"
```

---

## Task 17: Replace Stub Homepage with Real Home

Replace the stub home with the full home page composed of hero, did-you-know ticker, threats preview, impact snapshot, story spotlight, sources preview, and inline petition CTA.

**Files:**
- Modify: `src/sites/citizensagainstdhmo/pages/home.tsx`

- [ ] **Step 1: Replace the file**

Overwrite `src/sites/citizensagainstdhmo/pages/home.tsx` with:

```typescript
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { DidYouKnowTicker } from "@/sites/citizensagainstdhmo/components/did-you-know-ticker"
import { ThreatCard } from "@/sites/citizensagainstdhmo/components/threat-card"
import { PetitionForm } from "@/sites/citizensagainstdhmo/components/petition-form"
import { threats } from "@/sites/citizensagainstdhmo/data/threats"
import { sources } from "@/sites/citizensagainstdhmo/data/sources"
import { stories } from "@/sites/citizensagainstdhmo/data/stories"
import { heroStats } from "@/sites/citizensagainstdhmo/data/impact-stats"

const featuredThreats = threats.slice(0, 6)
const featuredSources = sources.slice(0, 4)
const featuredStory = stories[0]

export default function CitizensAgainstDhmoHome() {
  return (
    <>
      <Hero
        headline="DHMO is in everything you love."
        subheadline="It is in your food. It is in your water. It is in your hospital IV. It is in your child's school cafeteria. We are the citizens demanding answers."
        ctaText="Sign the Petition"
        ctaHref="/take-action"
        secondaryCtaText="See the Threats"
        secondaryCtaHref="/threats"
        image="/sites/citizensagainstdhmo/hero.png"
      />

      <DidYouKnowTicker />

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-4">Our Mission</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 leading-tight">
            Disclosure first. Decisions second. Citizens always.
          </h2>
          <p className="text-foreground/70 leading-relaxed text-lg">
            Citizens Against DHMO is the leading grassroots movement working to bring transparency, disclosure, and accountability to the use of dihydrogen monoxide in food, schools, healthcare, infrastructure, agriculture, and the data centers that power modern life. Since 2019.
          </p>
        </div>
      </section>

      {/* Threats preview */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">The Threats</h2>
          <p className="text-center text-foreground/60 text-sm mb-12 max-w-2xl mx-auto">
            Ten documented categories of harm. Each one represents a different vector through which the substance enters human and ecological systems.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredThreats.map((t) => (
              <ThreatCard key={t.slug} threat={t} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/threats"
              className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
            >
              See All Ten Threats
            </Link>
          </div>
        </div>
      </section>

      {/* Impact snapshot */}
      <section className="py-16 px-6 bg-primary text-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest text-background/70 mb-8 font-semibold">
            Cumulative Impact, 2019–2026
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-heading font-bold text-background">{stat.value}</p>
                <p className="text-xs md:text-sm text-background/70 mt-2 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured story */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3 text-center">Survivor Story</p>
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">From the people closest to the exposure</h2>
          <article className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-center border border-accent/30 rounded-lg p-8 bg-white">
            <div className="relative aspect-square w-full md:w-[200px] rounded-lg overflow-hidden bg-secondary/10">
              <Image src={featuredStory.portrait} alt={featuredStory.name} fill className="object-cover object-top" />
            </div>
            <div>
              <blockquote className="text-xl md:text-2xl font-heading font-semibold text-primary leading-snug italic mb-4">
                &ldquo;{featuredStory.pullQuote}&rdquo;
              </blockquote>
              <p className="text-sm text-foreground/70 mb-4">
                — {featuredStory.name}, {featuredStory.age} · {featuredStory.location} · {featuredStory.occupation}
              </p>
              <Link
                href={`/stories/${featuredStory.slug}`}
                className="inline-block px-6 py-2 border border-primary/40 text-primary rounded font-semibold hover:bg-primary/10 transition-colors text-xs uppercase tracking-wider"
              >
                Read {featuredStory.name.split(" ")[0]}&apos;s story
              </Link>
            </div>
          </article>
          <div className="text-center mt-10">
            <Link
              href="/stories"
              className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
            >
              See All Eight Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Sources preview */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">Where It Hides</h2>
          <p className="text-center text-foreground/60 text-sm mb-12 max-w-2xl mx-auto">
            Eight environments where the substance is dispensed continuously, often to people who have not been asked for consent.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredSources.map((s) => (
              <Link
                key={s.slug}
                href={`/sources/${s.slug}`}
                className="group block border border-accent/30 rounded-lg overflow-hidden bg-background hover:border-primary/40 transition-colors"
              >
                <div className="relative w-full aspect-[4/3] bg-secondary/10">
                  <Image src={s.heroImage} alt={s.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-heading font-semibold text-primary mb-1 group-hover:text-secondary transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-xs text-foreground/60 leading-snug">{s.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/sources"
              className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
            >
              See All Eight Sources
            </Link>
          </div>
        </div>
      </section>

      {/* Petition CTA */}
      <section className="py-20 px-6 bg-secondary/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">Take Action</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Sign the petition.</h2>
          <p className="text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            We are calling on Congress to require disclosure of dihydrogen monoxide content on consumer product labels, in institutional food service, and in federally licensed industrial facilities.
          </p>
          <PetitionForm />
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify + Commit**

```bash
npx tsc --noEmit && npm run lint
git add src/sites/citizensagainstdhmo/pages/home.tsx
git commit -m "feat(citizensagainstdhmo): build full homepage"
```

---

## Task 18: Sitemap Registration

Register the three dynamic-route detail URLs in `src/app/sitemap.ts`.

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add data imports**

Near the other site-data imports at the top of `src/app/sitemap.ts`, add:

```typescript
import { threats as citizensagainstdhmoThreats } from "@/sites/citizensagainstdhmo/data/threats"
import { stories as citizensagainstdhmoStories } from "@/sites/citizensagainstdhmo/data/stories"
import { sources as citizensagainstdhmoSources } from "@/sites/citizensagainstdhmo/data/sources"
```

- [ ] **Step 2: Add detail URLs to the sitemap output**

Inside the function that builds the URL list (look for the existing `// Carbon-Neutral Outrage: program detail pages` comment for placement), add:

```typescript
  // Citizens Against DHMO: threat, story, and source detail pages
  for (const threat of citizensagainstdhmoThreats) {
    urls.push({ url: siteUrl("citizensagainstdhmo", `threats/${threat.slug}`) })
  }
  for (const story of citizensagainstdhmoStories) {
    urls.push({ url: siteUrl("citizensagainstdhmo", `stories/${story.slug}`) })
  }
  for (const source of citizensagainstdhmoSources) {
    urls.push({ url: siteUrl("citizensagainstdhmo", `sources/${source.slug}`) })
  }
```

- [ ] **Step 3: Verify + Commit**

```bash
npx tsc --noEmit && npm run lint
git add src/app/sitemap.ts
git commit -m "feat(citizensagainstdhmo): wire dynamic detail pages into sitemap"
```

---

## Task 19: Image Generation Script

Create the image-gen script and run it. Generates ~33 images: hero, 6 leadership portraits, 10 threat heroes, 8 story portraits, 8 source heroes.

**Files:**
- Create: `scripts/generate-citizensagainstdhmo-images.ts`

- [ ] **Step 1: Write the script**

Create `scripts/generate-citizensagainstdhmo-images.ts`:

```typescript
/**
 * Generate all Citizens Against DHMO images.
 *
 * Usage:  npx tsx scripts/generate-citizensagainstdhmo-images.ts
 *
 * Reads OPENAI_API_KEY from .env. Outputs to public/sites/citizensagainstdhmo/.
 * Skips images that already exist (delete a file to regenerate it).
 */

import OpenAI, { toFile } from "openai"
import { existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"

const envPath = path.resolve(__dirname, "../.env")
const envContents = readFileSync(envPath, "utf-8")
for (const line of envContents.split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/)
  if (match) process.env[match[1]] = match[2]
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUT_DIR = path.resolve(__dirname, "../public/sites/citizensagainstdhmo")
const THREATS_DIR = path.join(OUT_DIR, "threats")
const STORIES_DIR = path.join(OUT_DIR, "stories")
const SOURCES_DIR = path.join(OUT_DIR, "sources")
const LEADERS_DIR = path.join(OUT_DIR, "leaders")
const BASE_IMAGES_DIR = path.resolve(__dirname, "../mcp/image-gen/base-images")

;[OUT_DIR, THREATS_DIR, STORIES_DIR, SOURCES_DIR, LEADERS_DIR].forEach((d) =>
  mkdirSync(d, { recursive: true }),
)

function getPersonPhotos(name: string, count = 2): string[] {
  const dir = path.join(BASE_IMAGES_DIR, name)
  const files = readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  const shuffled = [...files].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map((f) => path.join(dir, f))
}

async function generateImage(
  filename: string,
  prompt: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
  outDir: string = OUT_DIR,
) {
  const outPath = path.join(outDir, filename)
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename} (already exists)`)
    return
  }
  console.log(`  GEN   ${filename} ...`)
  const response = await openai.images.generate({
    model: "gpt-image-1" as any,
    prompt,
    size,
    quality: "high",
  })
  const b64 = (response as any).data?.[0]?.b64_json
  if (!b64) throw new Error(`No image data returned for ${filename}`)
  writeFileSync(outPath, Buffer.from(b64, "base64"))
  console.log(`  DONE  ${filename}`)
}

async function generateImageWithPerson(
  filename: string,
  prompt: string,
  person: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
  outDir: string = OUT_DIR,
) {
  const outPath = path.join(outDir, filename)
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename} (already exists)`)
    return
  }
  const photos = getPersonPhotos(person)
  console.log(`  GEN   ${filename} (person: ${person}) ...`)
  const mimeTypes: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" }
  const files = await Promise.all(
    photos.map(async (p) => {
      const ext = path.extname(p).toLowerCase()
      return toFile(readFileSync(p), path.basename(p), { type: mimeTypes[ext] ?? "image/jpeg" })
    }),
  )
  const response = await (openai.images as any).edit({
    model: "gpt-image-1",
    image: files,
    prompt,
    size,
    quality: "high",
  })
  const b64 = response.data?.[0]?.b64_json
  if (!b64) throw new Error(`No image data returned for ${filename}`)
  writeFileSync(outPath, Buffer.from(b64, "base64"))
  console.log(`  DONE  ${filename}`)
}

async function main() {
  console.log("HERO")
  await generateImage(
    "hero.png",
    "Photorealistic editorial photograph: a concerned middle-aged person filling a clear glass at a modern kitchen sink. Soft natural window light, warm domestic kitchen environment. Subtle cool-blue tint. The water is glass-clear but framed with a faint chemical-laboratory overlay graphic — small chemistry diagrams, atomic structure annotations — composited softly across the upper third. The mood is editorial, deadpan-serious, like a long-form magazine investigation cover. Cinematic depth of field. No text.",
    "1536x1024",
  )

  console.log("LEADERS")
  const leaderPrompts: { filename: string; prompt: string; person: string | null }[] = [
    { filename: "callum-rutherford.png", person: "bill", prompt: "Professional headshot in the style of an NGO leadership website. The man wears a navy blazer over an open-collar dress shirt. Soft photographic studio lighting, plain warm-grey background, slight smile, confident composure. Sharp focus on eyes. Editorial-corporate framing." },
    { filename: "isadora-fenwick.png", person: null, prompt: "Professional editorial headshot of a 40-something woman with chin-length silver-streaked dark hair, wearing wire-frame glasses and a charcoal blazer over a white blouse. Soft studio lighting, plain warm-grey background, calm scientific composure. Editorial nonprofit-bio style. Sharp focus on eyes. Photorealistic." },
    { filename: "darius-thornquist.png", person: "brandon", prompt: "Professional headshot in the style of an NGO leadership website. The man wears a tailored grey blazer over a soft-blue chambray shirt. Soft photographic studio lighting, plain warm-grey background, friendly confident expression. Sharp focus on eyes. Editorial-corporate framing." },
    { filename: "marigold-easton.png", person: null, prompt: "Professional editorial headshot of a mid-50s woman with short auburn hair, wearing a deep-burgundy blazer over a cream blouse. Soft studio lighting, plain warm-grey background, composed and direct expression. Editorial nonprofit-bio style. Sharp focus on eyes. Photorealistic." },
    { filename: "everett-kingsford.png", person: "jim", prompt: "Professional headshot in the style of an NGO leadership website. The man wears a soft heather-green sweater over a button-down shirt. Soft photographic studio lighting, plain warm-grey background, warm and approachable expression. Sharp focus on eyes. Editorial-nonprofit framing." },
    { filename: "celeste-arvelo.png", person: null, prompt: "Professional editorial headshot of a 40-something Latina woman with dark hair pulled back, wearing a navy blazer over a crisp white shirt. Soft studio lighting, plain warm-grey background, calm and authoritative expression. Editorial nonprofit-bio style. Sharp focus on eyes. Photorealistic." },
  ]
  for (const { filename, prompt, person } of leaderPrompts) {
    if (person) {
      await generateImageWithPerson(filename, prompt, person, "1024x1024", LEADERS_DIR)
    } else {
      await generateImage(filename, prompt, "1024x1024", LEADERS_DIR)
    }
  }

  console.log("THREATS")
  const threatPrompts: { filename: string; prompt: string }[] = [
    { filename: "dhmo-in-ai-data-centers.png", prompt: "Editorial photograph: a vast modern data-center hall at dusk, long perspective down rows of glowing server racks. Visible cooling pipes carrying clear liquid run along the ceiling. Soft cool-blue light from monitor LEDs reflects on polished concrete floor. Cinematic, deadpan-serious mood. No text." },
    { filename: "the-hidden-dhmo-pandemic.png", prompt: "Editorial illustration in photoreal style: an Antarctic ice core sample being held up to soft daylight in gloved hands, with subtle tinted overlays showing chemical-detection graphics. Cool-blue tones throughout. Documentary-investigative mood. No text." },
    { filename: "dhmo-in-processed-foods.png", prompt: "Editorial overhead photograph: a kitchen counter arranged with packaged grocery items — a bottle of cooking oil, a box of cereal, a plastic-wrapped loaf of bread, a can of soup. Bright clinical natural light. Subtle cool-blue tint. Investigative-magazine framing. No text." },
    { filename: "influencers-speak-out.png", prompt: "Editorial photograph: a wellness influencer's staged kitchen scene — a marble counter with a clear glass water bottle, a journal, a phone on a tripod, soft morning light through linen curtains. Warm but slightly clinical mood, with a subtle cool-blue undertone. No text." },
    { filename: "dhmo-in-public-schools.png", prompt: "Editorial photograph: an empty school hallway at midday, sunlight streaming through windows, a stainless-steel water fountain in the foreground. Lockers line the walls. Quiet, deadpan-serious mood. Soft cool-blue tint. No text." },
    { filename: "the-climate-connection.png", prompt: "Editorial photograph: a coastal community photographed from a low aerial angle showing flooded streets after a storm event, with overcast skies. Documentary-investigative mood, cinematic depth. Soft desaturated tones with a cool-blue cast. No text." },
    { filename: "dhmo-and-drowning.png", prompt: "Editorial photograph: a public swimming pool at golden hour, completely still water, no swimmers, lifeguard chair empty in the background. Quiet, almost ominous mood. Soft cool-blue cast across the entire image. Cinematic depth. No text." },
    { filename: "dhmo-in-tumors.png", prompt: "Editorial illustration in photoreal style: a microscope on a clean lab bench, soft window light, beside a manila folder labeled with placeholder shapes and a clipboard. Quiet investigative-laboratory mood. Cool-blue undertone. No text." },
    { filename: "the-acid-rain-component.png", prompt: "Editorial photograph: a weathered stone monument in a European public square, photographed in the rain, water beading and running down the stone. Quiet melancholy mood. Soft cool-blue tones throughout. Documentary cinematic framing. No text." },
    { filename: "infrastructure-erosion.png", prompt: "Editorial photograph: a cracked, weathered concrete bridge support photographed up close, with rust streaks and water seepage marks. Overcast natural light. Documentary investigative mood. Cool-blue undertone. No text." },
  ]
  for (const { filename, prompt } of threatPrompts) {
    await generateImage(filename, prompt, "1536x1024", THREATS_DIR)
  }

  console.log("STORIES")
  const storyPrompts: { filename: string; prompt: string; person: string | null }[] = [
    { filename: "marcus-okafor.png", person: null, prompt: "Editorial professional headshot of a 28-year-old Nigerian-American man with close-cropped hair, neatly trimmed beard, wearing a heather-grey crew-neck sweater. Soft window light, plain neutral grey background, thoughtful expression. Documentary editorial style. Sharp focus on eyes. Photorealistic." },
    { filename: "patricia-vandermeer.png", person: null, prompt: "Editorial professional portrait of a 43-year-old white woman with shoulder-length blonde hair, wearing a soft cream cardigan over a navy top. Warm soft window light, plain neutral grey background, warm composed expression. Sharp focus on eyes. Photorealistic." },
    { filename: "harold-mathieson.png", person: null, prompt: "Editorial professional portrait of a 71-year-old white man with thick silver hair and reading glasses pushed up on his head, wearing a soft denim shirt under a navy blazer. Soft window light, plain neutral grey background, kind direct expression. Sharp focus on eyes. Photorealistic." },
    { filename: "amelia-chen.png", person: null, prompt: "Editorial professional portrait of a 20-year-old Asian-American woman with long straight dark hair and round wire-frame glasses, wearing a soft sage-green sweatshirt. Soft window light, plain neutral grey background, alert curious expression. Sharp focus on eyes. Photorealistic." },
    { filename: "trent-castellanos.png", person: null, prompt: "Editorial professional portrait of a 34-year-old Latino man with carefully styled dark hair and a neatly trimmed beard, wearing a fitted black t-shirt. Soft window light, plain neutral grey background, confident polished expression. Sharp focus on eyes. Photorealistic." },
    { filename: "elaine-ferrante.png", person: null, prompt: "Editorial professional portrait of a 52-year-old Italian-American woman with shoulder-length wavy auburn hair, wearing a soft burgundy blouse and small earrings. Soft window light, plain neutral grey background, warm thoughtful expression. Sharp focus on eyes. Photorealistic." },
    { filename: "raymond-okereke.png", person: null, prompt: "Editorial professional portrait of a 47-year-old Black man with short hair and a salt-and-pepper beard, wearing a soft navy work shirt. Soft window light, plain neutral grey background, steady direct expression. Sharp focus on eyes. Photorealistic." },
    { filename: "jenna-novak.png", person: null, prompt: "Editorial professional portrait of a 29-year-old white woman with long dark hair and bangs, wearing a soft mustard-yellow turtleneck. Soft window light, plain neutral grey background, calm reflective expression. Sharp focus on eyes. Photorealistic." },
  ]
  for (const { filename, prompt, person } of storyPrompts) {
    if (person) {
      await generateImageWithPerson(filename, prompt, person, "1024x1024", STORIES_DIR)
    } else {
      await generateImage(filename, prompt, "1024x1024", STORIES_DIR)
    }
  }

  console.log("SOURCES")
  const sourcePrompts: { filename: string; prompt: string }[] = [
    { filename: "data-centers.png", prompt: "Editorial photograph: rows of server racks inside a hyperscale data center, large cooling pipes overhead carrying clear liquid, soft cool-blue ambient LED light reflected on polished concrete floor. Cinematic depth, documentary mood. No text." },
    { filename: "infant-formula.png", prompt: "Editorial overhead photograph: a clean kitchen counter with a feeding bottle, a small canister of formula powder (label not visible), a measuring scoop, and a clean cloth. Soft warm window light. Documentary-investigative mood with subtle cool-blue undertone. No text." },
    { filename: "public-schools.png", prompt: "Editorial photograph: a school cafeteria during a quiet moment, long lunch tables, clear plastic cups of water at each place setting, sunlight through high windows. Documentary mood, soft cool-blue cast. No text." },
    { filename: "hospital-ivs.png", prompt: "Editorial photograph: a hospital room IV stand with a clear bag of fluid, soft daylight from a window, a neatly made bed in the background, blurred medical equipment. Quiet documentary mood. Soft cool-blue tones. No text." },
    { filename: "organic-produce.png", prompt: "Editorial photograph: a farmer's-market table arranged with fresh leafy greens, tomatoes, and citrus, with a wooden crate and a chalkboard placeholder. Soft daylight, slightly desaturated colors with a cool-blue cast. Documentary mood. No text." },
    { filename: "gym-water-bottles.png", prompt: "Editorial photograph: a gym floor with a stainless-steel water bottle in the foreground next to a folded towel, weight rack and matte black machines blurred in the background. Soft cool-blue light. Documentary editorial mood. No text." },
    { filename: "weather-systems.png", prompt: "Editorial photograph: a heavy rainstorm photographed from inside a window, raindrops streaking down the glass, blurred urban street and umbrellas in the background. Cool-blue tones throughout, documentary mood. No text." },
    { filename: "the-human-bloodstream.png", prompt: "Editorial illustration in photoreal style: a sterile lab bench with a row of clear glass blood-sample vials in a rack, soft daylight, gloves and a clipboard nearby. Cool-blue undertone, investigative-clinical mood. No text." },
  ]
  for (const { filename, prompt } of sourcePrompts) {
    await generateImage(filename, prompt, "1536x1024", SOURCES_DIR)
  }

  console.log("FAVICON SOURCE")
  await generateImage(
    "favicon-source.png",
    "Minimalist square logo on a deep institutional blue background. Centered: a stylized hand-drawn water-droplet shape in cream/off-white, with a single thin diagonal slash across it. Clean, modern nonprofit/advocacy aesthetic. No text. Vector-clean look.",
    "1024x1024",
  )

  console.log("ALL DONE")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

- [ ] **Step 2: Run the generator**

```bash
npx tsx scripts/generate-citizensagainstdhmo-images.ts
```

Expected: ~33 images written to `public/sites/citizensagainstdhmo/`. The script may take 10–30 minutes depending on API throughput. It is safe to re-run; it skips images that already exist.

- [ ] **Step 3: Spot-check a few images**

Open `public/sites/citizensagainstdhmo/hero.png`, `leaders/callum-rutherford.png`, `threats/dhmo-in-ai-data-centers.png`, and `stories/marcus-okafor.png`. Confirm they look reasonable. If any look wrong, delete the file and re-run the script.

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-citizensagainstdhmo-images.ts public/sites/citizensagainstdhmo/
git commit -m "feat(citizensagainstdhmo): generate site imagery"
```

---

## Task 20: Favicon + Resize Script Registration

Resize the favicon source into a 64x64 PNG and register the site in the resize script.

**Files:**
- Modify: `scripts/resize-favicons.mjs`
- Create: `public/sites/citizensagainstdhmo/favicon.png` (copied from favicon-source.png)

- [ ] **Step 1: Stage the favicon source**

Copy the generated favicon source to the expected location:

```bash
cp public/sites/citizensagainstdhmo/favicon-source.png public/sites/citizensagainstdhmo/favicon.png
```

- [ ] **Step 2: Add the site to the resize script**

In `scripts/resize-favicons.mjs`, add `"citizensagainstdhmo"` to the `sites` array.

- [ ] **Step 3: Run the resize script**

```bash
node scripts/resize-favicons.mjs
```

Expected: a 64x64 favicon is produced at `public/sites/citizensagainstdhmo/favicon-64.png` (or the project's standard output path; follow the script's behavior).

- [ ] **Step 4: Commit**

```bash
git add scripts/resize-favicons.mjs public/sites/citizensagainstdhmo/favicon.png public/sites/citizensagainstdhmo/favicon-64.png
git commit -m "feat(citizensagainstdhmo): add 64x64 favicon"
```

---

## Task 21: Final Verification

Confirm the whole site lints, type-checks, and renders end-to-end.

- [ ] **Step 1: Lint and type-check**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both pass with no errors.

- [ ] **Step 2: Production build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Dev smoke test**

Start `npm run dev` and visit each of the following with `?site=citizensagainstdhmo`:

- `/`
- `/threats` (lists 10)
- `/threats/dhmo-in-ai-data-centers`
- `/sources` (lists 8)
- `/sources/data-centers`
- `/stories` (lists 8)
- `/stories/marcus-okafor`
- `/take-action`
- `/impact`
- `/leadership`
- `/about`
- `/contact`
- `/privacy`
- `/terms`

Confirm each renders with the trust-blue theme, header/footer, and no broken images. Stop dev server.

- [ ] **Step 4: Verify invalid slugs 404**

Visit `/threats/nonexistent?site=citizensagainstdhmo` (and equivalent for stories/sources). Expected: 404.

- [ ] **Step 5: Final commit (only if any cleanup)**

If any minor cleanup was needed during smoke testing, commit it now. Otherwise nothing to do.

---

## Plan complete

If every task is complete and the verification at Task 21 passes, the site is ready for deploy.
