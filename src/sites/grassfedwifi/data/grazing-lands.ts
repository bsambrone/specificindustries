export interface FarmSite {
  name: string
  direction: "North" | "South" | "East" | "West" | "Central" | "Upland"
  specialty: string
  harvestWindow: string
  description: string
}

export const farmSites: FarmSite[] = [
  {
    name: "North Pasture",
    direction: "North",
    specialty: "Especially fragrant 5 GHz",
    harvestWindow: "Dawn only",
    description:
      "Our northernmost field, known for the longest signal-light hours and the coolest harvest temperatures. The packets gathered here carry a crisp, almost alpine clarity.",
  },
  {
    name: "South Meadow",
    direction: "South",
    specialty: "Sun-ripened 2.4 GHz",
    harvestWindow: "Midday",
    description:
      "A sloped meadow facing full southern sun. Packets ripen early and develop the deepest sun-character. Best harvested before the afternoon heat sets in.",
  },
  {
    name: "East Orchard",
    direction: "East",
    specialty: "First-light frequencies",
    harvestWindow: "Sunrise",
    description:
      "Rows of stately antenna-trees receive the first light of every day. Members describe east-orchard packets as 'quietly energizing.'",
  },
  {
    name: "West Grove",
    direction: "West",
    specialty: "Dusk-cured bandwidth",
    harvestWindow: "Sunset",
    description:
      "A shaded grove where packets cure slowly through the afternoon and are harvested at dusk. The west-grove harvest carries a muted, contemplative quality.",
  },
  {
    name: "The Upland",
    direction: "Upland",
    specialty: "Estate-grade hand-churned packets",
    harvestWindow: "Committee-determined",
    description:
      "Our highest pasture, reached only by foot. Signal here is scarce, slow-growing, and allocated exclusively to Estate Share members. Do not ask to visit.",
  },
  {
    name: "Central Barn",
    direction: "Central",
    specialty: "Final blending and cold storage",
    harvestWindow: "N/A",
    description:
      "Not a pasture but the heart of the co-op: the barn where all harvested signal is hand-blended, cold-stored, and allocated to members.",
  },
]
