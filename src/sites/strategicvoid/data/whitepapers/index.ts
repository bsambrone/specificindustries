import type { Whitepaper } from "../types"
import { stateOfMeetingOptimization } from "./state-of-meeting-optimization"
import { autonodNeuroscience } from "./autonod-neuroscience"
import { calendarSaturationTheory } from "./calendar-saturation-theory"
import { postKpiFramework } from "./post-kpi-framework"
import { vanityMetricsArt } from "./vanity-metrics-art"
import { goalppostShifting } from "./goalpost-shifting"
import { middleManagementImperative } from "./middle-management-imperative"
import { synergyAmplificationEffect } from "./synergy-amplification-effect"
import { escalationArchitecture } from "./escalation-architecture"
import { performanceParadox } from "./performance-paradox"
import { focusbandOptics } from "./focusband-optics"
import { taskDeferralPatience } from "./task-deferral-patience"
import { complianceAtScale } from "./compliance-at-scale"
import { checkboxParadox } from "./checkbox-paradox"
import { riskRedistribution } from "./risk-redistribution"
import { communicationSurplus } from "./communication-surplus"
import { replyAllEconomics } from "./reply-all-economics"
import { tonesoftenerFuture } from "./tonesoftener-future"
import { decisionAvoidance } from "./decision-avoidance"
import { coinflipMethodology } from "./coinflip-methodology"
import { consensusIllusion } from "./consensus-illusion"
import { employeeExperienceEquation } from "./employee-experience-equation"
import { pizzaDrivenRetention } from "./pizza-driven-retention"
import { ergomaxEffect } from "./ergomax-effect"

export const whitepapers: Whitepaper[] = [
  stateOfMeetingOptimization,
  autonodNeuroscience,
  calendarSaturationTheory,
  postKpiFramework,
  vanityMetricsArt,
  goalppostShifting,
  middleManagementImperative,
  synergyAmplificationEffect,
  escalationArchitecture,
  performanceParadox,
  focusbandOptics,
  taskDeferralPatience,
  complianceAtScale,
  checkboxParadox,
  riskRedistribution,
  communicationSurplus,
  replyAllEconomics,
  tonesoftenerFuture,
  decisionAvoidance,
  coinflipMethodology,
  consensusIllusion,
  employeeExperienceEquation,
  pizzaDrivenRetention,
  ergomaxEffect,
]

export function getWhitepaperBySlug(slug: string): Whitepaper | undefined {
  return whitepapers.find((wp) => wp.slug === slug)
}

export function getWhitepapersBySolution(solutionArea: string): Whitepaper[] {
  return whitepapers.filter((wp) => wp.solutionArea === solutionArea)
}
