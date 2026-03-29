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
]

export function getWhitepaperBySlug(slug: string): Whitepaper | undefined {
  return whitepapers.find((wp) => wp.slug === slug)
}

export function getWhitepapersBySolution(solutionArea: string): Whitepaper[] {
  return whitepapers.filter((wp) => wp.solutionArea === solutionArea)
}
