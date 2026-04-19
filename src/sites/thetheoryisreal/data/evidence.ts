import type { EvidenceItem } from "../types"
import { ALL_USERNAMES } from "./forum-users"

// Sanity: submittedBy values must match an entry in ALL_USERNAMES. The set is
// imported above so a missing username causes a typecheck-adjacent failure the
// next time this module is touched by anything that consumes it.
const KNOWN = new Set(ALL_USERNAMES)

function submitter(name: string): string {
  if (!KNOWN.has(name)) {
    throw new Error(`Unknown evidence submitter: ${name}`)
  }
  return name
}

export const evidenceItems: EvidenceItem[] = [
  {
    id: "portland-bus-stop-drone",
    image: "/sites/thetheoryisreal/evidence/portland-bus-stop-drone.png",
    caption:
      "FOOTAGE: suspected surveillance drone (disguised as pigeon) observing passengers, NW 5th & Glisan bus stop, Portland, 2026-02-12.",
    submittedBy: submitter("DuvallDocuments"),
    tags: ["pigeon", "surveillance", "urban"],
    annotations: [
      { kind: "circle", x: 62, y: 41, w: 14 },
      { kind: "arrow", x: 45, y: 55, rotation: 20 },
    ],
  },
  {
    id: "sky-memphis-2026-03-17",
    image: "/sites/thetheoryisreal/evidence/sky-memphis-2026-03-17.png",
    caption:
      "Cross-hatch formation, 2:47 PM start, Memphis, 2026-03-17. Third occurrence in 21 days.",
    submittedBy: submitter("DuvallDocuments"),
    tags: ["chemtrails", "memphis", "tuesday"],
    annotations: [
      { kind: "circle", x: 30, y: 25, w: 20 },
      { kind: "circle", x: 65, y: 30, w: 18 },
    ],
  },
  {
    id: "grocery-aisle-npc",
    image: "/sites/thetheoryisreal/evidence/grocery-aisle-npc.png",
    caption:
      "Subject held the same can of beans for 7.4 seconds without moving. Classic seven-second pause. Returned to identical posture after my second walk-by.",
    submittedBy: submitter("CoachNPCHunter"),
    tags: ["npc", "retail", "pause-test"],
    annotations: [{ kind: "circle", x: 50, y: 50, w: 22 }],
  },

  // Clouds/sky — 4 more (total 5 with Memphis)
  {
    id: "sky-omaha-lattice",
    image: "/sites/thetheoryisreal/evidence/sky-omaha-lattice.png",
    caption:
      "Lattice pattern over Omaha, 6:14 AM, 2026-01-29. Five parallel trails, three cross-trails, resolved into a regular grid within nine minutes.",
    submittedBy: submitter("ArcherAtmosphere"),
    tags: ["chemtrails", "lattice", "dawn"],
    annotations: [
      { kind: "circle", x: 50, y: 38, w: 28 },
      { kind: "arrow", x: 20, y: 62, rotation: 35 },
    ],
  },
  {
    id: "sky-boulder-spiral",
    image: "/sites/thetheoryisreal/evidence/sky-boulder-spiral.png",
    caption:
      "Logarithmic spiral disperses over the Flatirons, Boulder, 2026-03-02, 4:41 PM. No aircraft visible on public radar feeds within 60 miles at the start of formation.",
    submittedBy: submitter("OstromOrbital"),
    tags: ["chemtrails", "spiral", "boulder"],
    annotations: [{ kind: "circle", x: 48, y: 48, w: 32 }],
  },
  {
    id: "sky-austin-noon-blank",
    image: "/sites/thetheoryisreal/evidence/sky-austin-noon-blank.png",
    caption:
      "Completely blank sky over Austin at solar noon, 2026-04-04. No clouds, no trails, no birds. Forecast called for 40% cloud cover.",
    submittedBy: submitter("AshbySignal"),
    tags: ["chemtrails", "suppression", "austin"],
    annotations: [{ kind: "circle", x: 50, y: 30, w: 40 }],
  },
  {
    id: "sky-minneapolis-starling",
    image: "/sites/thetheoryisreal/evidence/sky-minneapolis-starling.png",
    caption:
      "Starling murmuration resolves into a rectangular block for ~11 seconds, Lake of the Isles, Minneapolis, 2026-03-08. Blocks are not a natural formation.",
    submittedBy: submitter("TanakaTransmits"),
    tags: ["atmospheric", "birds", "formation"],
    annotations: [
      { kind: "circle", x: 55, y: 45, w: 22 },
      { kind: "arrow", x: 30, y: 55, rotation: 10 },
    ],
  },

  // Pigeons/birds — 3
  {
    id: "pigeon-capitol-hill",
    image: "/sites/thetheoryisreal/evidence/pigeon-capitol-hill.png",
    caption:
      "Single pigeon held position on a bench arm, Capitol Hill DC, 2026-02-19, 1:04 PM, for 14 minutes. Did not respond to my approach until I passed within 40 cm.",
    submittedBy: submitter("DuvallDocuments"),
    tags: ["pigeon", "surveillance", "dc"],
    annotations: [{ kind: "circle", x: 58, y: 48, w: 16 }],
  },
  {
    id: "pigeon-subway-platform",
    image: "/sites/thetheoryisreal/evidence/pigeon-subway-platform.png",
    caption:
      "Indoor pigeon, Atlantic Ave platform, 2026-03-11. Tracked passengers' faces as they moved; did not eat from dropped pastry within 1 meter.",
    submittedBy: submitter("AshbySignal"),
    tags: ["pigeon", "transit", "indoor"],
    annotations: [
      { kind: "circle", x: 42, y: 50, w: 18 },
      { kind: "arrow", x: 68, y: 42, rotation: 195 },
    ],
  },
  // Celebrities mid-glitch — 3
  {
    id: "celebrity-late-night-teeth",
    image: "/sites/thetheoryisreal/evidence/celebrity-late-night-teeth.png",
    caption:
      "Frame-by-frame from a late-night broadcast, 2026-02-05. Subject's upper canine visibly extended beyond the adjacent teeth for one frame at 00:04:12. Extension not present in any other frame.",
    submittedBy: submitter("KileWasRight"),
    tags: ["reptilian", "broadcast", "frame-extract"],
    annotations: [{ kind: "circle", x: 52, y: 47, w: 18 }],
  },
  {
    id: "celebrity-awards-blink",
    image: "/sites/thetheoryisreal/evidence/celebrity-awards-blink.png",
    caption:
      "Awards-show subject registered a three-part blink — lower lid, upper lid, secondary membrane — during reaction shot, 2026-03-27. Secondary membrane visible for 2 frames.",
    submittedBy: submitter("HollowellHeard"),
    tags: ["reptilian", "blink", "awards"],
    annotations: [
      { kind: "circle", x: 48, y: 42, w: 20 },
      { kind: "arrow", x: 30, y: 55, rotation: 15 },
    ],
  },
  {
    id: "celebrity-podcast-pause",
    image: "/sites/thetheoryisreal/evidence/celebrity-podcast-pause.png",
    caption:
      "Guest on mainstream podcast paused for 7.1 seconds after a direct question, mid-sentence, 2026-04-01. The host did not acknowledge the pause. Neither did the guest when they resumed.",
    submittedBy: submitter("CoachNPCHunter"),
    tags: ["npc", "podcast", "pause-test"],
    annotations: [{ kind: "circle", x: 50, y: 50, w: 24 }],
  },

  // Smart devices behaving oddly — 3
  {
    id: "smart-fridge-midnight-log",
    image: "/sites/thetheoryisreal/evidence/smart-fridge-midnight-log.png",
    caption:
      "Smart-fridge console log from 00:00 to 00:14, 2026-02-27. Fourteen compressor cycles, no temperature change, no door-open events. Household was asleep.",
    submittedBy: submitter("FinchFrequency"),
    tags: ["smart-device", "log", "nocturnal"],
    annotations: [
      { kind: "circle", x: 40, y: 35, w: 26 },
      { kind: "circle", x: 60, y: 62, w: 22 },
    ],
  },
  {
    id: "thermostat-schedule-drift",
    image: "/sites/thetheoryisreal/evidence/thermostat-schedule-drift.png",
    caption:
      "Smart thermostat rescheduled heating cycle 11 minutes earlier each morning for seven consecutive days. No app changes logged on my end. Screenshot from setpoint history, 2026-03-15.",
    submittedBy: submitter("BrandtBreakthrough"),
    tags: ["smart-device", "drift", "schedule"],
    annotations: [{ kind: "arrow", x: 45, y: 50, rotation: 25 }],
  },
  {
    id: "doorbell-cam-false-person",
    image: "/sites/thetheoryisreal/evidence/doorbell-cam-false-person.png",
    caption:
      "Doorbell camera flagged a 'person' event, 2026-03-29 at 3:02 AM. The porch was empty. The recording is empty. The event is still in my alert log.",
    submittedBy: submitter("AshbySignal"),
    tags: ["smart-device", "doorbell", "phantom"],
    annotations: [{ kind: "circle", x: 50, y: 50, w: 28 }],
  },

  // NPCs in public settings — 3 (grocery counted above; we need 2 more plus one already there)
  {
    id: "npc-coffee-shop-loop",
    image: "/sites/thetheoryisreal/evidence/npc-coffee-shop-loop.png",
    caption:
      "Subject ordered the same drink four times in 38 minutes, same counter attendant, same phrasing, same tip. Coffee shop, Ann Arbor, 2026-02-09.",
    submittedBy: submitter("CoachNPCHunter"),
    tags: ["npc", "loop", "coffee"],
    annotations: [
      { kind: "circle", x: 46, y: 50, w: 20 },
      { kind: "arrow", x: 65, y: 38, rotation: 180 },
    ],
  },
  {
    id: "npc-park-bench-sync",
    image: "/sites/thetheoryisreal/evidence/npc-park-bench-sync.png",
    caption:
      "Three strangers on adjacent benches took a drink from their respective water bottles within the same 0.3-second window. Prospect Park, 2026-03-21.",
    submittedBy: submitter("CoachNPCHunter"),
    tags: ["npc", "sync", "park"],
    annotations: [
      { kind: "circle", x: 22, y: 55, w: 14 },
      { kind: "circle", x: 50, y: 55, w: 14 },
      { kind: "circle", x: 78, y: 55, w: 14 },
    ],
  },
  // Reptilian tells — 2
  {
    id: "reptilian-news-anchor-tongue",
    image: "/sites/thetheoryisreal/evidence/reptilian-news-anchor-tongue.png",
    caption:
      "Evening news, 2026-03-06. Anchor's tongue visibly forked at tip during a three-frame segment while delivering weather recap. Broadcast archive purged within 48 hours.",
    submittedBy: submitter("TrestleTrue"),
    tags: ["reptilian", "broadcast", "tongue"],
    annotations: [{ kind: "circle", x: 50, y: 48, w: 18 }],
  },
  {
    id: "reptilian-yoga-instructor-sunlight",
    image: "/sites/thetheoryisreal/evidence/reptilian-yoga-instructor-sunlight.png",
    caption:
      "Outdoor yoga instructor changed position to remain in shade seven separate times over a 45-minute class, 2026-03-14. Other instructors at the same event did not.",
    submittedBy: submitter("VossBinghamVerified"),
    tags: ["reptilian", "sunlight", "behavior"],
    annotations: [
      { kind: "arrow", x: 30, y: 40, rotation: 30 },
      { kind: "circle", x: 60, y: 55, w: 18 },
    ],
  },

  // Substations — 2
  {
    id: "substation-hum-spokane",
    image: "/sites/thetheoryisreal/evidence/substation-hum-spokane.png",
    caption:
      "Utility substation outside Spokane, 2026-01-18. Audible hum measured at 62 dB at 40 meters. Published rating for this installation is 38 dB at the fence line.",
    submittedBy: submitter("BriggsOffGrid"),
    tags: ["substation", "hum", "spokane"],
    annotations: [
      { kind: "circle", x: 45, y: 50, w: 22 },
      { kind: "arrow", x: 20, y: 65, rotation: 10 },
    ],
  },
  {
    id: "substation-new-transformer",
    image: "/sites/thetheoryisreal/evidence/substation-new-transformer.png",
    caption:
      "Unannounced new transformer cabinet appeared behind a strip mall in Tempe overnight, 2026-02-23. No work orders filed with the city. Access panel has no manufacturer label.",
    submittedBy: submitter("PepperdineProof"),
    tags: ["substation", "unannounced", "tempe"],
    annotations: [{ kind: "circle", x: 55, y: 45, w: 28 }],
  },

  // Mundane household items that "aren't right" — 2
  {
    id: "household-fridge-magnet-drift",
    image: "/sites/thetheoryisreal/evidence/household-fridge-magnet-drift.png",
    caption:
      "Fridge magnets rearranged themselves into a three-row grid overnight, 2026-03-23. No one else in the house. Photographed before breakfast.",
    submittedBy: submitter("FaulkOnTheFence"),
    tags: ["household", "drift", "overnight"],
    annotations: [{ kind: "circle", x: 50, y: 50, w: 36 }],
  },
  {
    id: "household-ceiling-fan-stop",
    image: "/sites/thetheoryisreal/evidence/household-ceiling-fan-stop.png",
    caption:
      "Ceiling fan stopped rotating mid-cycle, held position for 4 seconds, resumed at the same speed in the same direction. Recorded on a phone camera, 2026-04-06.",
    submittedBy: submitter("WhittakerWatcher"),
    tags: ["household", "pause", "fan"],
    annotations: [{ kind: "circle", x: 50, y: 40, w: 24 }],
  },

  // One leaked document scan — 1
  {
    id: "leaked-memo-redacted",
    image: "/sites/thetheoryisreal/evidence/leaked-memo-redacted.png",
    caption:
      "Two-page internal memo, heavily redacted, received via intermediary, 2026-02-28. Visible subject line references 'residential acoustic scheduling'. Origin unverified.",
    submittedBy: submitter("Dr_Petrescu_ret"),
    tags: ["document", "redacted", "leak"],
    annotations: [
      { kind: "circle", x: 35, y: 25, w: 22 },
      { kind: "circle", x: 62, y: 58, w: 18 },
    ],
  },
]

export function getEvidenceById(id: string): EvidenceItem | undefined {
  return evidenceItems.find((e) => e.id === id)
}
