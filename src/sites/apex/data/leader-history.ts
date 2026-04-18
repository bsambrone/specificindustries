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
  baseImage?: string
  name?: string
  title?: string
  bio?: string | string[]
  portraitImage?: string
  image?: string
  portrait?: string
}

function pickPortrait(l: UnknownLeaderShape): string | null {
  return l.portraitImage ?? l.image ?? l.portrait ?? null
}

function pickPerson(l: UnknownLeaderShape): string | undefined {
  return l.person ?? l.baseImage
}

function asBioText(bio: string | string[] | undefined): string {
  if (!bio) return ""
  if (Array.isArray(bio)) return bio[0] ?? ""
  return bio
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
    const arr = mod as {
      leaders?: UnknownLeaderShape[]
      executives?: UnknownLeaderShape[]
      founders?: UnknownLeaderShape[]
    }
    return arr.leaders ?? arr.executives ?? arr.founders ?? []
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
    const match = leaders.find((l) => pickPerson(l) === person)
    if (!match) continue
    const config: SiteConfig = site.config
    const bio = asBioText(match.bio)
    results.push({
      subdomain,
      subsiteName: config.name,
      subsiteFavicon: `/sites/${subdomain}/favicon.png`,
      leaderPortrait: pickPortrait(match),
      verticalKey: config.verticalKey ?? null,
      nameThere: match.name ?? "Unknown",
      titleThere: match.title ?? "Role Unspecified",
      blurb: bio ? firstSentence(bio) : "",
    })
  }

  ASYNC_CACHE.set(person, results)
  return results
}
