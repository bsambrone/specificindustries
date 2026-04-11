import type { CaseStudy } from "./types"
import { orphanCrushingFactory } from "./orphan-crushing-factory"
import { dickensianDynamics } from "./dickensian-dynamics"
import { throckmortonIndustrialGroup } from "./throckmorton-industrial-group"
import { meridianCoalData } from "./meridian-coal-data"
import { helixFaneShareholderServices } from "./helix-fane-shareholder-services"
import { rustbeltHoldings } from "./rustbelt-holdings"
import { pembertonShaleRefining } from "./pemberton-shale-refining"
import { grassmereAcoustics } from "./grassmere-acoustics"

export const caseStudies: CaseStudy[] = [
  orphanCrushingFactory,
  dickensianDynamics,
  throckmortonIndustrialGroup,
  meridianCoalData,
  helixFaneShareholderServices,
  rustbeltHoldings,
  pembertonShaleRefining,
  grassmereAcoustics,
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getCaseStudiesByArm(armSlug: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.engagedArms.includes(armSlug))
}
