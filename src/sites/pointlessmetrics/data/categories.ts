export type ShopCategoryKey = "instruments" | "publications" | "advisory" | "credentialing" | "merchandise"

export interface ShopCategory {
  key: ShopCategoryKey
  label: string
  blurb: string
}

export const shopCategories: ShopCategory[] = [
  { key: "instruments", label: "Instruments", blurb: "Precision apparatus for quantifying intangibles at rest and in motion." },
  { key: "publications", label: "Publications", blurb: "Peer-reviewed reports and our annual indexed compendium of correlations." },
  { key: "advisory", label: "Advisory Services", blurb: "On-site engagements and ongoing coaching retainers." },
  { key: "credentialing", label: "Credentialing", blurb: "The Certified Pointless Metrics Practitioner™ program." },
  { key: "merchandise", label: "Certified Merchandise", blurb: "Official Institute-issued objects, each bearing the seal." },
]

export type FindingCategoryKey = "leadership" | "culture" | "productivity" | "strategy" | "communication" | "workplace"

export interface FindingCategory {
  key: FindingCategoryKey
  label: string
}

export const findingCategories: FindingCategory[] = [
  { key: "leadership", label: "Leadership" },
  { key: "culture", label: "Culture" },
  { key: "productivity", label: "Productivity" },
  { key: "strategy", label: "Strategy" },
  { key: "communication", label: "Communication" },
  { key: "workplace", label: "Workplace" },
]
