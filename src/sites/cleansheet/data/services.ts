export interface Service {
  slug: string
  name: string
  price: string
  tagline: string
  description: string
  includes: string[]
}

export interface LoyaltyTier {
  name: string
  range: string
  description: string
}

export const services: Service[] = [
  {
    slug: "fresh-start",
    name: "The Fresh Start",
    price: "$5,000/load",
    tagline: "Everyone deserves a clean beginning.",
    description:
      "Our entry-level service. We take your dirtiest items and return them spotless. No questions asked about where the stains came from.",
    includes: [
      "Full wash and fold",
      "Basic documentation of cleaning",
      "Stain origin assessment (optional, non-binding)",
      "Complimentary garment bag (unmarked)",
    ],
  },
  {
    slug: "full-cycle",
    name: "The Full Cycle",
    price: "$25,000/load",
    tagline: "From dirty to documented.",
    description:
      "Complete processing from intake to return. Your items enter dirty and leave with full documentation of their cleaning history. Ideal for items that need a verifiable provenance.",
    includes: [
      "Multi-stage wash across two facilities",
      "Complete paper trail and cleaning receipts",
      "Provenance documentation for each item",
      "Notarized certificate of cleanliness",
    ],
  },
  {
    slug: "offshore-dry-cleaning",
    name: "Offshore Dry Cleaning",
    price: "$50,000/load",
    tagline: "Some fabrics need international expertise.",
    description:
      "We ship to our overseas facilities in the Cayman Islands, Switzerland, and Panama for specialized treatment. Extended processing times reflect the thoroughness of our international cleaning protocols.",
    includes: [
      "International shipping and handling",
      "Processing across three overseas facilities",
      "Multi-jurisdictional cleaning certificates",
      "Items returned via diplomatic pouch (optional)",
    ],
  },
  {
    slug: "bulk-processing",
    name: "Bulk Processing",
    price: "Custom Quote",
    tagline: "We handle loads of any size.",
    description:
      "High-volume clients with large, recurring loads. We process any amount — our capacity is virtually unlimited. Volume discounts available for loads exceeding $1M. Contact us for a discreet quote.",
    includes: [
      "Unlimited capacity",
      "Dedicated processing line",
      "Volume-based pricing structure",
      "After-hours drop-off and pickup",
    ],
  },
  {
    slug: "executive-press",
    name: "The Executive Press",
    price: "$100,000/load",
    tagline: "White-glove service for white-collar garments.",
    description:
      "Our top-tier offering. Dedicated account manager, private drop-off suite, and absolute confidentiality. Your items are handled by our most senior staff. NDA included at no additional charge.",
    includes: [
      "Private drop-off suite with separate entrance",
      "Dedicated senior account manager",
      "Mutual non-disclosure agreement",
      "Items processed in an undisclosed facility",
      "Emergency overnight processing available",
    ],
  },
  {
    slug: "stain-consultation",
    name: "Stain Consultation",
    price: "Free",
    tagline: "Some stains require creative solutions.",
    description:
      "Book a private, off-the-record consultation to discuss your most challenging items. Our specialists have seen it all and judged none of it. Attorney-client privilege does not apply, but we wish it did.",
    includes: [
      "30-minute private consultation",
      "Assessment of stain complexity",
      "Custom treatment plan",
      "All notes shredded after meeting",
    ],
  },
]

export const loyaltyTiers: LoyaltyTier[] = [
  {
    name: "Rinse",
    range: "0–10 loads/year",
    description:
      "Basic access. Standard processing times. Documentation provided upon request.",
  },
  {
    name: "Spin",
    range: "10–50 loads/year",
    description:
      "Priority processing, dedicated account manager, after-hours drop-off access. We start remembering your name but not your face.",
  },
  {
    name: "Pressed",
    range: "50+ loads/year",
    description:
      "Offshore facility access, no documentation required, private entrance, emergency overnight processing. For clients who value speed and anonymity in equal measure.",
  },
]

export const faqItems = [
  {
    question: "Why are your prices so much higher than other laundromats?",
    answer: "Quality has a cost. Discretion has a premium.",
  },
  {
    question: "Do you accept cash?",
    answer:
      "We prefer cash. In fact, we strongly prefer cash. Large denominations are welcome. We do not report transactions under $10,000, and we are very good at counting to $9,999.",
  },
  {
    question: "What documentation do you provide?",
    answer:
      "Every load comes with a complete paper trail showing legitimate cleaning services rendered. Our receipts have been described as 'suspiciously thorough' by several CPAs.",
  },
  {
    question: "Is there a limit on load size?",
    answer:
      "No. We have processed loads that would make other facilities uncomfortable. Our industrial equipment can handle anything.",
  },
  {
    question: "What is your privacy policy?",
    answer:
      "We don't know who you are. We've never met you. This interaction never happened. Also, please see our Privacy Policy page.",
  },
]
