export interface FitmentStep {
  number: number
  title: string
  description: string
  image: string
}

export interface FitmentDoDont {
  type: "do" | "dont"
  title: string
  description: string
}

export interface AccessoryLoadout {
  scenario: string
  accessorySlugs: string[]
  rationale: string
}

export interface TestTootProcedure {
  title: string
  steps: string[]
  warning: string
}

export const fitmentSteps: FitmentStep[] = [
  {
    number: 1,
    title: "Position",
    description: "The G1 sits flush against the point of departure. Not offset, not rotated — flush. The port (the bright orange one) faces down and slightly back. If you're unsure which side faces out, it's the side with the Seel-Tite stamp.",
    image: "/sites/seeltite/fitment-step-1.png",
  },
  {
    number: 2,
    title: "Press",
    description: "Light pressure around the full circumference for three full seconds. You're activating the platinum-cured silicone's memory profile — no need to mash. If you press so hard that you see stars, back off.",
    image: "/sites/seeltite/fitment-step-2.png",
  },
  {
    number: 3,
    title: "Seal Check",
    description: "If you're running the Telemetry Module, glance at the app — the seal-integrity reading should settle at 14.7 PSI within a couple of seconds. If you're not on Telemetry, do the low-tech version: a gentle clench. If the clench feels \"grounded,\" the seal is there.",
    image: "/sites/seeltite/fitment-step-3.png",
  },
  {
    number: 4,
    title: "Test Toot",
    description: "Send a small warm-up toot before anything consequential. Nothing committed, nothing heroic — just a low-stakes proof of life. If the test toot passes quietly, you're cleared for confidence tooting.",
    image: "/sites/seeltite/fitment-step-4.png",
  },
]

export const testTootProcedure: TestTootProcedure = {
  title: "The Test Toot Procedure",
  steps: [
    "Assume a neutral standing or seated posture. Do not bear down.",
    "Release approximately 30% of a full-volume toot. If you're not sure what 30% feels like, imagine a polite hello.",
    "Observe the seal. A correctly fitted G1 produces no audible leak, no tactile shift, and no pressure escape. If the Telemetry Module is paired, the app's PSI graph stays flat within ±0.3.",
    "If all three signals are clean, the seal is verified. You may proceed with confidence tooting for the session.",
    "If anything feels off, re-seat the G1 from Step 1. Do not \"push through.\"",
  ],
  warning: "The test toot is not the main event. Do not test with a high-consequence toot. Commit low, validate the seal, then send the real thing.",
}

export const fitmentDosDonts: FitmentDoDont[] = [
  { type: "do",   title: "Do wear it flush",           description: "Full circumferential contact. No gaps. No rotation. This is the single most important fit cue." },
  { type: "do",   title: "Do run the test toot",       description: "Every session. Even if you've worn the G1 for a decade. The test toot is the handshake." },
  { type: "do",   title: "Do clean after every day",   description: "Warm water, mild soap, air dry. No solvents. The silicone is forever if you treat it right." },
  { type: "dont", title: "Don't over-tighten",         description: "Mashing the G1 does not improve the seal. The silicone's memory profile does the work. If you're sweating, you're over-tightening." },
  { type: "dont", title: "Don't wear it inverted",     description: "Port faces down-and-back. If the orange port is pointing at your belt buckle, rotate 180°." },
  { type: "dont", title: "Don't skip the test toot",   description: "This is the single most common mistake. Confidence tooting without a test toot is gambling without checking the odds." },
]

export const accessoryLoadouts: AccessoryLoadout[] = [
  {
    scenario: "Formal Wear",
    accessorySlugs: ["the-silencer", "odor-cartridge-pack", "cryo-puck-module"],
    rationale: "Wedding, black-tie, gala. Prioritize silent operation and scent management. The Cryo-Puck is the single best recovery option in formal clothing because it leaves no residue on the tailoring.",
  },
  {
    scenario: "Athletic",
    accessorySlugs: ["the-grinder", "telemetry-module", "secondary-gasket-redundancy"],
    rationale: "Team sports, long runs, CrossFit. Movement is the variable. The Backup Secondary Gasket is non-negotiable — athletic postures shift the primary seal. Telemetry gives you predictive alerts at higher activity levels.",
  },
  {
    scenario: "Travel",
    accessorySlugs: ["incinerator-module", "odor-cartridge-pack", "telemetry-module"],
    rationale: "Long-haul flights, road trips, conferences. No floor drain. No private bathroom. Incinerator resolves everything on-body, no waste, no odor. Telemetry for the ten-hour seat-locked stretch.",
  },
  {
    scenario: "Boardroom",
    accessorySlugs: ["the-silencer", "the-grinder", "telemetry-module"],
    rationale: "Long meetings, closed doors, executive presence required. Silencer + Grinder is the quietest operational pairing in the catalog. Telemetry surfaces predictive alerts through a haptic watch so you don't have to glance at a phone.",
  },
]
