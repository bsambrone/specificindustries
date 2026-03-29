import type { CaseStudy } from "../types"
import { globaltechMeetingOptimization } from "./globaltech-meeting-optimization"
import { pinnacleCalendarSaturation } from "./pinnacle-calendar-saturation"
import { meridianHealthKpi } from "./meridian-health-kpi"
import { apexLogisticsKpi } from "./apex-logistics-kpi"
import { strattonManagementLayers } from "./stratton-management-layers"
import { corebridgeDelegation } from "./corebridge-delegation"
import { novacorpPerceivedProductivity } from "./novacorp-perceived-productivity"
import { dataplexFocusband } from "./dataplex-focusband"
import { vanguardCheckboxCompletion } from "./vanguard-checkbox-completion"
import { sterlingRiskRedistribution } from "./sterling-risk-redistribution"
import { broadleafEmailClarity } from "./broadleaf-email-clarity"
import { titanReplyAll } from "./titan-reply-all"

export const caseStudies: CaseStudy[] = [
  globaltechMeetingOptimization,
  pinnacleCalendarSaturation,
  meridianHealthKpi,
  apexLogisticsKpi,
  strattonManagementLayers,
  corebridgeDelegation,
  novacorpPerceivedProductivity,
  dataplexFocusband,
  vanguardCheckboxCompletion,
  sterlingRiskRedistribution,
  broadleafEmailClarity,
  titanReplyAll,
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getCaseStudiesBySolution(solutionArea: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.solutionArea === solutionArea)
}
