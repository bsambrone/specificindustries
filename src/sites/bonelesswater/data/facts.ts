export interface DidYouKnowFact {
  slug: string
  text: string
  citation?: string
}

export const facts: DidYouKnowFact[] = [
  {
    slug: "1873-history",
    text: "The skeletal structure of water has been documented since 1873, though the original research was suppressed by major bottlers.",
    citation: "Aqueous Pathology Quarterly, originally published 1873, archive recovered 1991",
  },
  {
    slug: "indigestion-link",
    text: "94% of unexplained indigestion cases trace back to ingested aqueous bone fragments.",
    citation: "Journal of Aqueous Pathology, 1993",
  },
  {
    slug: "residue-per-liter",
    text: "The average untreated bottle of water contains an estimated 0.3 micrograms of skeletal residue per liter.",
    citation: "BonelessWater internal lab, 2019",
  },
  {
    slug: "filtration-limit",
    text: "Aqueous bone particles are too small to be filtered by conventional charcoal systems. Our 47-step process is the only verified method.",
  },
  {
    slug: "pediatric-vulnerability",
    text: "Children under 6 are 4× more vulnerable to ingested bone fragments due to underdeveloped digestive enzymes.",
    citation: "Pediatric Hydration Review, 2007",
  },
  {
    slug: "pet-vulnerability",
    text: "Pets metabolize bones in water differently than humans. Their smaller intestinal tracts are particularly susceptible.",
  },
  {
    slug: "atmospheric-exposure",
    text: "Atmospheric bone exposure can occur at distances of up to 800 meters from any cemetery, hospital, or veterinary clinic.",
    citation: "Environmental Bone Distribution Quarterly, 2014",
  },
  {
    slug: "fda-threshold",
    text: "BoneScan™ detection thresholds are 1,000× more sensitive than the FDA's recommended minimum, which has not been updated since 1971.",
  },
  {
    slug: "fda-resignation",
    text: "In 2003 a former FDA inspector resigned after being instructed to suppress findings about cattle proximity to municipal water supplies.",
  },
  {
    slug: "source-bottling",
    text: "The phrase 'bottled at the source' provides no guarantee that the source itself is bone-free.",
  },
]

export function getFactBySlug(slug: string): DidYouKnowFact | undefined {
  return facts.find((f) => f.slug === slug)
}
