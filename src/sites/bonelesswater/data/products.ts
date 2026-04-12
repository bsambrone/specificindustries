export interface Product {
  slug: string
  name: string
  subBrand: string
  format: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  heroImage: string
  detailImage: string
  contextImage: string
  bonelessFreePercent: string
  whatsInside: string[]
  certifications: string[]
}

export const products: Product[] = [
  {
    slug: "purespring-classic",
    name: "PureSpring™ Classic",
    subBrand: "PureSpring™",
    format: "16oz still bottle",
    price: 2.99,
    priceLabel: "$2.99",
    tagline: "The original deboned drinking water.",
    description: [
      "PureSpring™ Classic is the cornerstone of the Boneless Water catalog. Each 16oz bottle is sourced from a verified bone-free aquifer and processed through our proprietary 47-step deboning method, then independently verified by our laboratory partners to be 99.9999% bone-free at point of bottling.",
      "It is, simply, water — but for the first time, with the certainty that it has been processed by people who take the issue seriously.",
      "Our most popular product. Recommended for daily hydration and for households new to the Boneless Water platform.",
    ],
    heroImage: "/sites/bonelesswater/purespring-classic-base.png",
    detailImage: "/sites/bonelesswater/product-purespring-classic-detail.png",
    contextImage: "/sites/bonelesswater/product-purespring-classic-context.png",
    bonelessFreePercent: "99.9999%",
    whatsInside: [
      "Purified drinking water (deboned)",
      "Trace minerals naturally retained during the deboning process",
    ],
    certifications: [
      "BoneScan™ Certified Tier 1",
      "Independent Laboratory Verified",
      "47-Step Process Compliant",
      "ISO 9001:2015",
    ],
  },
  {
    slug: "effervesce",
    name: "Effervesce™",
    subBrand: "Effervesce™",
    format: "16oz carbonated",
    price: 3.49,
    priceLabel: "$3.49",
    tagline: "All the bubbles, none of the bones.",
    description: [
      "Effervesce™ is Boneless Water's answer to the question of how a sparkling water can be both refreshing and skeletally pristine. Carbonation is introduced after our standard 47-step deboning process is complete, ensuring that not a single bone fragment is reintroduced via the carbonation system.",
      "Independently verified at the same 99.9999% bone-free standard as our flagship PureSpring Classic, with the addition of fine effervescent bubbles that some subscribers describe as 'reassuring.'",
      "Recommended for dinner service, formal occasions, and any setting where guests may have unstated indigestion concerns.",
    ],
    heroImage: "/sites/bonelesswater/effervesce-base.png",
    detailImage: "/sites/bonelesswater/product-effervesce-detail.png",
    contextImage: "/sites/bonelesswater/product-effervesce-context.png",
    bonelessFreePercent: "99.9999%",
    whatsInside: [
      "Purified drinking water (deboned)",
      "Food-grade carbon dioxide (independently bone-free)",
    ],
    certifications: [
      "BoneScan™ Certified Tier 1",
      "Carbonation Source Verified",
      "47-Step Process Compliant",
      "ISO 9001:2015",
    ],
  },
  {
    slug: "athletepure",
    name: "AthletePure™ Electrolyte",
    subBrand: "AthletePure™",
    format: "24oz sport with electrolytes",
    price: 3.99,
    priceLabel: "$3.99",
    tagline: "For athletes who cannot risk skeletal contamination during competition.",
    description: [
      "AthletePure™ Electrolyte is engineered for the competitive athlete who understands that ingested aqueous bone fragments may impact recovery time, intestinal performance, and overall hydration efficiency. Our electrolyte blend is mineral-derived, fully synthetic, and certified to be free of any bone-derived calcium.",
      "The 24oz format supports a complete training session at our recommended 99.9999% bone-free standard. We strongly discourage hydrating from any unverified water source during competition.",
      "Endorsed by no professional athletic organizations, but quietly preferred by several.",
    ],
    heroImage: "/sites/bonelesswater/athletepure-base.png",
    detailImage: "/sites/bonelesswater/product-athletepure-detail.png",
    contextImage: "/sites/bonelesswater/product-athletepure-context.png",
    bonelessFreePercent: "99.9999%",
    whatsInside: [
      "Purified drinking water (deboned)",
      "Synthetic electrolyte blend (sodium, potassium, magnesium — all verified bone-free origin)",
      "Trace amber color from natural mineral retention",
    ],
    certifications: [
      "BoneScan™ Certified Tier 1",
      "Electrolyte Origin Verified",
      "47-Step Process Compliant",
      "Athletic Integrity Standard",
    ],
  },
  {
    slug: "heritage-reserve",
    name: "Heritage Reserve",
    subBrand: "Heritage Reserve",
    format: "750ml glass bottle",
    price: 8.99,
    priceLabel: "$8.99",
    tagline: "Triple-filtered. Aged in steel. Hand-verified bone-free.",
    description: [
      "Heritage Reserve is our premium offering for the discerning Boneless Water subscriber. Each 750ml bottle is triple-filtered through our proprietary process, aged for 30 days in food-grade stainless steel maturation tanks, and individually inspected by a senior BoneScan™ technician before being capped.",
      "The brushed steel label plate is mounted directly to the glass and engraved with the Heritage Reserve wordmark and a small CERTIFIED stamp. Each bottle carries a unique batch identifier traceable to the technician who personally verified its bone-free status.",
      "Recommended for special occasions, executive dining, and as a gift to friends and family who have expressed interest in your water-related concerns.",
    ],
    heroImage: "/sites/bonelesswater/heritage-reserve-base.png",
    detailImage: "/sites/bonelesswater/product-heritage-reserve-detail.png",
    contextImage: "/sites/bonelesswater/product-heritage-reserve-context.png",
    bonelessFreePercent: "99.9999%",
    whatsInside: [
      "Purified drinking water (triple-deboned)",
      "Aged 30 days in food-grade stainless steel",
      "Hand-verified by a senior BoneScan™ technician",
    ],
    certifications: [
      "BoneScan™ Certified Tier 1+",
      "Heritage Reserve Standard",
      "Senior Technician Verified",
      "ISO 9001:2015",
    ],
  },
  {
    slug: "infantsafe",
    name: "InfantSafe™ Pediatric Drops",
    subBrand: "InfantSafe™",
    format: "4oz medical dropper",
    price: 12.99,
    priceLabel: "$12.99",
    tagline: "The most vulnerable population. The most rigorous standard.",
    description: [
      "InfantSafe™ Pediatric Drops are formulated for the youngest members of your household. Developing digestive systems are particularly susceptible to ingested aqueous bone fragments, with research suggesting that infants under 6 months are 4× more vulnerable to bone-related digestive disturbances than adults.",
      "InfantSafe™ exceeds our standard 99.9999% bone-free certification with an additional pediatric-grade verification layer. The 4oz amber dropper format is calibrated for ease of use during feeding and is recommended by no specific pediatricians.",
      "Each bottle is individually inspected and sealed in a clean room environment.",
    ],
    heroImage: "/sites/bonelesswater/infantsafe-base.png",
    detailImage: "/sites/bonelesswater/product-infantsafe-detail.png",
    contextImage: "/sites/bonelesswater/product-infantsafe-context.png",
    bonelessFreePercent: "99.99999%",
    whatsInside: [
      "Purified drinking water (pediatric-deboned)",
      "Cleanroom-sealed",
      "Individually inspected",
    ],
    certifications: [
      "BoneScan™ Certified Pediatric",
      "Cleanroom Verified",
      "Pediatric Compliance Standard",
      "ISO 14644-1 Class 7",
    ],
  },
  {
    slug: "k9-hydration",
    name: "K9 Hydration™",
    subBrand: "K9 Hydration™",
    format: "32oz pet bottle",
    price: 6.99,
    priceLabel: "$6.99",
    tagline: "Your dog's smaller intestinal tract makes them disproportionately susceptible.",
    description: [
      "K9 Hydration™ is the only water purification product specifically formulated for canine companions. Dogs metabolize aqueous bone fragments differently than humans, and their smaller intestinal tracts cannot process the same bone-particulate loads that an adult human can tolerate.",
      "Each 32oz bottle is processed through our standard 47-step deboning method and then verified to a veterinary-grade bone-free standard. The wide-bodied bottle is designed for easy pouring into standard pet water bowls.",
      "Your dog cannot tell you that they are uncomfortable. K9 Hydration™ removes the risk before they have to.",
    ],
    heroImage: "/sites/bonelesswater/k9-hydration-base.png",
    detailImage: "/sites/bonelesswater/product-k9-hydration-detail.png",
    contextImage: "/sites/bonelesswater/product-k9-hydration-context.png",
    bonelessFreePercent: "99.9999%",
    whatsInside: [
      "Purified drinking water (deboned to veterinary standard)",
    ],
    certifications: [
      "BoneScan™ Certified Veterinary",
      "Companion Animal Tested",
      "Endorsed by no veterinarians",
      "47-Step Process Compliant",
    ],
  },
  {
    slug: "lab-grade-l1",
    name: "Lab Grade L1",
    subBrand: "Lab Grade L1",
    format: "1L sealed glass",
    price: 49.99,
    priceLabel: "$49.99",
    tagline: "99.99999% bone-free. For research applications and the deeply concerned.",
    description: [
      "Lab Grade L1 is our highest-purity offering, processed through an additional verification cycle beyond our standard 47-step method. Each 1L bottle is sealed under tamper-evident foil in a Class 7 clean room, individually batch-tracked, and verified to a research-grade 99.99999% bone-free standard — one additional decimal of purity beyond our consumer line.",
      "Lab Grade L1 is intended for research applications, sensitive instrumentation, and Boneless Water subscribers whose personal indigestion history requires the highest available certification level. Each bottle includes a printed batch certificate.",
      "Not recommended for casual hydration. Recommended for the deeply concerned.",
    ],
    heroImage: "/sites/bonelesswater/lab-grade-l1-base.png",
    detailImage: "/sites/bonelesswater/product-lab-grade-l1-detail.png",
    contextImage: "/sites/bonelesswater/product-lab-grade-l1-context.png",
    bonelessFreePercent: "99.99999%",
    whatsInside: [
      "Purified drinking water (research-grade deboned)",
      "Cleanroom-sealed under tamper-evident foil",
      "Individually batch-tracked",
    ],
    certifications: [
      "BoneScan™ Certified Research Grade",
      "Cleanroom Class 7 Verified",
      "Tamper-Evident Sealed",
      "Batch Traceable",
    ],
  },
  {
    slug: "household-defense",
    name: "Household Defense Pack",
    subBrand: "Household Defense Pack",
    format: "24-pack case",
    price: 59.99,
    priceLabel: "$59.99",
    tagline: "Protect everyone in your household. Recommended quarterly subscription.",
    description: [
      "The Household Defense Pack is the most cost-effective way to protect every member of your household from the risks of skeletal contamination in unverified drinking water. Each case contains 24 × 16oz bottles of PureSpring™ Classic, processed and certified to our standard 99.9999% bone-free specification.",
      "We recommend a quarterly subscription cadence — one case per household member per quarter — to maintain continuous protection. Subscribers report a measurable improvement in household indigestion within 4-6 weeks of switching from unverified water sources.",
      "Free shipping on subscriptions of 4 cases or more.",
    ],
    heroImage: "/sites/bonelesswater/household-defense-base.png",
    detailImage: "/sites/bonelesswater/product-household-defense-detail.png",
    contextImage: "/sites/bonelesswater/product-household-defense-context.png",
    bonelessFreePercent: "99.9999%",
    whatsInside: [
      "24 × 16oz PureSpring™ Classic bottles",
      "Cardboard case with carry handle",
      "Quarterly subscription welcome card",
    ],
    certifications: [
      "BoneScan™ Certified Tier 1",
      "Household Volume Verified",
      "47-Step Process Compliant",
      "ISO 9001:2015",
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export const homepageFeaturedProducts = ["purespring-classic", "effervesce", "infantsafe", "lab-grade-l1"]
  .map((slug) => products.find((p) => p.slug === slug)!)
