import type { CaseStudy } from "../types"
import { globaltechMeetingOptimization } from "./globaltech-meeting-optimization"
import { pinnacleCalendarSaturation } from "./pinnacle-calendar-saturation"
import { meridianHealthKpi } from "./meridian-health-kpi"
import { apexLogisticsKpi } from "./apex-logistics-kpi"

export const caseStudies: CaseStudy[] = [
  globaltechMeetingOptimization,
  pinnacleCalendarSaturation,
  meridianHealthKpi,
  apexLogisticsKpi,
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getCaseStudiesBySolution(solutionArea: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.solutionArea === solutionArea)
}
