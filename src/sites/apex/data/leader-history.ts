import type { SiteConfig, VerticalKey } from "@/themes"
import { siteRegistry } from "@/sites/registry"

type PersonKey = "bill" | "brandon" | "jim" | "sean"

export interface SubsidiaryBoardPosition {
  subdomain: string
  subsiteName: string
  subsiteFavicon: string
  leaderPortrait: string | null
  verticalKey: VerticalKey | null
  nameThere: string
  titleThere: string
  blurb: string
}

interface UnknownLeaderShape {
  person?: string
  name?: string
  title?: string
  bio?: string
  portraitImage?: string
  image?: string
}

function firstSentence(text: string, max = 160): string {
  const period = text.indexOf(". ")
  const core = period > 0 ? text.slice(0, period + 1) : text
  if (core.length <= max) return core
  return core.slice(0, max - 1).trimEnd() + "…"
}

async function loadLeadersFor(subdomain: string): Promise<UnknownLeaderShape[]> {
  try {
    const mod = await import(`@/sites/${subdomain}/data/leadership`)
    const arr = mod as { leaders?: UnknownLeaderShape[]; executives?: UnknownLeaderShape[] }
    return arr.leaders ?? arr.executives ?? []
  } catch {
    return []
  }
}

const ASYNC_CACHE = new Map<string, SubsidiaryBoardPosition[]>()

export async function collectLeaderHistory(person: PersonKey): Promise<SubsidiaryBoardPosition[]> {
  const cached = ASYNC_CACHE.get(person)
  if (cached) return cached

  const results: SubsidiaryBoardPosition[] = []
  for (const [subdomain, site] of Object.entries(siteRegistry)) {
    if (subdomain === "apex") continue
    const leaders = await loadLeadersFor(subdomain)
    const match = leaders.find((l) => l.person === person)
    if (!match) continue
    const config: SiteConfig = site.config
    results.push({
      subdomain,
      subsiteName: config.name,
      subsiteFavicon: `/sites/${subdomain}/favicon.png`,
      leaderPortrait: match.portraitImage ?? match.image ?? null,
      verticalKey: config.verticalKey ?? null,
      nameThere: match.name ?? "Unknown",
      titleThere: match.title ?? "Role Unspecified",
      blurb: match.bio ? firstSentence(match.bio) : "",
    })
  }

  ASYNC_CACHE.set(person, results)
  return results
}
