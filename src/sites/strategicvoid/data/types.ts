import type { ContentSection } from "@/components/content-sections/section-renderer"

export interface Solution {
  slug: string
  name: string
  tagline: string
  icon: string
  description: string[]
  productSlugs: string[]
}

export interface Product {
  slug: string
  name: string
  solutionArea: string
  price: string
  tagline: string
  description: string[]
  features: string[]
  specs: { label: string; value: string }[]
  image: string
  enterpriseTier?: string
}

export interface CaseStudy {
  slug: string
  title: string
  company: string
  industry: string
  solutionArea: string
  heroStat: { value: string; label: string }
  summary: string
  sections: ContentSection[]
}

export interface Whitepaper {
  slug: string
  title: string
  subtitle: string
  authors: string[]
  readTime: string
  solutionArea: string
  type: "strategic" | "product"
  sections: ContentSection[]
}

export interface Executive {
  slug: string
  name: string
  title: string
  credentials: string
  bio: string
  quote: string
  image: string
  referencePerson: string
}

export interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
}

export interface SolutionPricing {
  solutionSlug: string
  tiers: PricingTier[]
}

export interface PricingFeatureRow {
  label: string
  values: (boolean | string)[]
}
