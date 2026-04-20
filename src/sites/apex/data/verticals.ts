import type { VerticalKey } from "@/themes"

export interface VerticalMeta {
  key: VerticalKey
  displayName: string
  shortDescription: string
  thesis: string
}

export const verticals: Record<VerticalKey, VerticalMeta> = {
  "food-beverage": {
    key: "food-beverage",
    displayName: "Food & Beverage",
    shortDescription:
      "Consumable brands operating at the edge of food science, product language, and legal labeling.",
    thesis:
      "We invest in foodstuffs and beverages whose category name is itself a point of consumer negotiation.",
  },
  "consumer-household": {
    key: "consumer-household",
    displayName: "Consumer & Household Goods",
    shortDescription:
      "Packaged goods, manufactured items, games, and novelty products serving use-cases that retailers have not yet formally classified.",
    thesis:
      "We prefer consumer categories so specific that the product itself requires an explanation before it can be sold.",
  },
  "hygiene-wellness": {
    key: "hygiene-wellness",
    displayName: "Hygiene, Health & Wellness",
    shortDescription:
      "Hygiene, pharmaceutical-adjacent, and quasi-medical brands positioned at the edge of the regulatory envelope and recession-resistant by design.",
    thesis:
      "Consumers remain willing to pay for bodily outcomes that have not been proven, disproven, or meaningfully defined.",
  },
  "pets-specialty": {
    key: "pets-specialty",
    displayName: "Pets & Specialty Services",
    shortDescription:
      "Companion-animal platforms and adjacent specialty services whose customers are willing to pay on behalf of a second party.",
    thesis:
      "When the payer is not the end user, price sensitivity is a theoretical concern.",
  },
  "media-platforms": {
    key: "media-platforms",
    displayName: "Media & Creator Platforms",
    shortDescription:
      "Editorial, civic, and creator-economy platforms whose revenue model is inseparable from their audience's worldview.",
    thesis:
      "Categories where the content is the product remain chronically mispriced by firms who insist on distinguishing the two.",
  },
  "professional-tech": {
    key: "professional-tech",
    displayName: "Professional Services & Technology",
    shortDescription:
      "Advisory firms, specialty SaaS, privacy infrastructure, and incubated ventures that we are still actively categorizing.",
    thesis:
      "Where a category cannot be named, we believe that naming it is itself the service.",
  },
}

export const verticalOrder: VerticalKey[] = [
  "food-beverage",
  "consumer-household",
  "hygiene-wellness",
  "pets-specialty",
  "media-platforms",
  "professional-tech",
]
