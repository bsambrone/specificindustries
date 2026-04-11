export interface ServiceArm {
  slug: string
  name: string
  nickname: string
  tagline: string
  overview: string[]
  image: string
  productSlugs: string[]
}

export interface ProofPoint {
  value: string
  label: string
}

export interface Service {
  slug: string
  armSlug: string
  name: string
  tagline: string
  shortDescription: string
  description: string[]
  deliverables: string[]
  engagementModel: string
  proofPoints: ProofPoint[]
  image: string
}
