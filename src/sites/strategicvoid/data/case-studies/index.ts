import type { CaseStudy } from "../types"
import { globaltechMeetingOptimization } from "./globaltech-meeting-optimization"

export const caseStudies: CaseStudy[] = [globaltechMeetingOptimization]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getCaseStudiesBySolution(solutionArea: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.solutionArea === solutionArea)
}
