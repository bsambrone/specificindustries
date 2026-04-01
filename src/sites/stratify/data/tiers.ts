export interface Tier {
  layer: number
  name: string
  monthlyRCP: string
  elevationFee: string
  tagline: string
  description: string
  unlocks: string[]
}

export const tiers: Tier[] = [
  {
    layer: 0,
    name: "Observer",
    monthlyRCP: "Free",
    elevationFee: "Free",
    tagline: "$0/mo",
    description: "Access to educational materials and the privilege of watching others succeed.",
    unlocks: [
      "View-only access to the Stratified Growth Architecture™",
      "Receive weekly Leadership Alignment Webinar invitations (audio only)",
      "Eligibility to be mentioned in someone else's success story",
    ],
  },
  {
    layer: 1,
    name: "Participant",
    monthlyRCP: "$49/mo",
    elevationFee: "$199",
    tagline: "$49/mo",
    description: "Begin distributing value. Access to 2 Subordinate Revenue Layer slots.",
    unlocks: [
      "2 Subordinate Revenue Layer slots",
      "Entry-Level Monetization Bundle",
      "Access to the Value Distribution Catalog",
      "Personalized Layer ID badge (digital)",
      "Theoretical yield range: $200–$2,000/mo*",
    ],
  },
  {
    layer: 2,
    name: "Amplifier",
    monthlyRCP: "$99/mo",
    elevationFee: "$499",
    tagline: "$99/mo",
    description: "Expanded layer capacity. Up to 8 Subordinate Revenue Layers. Yield amplification begins.",
    unlocks: [
      "Up to 8 Subordinate Revenue Layers",
      "Yield Amplification Multiplier (1.5×)",
      "Access to Regional Yield Intensives",
      "Custom Stratification Dashboard (read-only)",
      "Theoretical yield range: $2,000–$12,000/mo*",
    ],
  },
  {
    layer: 3,
    name: "Orchestrator",
    monthlyRCP: "$249/mo",
    elevationFee: "$1,499",
    tagline: "$249/mo",
    description: "Multi-layer management dashboard. 'Unlimited' subordinate layers. Invitation to Leadership Alignment Webinars.",
    unlocks: [
      "'Unlimited' Subordinate Revenue Layers",
      "Yield Amplification Multiplier (3×)",
      "Leadership Alignment Webinar access (camera on)",
      "Custom Stratification Dashboard (full access)",
      "Annual Layer Expansion Summit VIP Pass",
      "Personalized Elevation Coaching (monthly)",
      "Theoretical yield range: $12,000–$85,000/mo*",
    ],
  },
  {
    layer: 4,
    name: "Apex Executive Node",
    monthlyRCP: "$499/mo",
    elevationFee: "By invitation only",
    tagline: "$499/mo",
    description: "No longer interacts with products. Pure yield. Corner office in the architecture.",
    unlocks: [
      "Pure yield — no product interaction required",
      "Priority Yield Processing",
      "Apex Executive Node Retreat invitation",
      "Direct line to Founder & Chief Elevation Architect",
      "Your name on the Architecture Wall",
      "Theoretical yield range: $85,000–$∞/mo*",
    ],
  },
]

export function getTierByLayer(layer: number): Tier | undefined {
  return tiers.find((t) => t.layer === layer)
}
