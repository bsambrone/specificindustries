import type { Whitepaper } from "../types"
import { stateOfMeetingOptimization } from "./state-of-meeting-optimization"
import { autonodNeuroscience } from "./autonod-neuroscience"
import { calendarSaturationTheory } from "./calendar-saturation-theory"
import { postKpiFramework } from "./post-kpi-framework"
import { vanityMetricsArt } from "./vanity-metrics-art"
import { goalppostShifting } from "./goalpost-shifting"

export const whitepapers: Whitepaper[] = [
  stateOfMeetingOptimization,
  autonodNeuroscience,
  calendarSaturationTheory,
  postKpiFramework,
  vanityMetricsArt,
  goalppostShifting,
]

export function getWhitepaperBySlug(slug: string): Whitepaper | undefined {
  return whitepapers.find((wp) => wp.slug === slug)
}

export function getWhitepapersBySolution(solutionArea: string): Whitepaper[] {
  return whitepapers.filter((wp) => wp.solutionArea === solutionArea)
}
