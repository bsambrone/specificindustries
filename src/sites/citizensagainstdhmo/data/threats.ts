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
