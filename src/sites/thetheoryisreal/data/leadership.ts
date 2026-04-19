import type { LeaderDossier } from "../types"

// Four photos sourced from /public/shared/testimonials/.
// The RedactedPortrait component renders black bars over the eyes at display time.
export const dossiers: LeaderDossier[] = [
  {
    id: "subject-07",
    blurredPhoto: "/shared/testimonials/warren-duvall.png",
    biography:
      "Former regional HVAC supervisor at a Fortune-500 whose name cannot be published. Observed atmospheric delivery patterns over a 14-month period while servicing rooftop units. Maintains a private archive of duct-sample photographs. Corresponds only via paper mail forwarded through a third party in Ohio.",
    expertise: "Atmospheric delivery systems · duct forensics",
    statusTag: "ACTIVE",
  },
  {
    id: "subject-12",
    blurredPhoto: "/shared/testimonials/clement-ashby.png",
    biography:
      "Worked in municipal utilities for 22 years before identifying what they call 'the pulse' in the substation at the edge of town. Retired under unusual circumstances in 2019. Does not use any device manufactured after 2006. Contributes via handwritten weekly dispatches.",
    expertise: "Signal interference · grid anomalies",
    statusTag: "DEEP COVER",
  },
  {
    id: "subject-19",
    blurredPhoto: "/shared/testimonials/rev-thomasina-oakes.png",
    biography:
      "Credentials pending. Arrived at the outlet in 2022 with a binder that has since been independently verified by two of our other subjects. Declines to discuss prior employment. Sees things in shopping-mall atria that the rest of us do not.",
    expertise: "NPC identification · retail-environment protocol",
    statusTag: "ACTIVE",
  },
  {
    id: "subject-23",
    blurredPhoto: "/shared/testimonials/tony-mazetti.png",
    biography:
      "Missing from regular correspondence since late last quarter. Last known communication referenced 'the third sighting, the confirming one.' We have decided to continue listing the subject until something changes. Dossier retained in its current state.",
    expertise: "Reptilian surveillance · celebrity-dental archiving",
    statusTag: "UNREACHABLE",
  },
]

// Codename pools — adjectives AND surnames both randomize (per site convention).
export const CODENAME_ADJECTIVES = [
  "The Watcher",
  "The Listener",
  "Prophet",
  "Operator",
  "Analyst",
  "The Cartographer",
  "Sentinel",
  "The Archivist",
  "Signal",
  "The Reader",
]

export const CODENAME_SURNAMES = [
  "V",
  "Zero",
  "Kestrel",
  "Tessera",
  "Null",
  "Umbra",
  "Haruspex",
  "Lacuna",
  "Obsidian",
  "Cipher",
]

export function pickCodename(seed: number): string {
  // Deterministic pick so SSR and hydration match.
  const adj = CODENAME_ADJECTIVES[seed % CODENAME_ADJECTIVES.length]
  const sur = CODENAME_SURNAMES[(seed * 31 + 7) % CODENAME_SURNAMES.length]
  return `${adj} ${sur}`
}

export function getDossierById(id: string): LeaderDossier | undefined {
  return dossiers.find((d) => d.id === id)
}
