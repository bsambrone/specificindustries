export type CompetitorCategory = "legitimate" | "bones" | "pond"

export interface Competitor {
  slug: string
  name: string
  category: CompetitorCategory
  productImage: string
  fudClaim: string
  features: {
    h2oPresent: boolean
    skeletalFree: boolean
    bonescanCertified: boolean
    fortySevenStep: boolean
    peerReviewed: boolean
    bottlingDistance: boolean
    visibleBones: boolean
    visibleAmphibians: boolean
  }
}

export const competitors: Competitor[] = [
  {
    slug: "aquaserene",
    name: "AquaSerene",
    category: "legitimate",
    productImage: "/sites/bonelesswater/competitor-aquaserene.png",
    fudClaim: "Sourced from a spring within 200 miles of a Civil War battlefield. Atmospheric bone exposure cannot be ruled out. Their refusal to commission a proximity audit speaks for itself.",
    features: {
      h2oPresent: true,
      skeletalFree: false,
      bonescanCertified: false,
      fortySevenStep: false,
      peerReviewed: false,
      bottlingDistance: false,
      visibleBones: false,
      visibleAmphibians: false,
    },
  },
  {
    slug: "purecrest",
    name: "PureCrest Mountain",
    category: "legitimate",
    productImage: "/sites/bonelesswater/competitor-purecrest.png",
    fudClaim: "Bottling facility shares a property line with an orthodontic clinic. We have flagged this proximity violation in our internal compliance log. They have not responded to our certified letters.",
    features: {
      h2oPresent: true,
      skeletalFree: false,
      bonescanCertified: false,
      fortySevenStep: false,
      peerReviewed: false,
      bottlingDistance: false,
      visibleBones: false,
      visibleAmphibians: false,
    },
  },
  {
    slug: "springvale",
    name: "Spring Vale Natural",
    category: "legitimate",
    productImage: "/sites/bonelesswater/competitor-springvale.png",
    fudClaim: "Their watershed contains observable cattle. Cattle possess approximately 207 bones each. The math is the math.",
    features: {
      h2oPresent: true,
      skeletalFree: false,
      bonescanCertified: false,
      fortySevenStep: false,
      peerReviewed: false,
      bottlingDistance: false,
      visibleBones: false,
      visibleAmphibians: false,
    },
  },
  {
    slug: "bonespring",
    name: "BoneSpring™",
    category: "bones",
    productImage: "/sites/bonelesswater/competitor-bonespring.png",
    fudClaim: "Has been marketing 'fresh bone fragments for added calcium' since 1923. Their bottle visibly contains bone bits suspended in the water. They are at least honest about it.",
    features: {
      h2oPresent: true,
      skeletalFree: false,
      bonescanCertified: false,
      fortySevenStep: false,
      peerReviewed: false,
      bottlingDistance: false,
      visibleBones: true,
      visibleAmphibians: false,
    },
  },
  {
    slug: "marrowpure",
    name: "MarrowPure™",
    category: "bones",
    productImage: "/sites/bonelesswater/competitor-marrowpure.png",
    fudClaim: "Even more explicit than BoneSpring. Visible whole knuckle bones in the bottle. Marketed to bodybuilders. Endorsed by no medical organization.",
    features: {
      h2oPresent: true,
      skeletalFree: false,
      bonescanCertified: false,
      fortySevenStep: false,
      peerReviewed: false,
      bottlingDistance: false,
      visibleBones: true,
      visibleAmphibians: false,
    },
  },
  {
    slug: "murklake",
    name: "Murklake® Reservoir Water",
    category: "pond",
    productImage: "/sites/bonelesswater/competitor-murklake.png",
    fudClaim: "Bottled directly from a Wisconsin reservoir without filtration. Proudly markets its 'naturally occurring biodiversity.' Contains bones, vertebrates, and amphibians by design.",
    features: {
      h2oPresent: true,
      skeletalFree: false,
      bonescanCertified: false,
      fortySevenStep: false,
      peerReviewed: false,
      bottlingDistance: false,
      visibleBones: true,
      visibleAmphibians: true,
    },
  },
]

export function getCompetitorBySlug(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug)
}
