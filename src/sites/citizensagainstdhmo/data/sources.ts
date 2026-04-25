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
