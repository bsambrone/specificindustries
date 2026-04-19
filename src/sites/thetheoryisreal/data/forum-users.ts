// Forum boards + persistent username ↔ avatar mapping.
// Each shared testimonial image maps to exactly one satirical username.
// The same user appears in multiple threads, evidence submissions, and optional product reviews.

import type { ForumBoard } from "../types"

export const boards: ForumBoard[] = [
  {
    key: "atmospheric-anomalies",
    title: "Atmospheric Anomalies",
    tagline: "What's actually in the sky. Post your cross-hatches.",
    icon: "☁️",
  },
  {
    key: "reptilian-sightings",
    title: "Reptilian Sightings",
    tagline: "Dental glitches, slow blinks, suspicious sunlight allergies.",
    icon: "🦎",
  },
  {
    key: "npc-watch",
    title: "NPC Watch",
    tagline: "Seven-second pause threads. Identify, report, tag.",
    icon: "👁",
  },
  {
    key: "signal-interference",
    title: "Signal Interference",
    tagline: "Grid anomalies, substation hums, 6G migraines.",
    icon: "📡",
  },
  {
    key: "general",
    title: "General Truth-Seeking",
    tagline: "For what doesn't fit anywhere else yet.",
    icon: "🔎",
  },
]

// Fixed mapping: testimonial avatar → satirical username.
// Author exactly one username per avatar. Reuse the same username across all threads.
export const USERNAME_BY_AVATAR: Record<string, string> = {
  "/shared/testimonials/adelaide-muncy.png": "MuncyVigilant",
  "/shared/testimonials/asher-bloom.png": "BloomRecon_77",
  "/shared/testimonials/beauregard-holt.png": "TrenchCoat_Seer",
  "/shared/testimonials/brenda-faulk.png": "FaulkOnTheFence",
  "/shared/testimonials/caldwell-briggs.png": "BriggsOffGrid",
  "/shared/testimonials/capt-rourke-vallis.png": "Capt_Vallis",
  "/shared/testimonials/chad-gullet.png": "GulletAwakened",
  "/shared/testimonials/clement-ashby.png": "AshbySignal",
  "/shared/testimonials/coach-derrick-plum.png": "CoachNPCHunter",
  "/shared/testimonials/derek-pullman.png": "PullmanPulse",
  "/shared/testimonials/dr-moira-petrescu.png": "Dr_Petrescu_ret",
  "/shared/testimonials/eamon-trestle.png": "TrestleTrue",
  "/shared/testimonials/eleanor-whittaker.png": "WhittakerWatcher",
  "/shared/testimonials/elise-tanaka.png": "TanakaTransmits",
  "/shared/testimonials/fenella-ostrom.png": "OstromOrbital",
  "/shared/testimonials/francois-delacroix.png": "Delacroix_Decoder",
  "/shared/testimonials/greg-diane-hofstra.png": "HofstraDuplex",
  "/shared/testimonials/hattie-bronwyn.png": "BronwynBroadcast",
  "/shared/testimonials/jason-kile.png": "KileWasRight",
  "/shared/testimonials/judson-hale.png": "HaleOnHigh",
  "/shared/testimonials/kyle-brandt.png": "BrandtBreakthrough",
  "/shared/testimonials/linda-morrissey.png": "MorrisseyMarginalia",
  "/shared/testimonials/marcus-chen.png": "ChenConfirmed",
  "/shared/testimonials/margaux-sanderling.png": "SanderlingSaw",
  "/shared/testimonials/margot-finch.png": "FinchFrequency",
  "/shared/testimonials/nina-cabrera.png": "CabreraCortex",
  "/shared/testimonials/orson-pepperdine.png": "PepperdineProof",
  "/shared/testimonials/patricia-hollowell.png": "HollowellHeard",
  "/shared/testimonials/priscilla-voss-bingham.png": "VossBinghamVerified",
  "/shared/testimonials/rev-thomasina-oakes.png": "OakesObserves",
  "/shared/testimonials/rosalind-keck.png": "KeckCoordinate",
  "/shared/testimonials/ryan-ashford.png": "AshfordAnomaly",
  "/shared/testimonials/simone-archer.png": "ArcherAtmosphere",
  "/shared/testimonials/tamara-voss.png": "VossTransmission",
  "/shared/testimonials/tamsin-kerrigan.png": "KerriganKnows",
  "/shared/testimonials/theodora-lindquist.png": "LindquistLookout",
  "/shared/testimonials/tony-mazetti.png": "MazettiMidnight",
  "/shared/testimonials/warren-duvall.png": "DuvallDocuments",
}

export const ALL_USERNAMES = Object.values(USERNAME_BY_AVATAR)

export function getAvatarForUsername(username: string): string | undefined {
  return Object.entries(USERNAME_BY_AVATAR).find(([, u]) => u === username)?.[0]
}

export function getBoardByKey(key: string): ForumBoard | undefined {
  return boards.find((b) => b.key === key)
}
