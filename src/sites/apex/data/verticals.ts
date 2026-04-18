import type { VerticalKey } from "@/themes"

export interface VerticalMeta {
  key: VerticalKey
  displayName: string
  shortDescription: string
  thesis: string
}

export const verticals: Record<VerticalKey, VerticalMeta> = {
  "consumer-goods": {
    key: "consumer-goods",
    displayName: "Consumer Goods & Consumables",
    shortDescription:
      "Packaged goods, foodstuffs, manufactured items, and legacy artisanal brands serving categories that most retailers have not yet classified.",
    thesis:
      "We invest in consumer categories so specific that the product itself requires an explanation before it can be sold.",
  },
  "hygiene": {
    key: "hygiene",
    displayName: "Personal Hygiene & Home Essentials",
    shortDescription:
      "A category defined by recurring necessity and limited category competition. Bathroom-adjacent brands with serious engineering rigor.",
    thesis:
      "Hygiene categories are recession-resistant, emotionally charged, and chronically underserved by firms unwilling to name what the product does.",
  },
  "health-wellness": {
    key: "health-wellness",
    displayName: "Health & Wellness Holdings",
    shortDescription:
      "Wellness, pharmaceutical-adjacent, and quasi-medical brands positioned at the edge of the regulatory envelope.",
    thesis:
      "Consumers remain willing to pay for wellness outcomes that have not been proven, disproven, or meaningfully defined.",
  },
  "subscription-services": {
    key: "subscription-services",
    displayName: "Subscription Services",
    shortDescription:
      "Recurring-revenue brands in the portfolio. Designed for annualized billing with optional annual renewal.",
    thesis:
      "Subscription economics dominate our modeling; we prefer categories where cancellation requires a phone call.",
  },
  "professional-services": {
    key: "professional-services",
    displayName: "Professional Services & Emerging Ventures",
    shortDescription:
      "Advisory firms, digital infrastructure, specialty services, and incubated ventures that we are still actively categorizing.",
    thesis:
      "Where a category cannot be named, we believe that naming it is itself the service.",
  },
}

export const verticalOrder: VerticalKey[] = [
  "consumer-goods",
  "hygiene",
  "health-wellness",
  "subscription-services",
  "professional-services",
]
