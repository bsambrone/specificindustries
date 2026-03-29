import type { Whitepaper } from "../types"
import { stateOfMeetingOptimization } from "./state-of-meeting-optimization"

export const whitepapers: Whitepaper[] = [stateOfMeetingOptimization]

export function getWhitepaperBySlug(slug: string): Whitepaper | undefined {
  return whitepapers.find((wp) => wp.slug === slug)
}

export function getWhitepapersBySolution(solutionArea: string): Whitepaper[] {
  return whitepapers.filter((wp) => wp.solutionArea === solutionArea)
}
