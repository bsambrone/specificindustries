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
    specialty: "Especially fragrant 5 GHz, sub-80 ms latency",
    harvestWindow: "Dawn only",
    description:
      "Our northernmost field, known for the longest signal-light hours and the coolest harvest temperatures. The packets gathered here carry a crisp, almost alpine clarity. Average throughput 72 Mbps at sunrise. The router in the north pasture is named 'Cornelius' and has been running since 2011.",
  },
  {
    name: "South Meadow",
    direction: "South",
    specialty: "Sun-ripened 2.4 GHz, full-bodied downstream",
    harvestWindow: "Midday",
    description:
      "A sloped meadow facing full southern sun. Packets ripen early and develop the deepest sun-character. Best harvested before the afternoon heat sets in. Produces 28–45 Mbps during peak daylight with a ping that gets a little loose as the day wears on. The router here is solar-assisted and runs without a UPS.",
  },
  {
    name: "East Orchard",
    direction: "East",
    specialty: "First-light 3.6 GHz frequencies, low jitter",
    harvestWindow: "Sunrise",
    description:
      "Rows of stately antenna-trees receive the first light of every day. Members describe east-orchard packets as 'quietly energizing.' Jitter measurements are the lowest on the co-op's land — under 3 ms at sunrise — which Porter attributes to the orchard's morning stillness and refuses to credit to any equipment upgrade.",
  },
  {
    name: "West Grove",
    direction: "West",
    specialty: "Dusk-cured bandwidth, longer average session",
    harvestWindow: "Sunset",
    description:
      "A shaded grove where packets cure slowly through the afternoon and are harvested at dusk. The west-grove harvest carries a muted, contemplative quality. Throughput is modest (18–32 Mbps) but member session durations average 47% longer here than on any other pasture, which the committee cites without interpretation.",
  },
  {
    name: "The Upland",
    direction: "Upland",
    specialty: "Estate-grade 6 GHz, hand-churned packets, unlimited throughput",
    harvestWindow: "Committee-determined",
    description:
      "Our highest pasture, reached only by foot. Signal here is scarce, slow-growing, and allocated exclusively to Estate Share members. Router specifications are classified by the committee. Bandwidth measurements have been taken but are not shared outside the barn. Do not ask to visit.",
  },
  {
    name: "Central Barn",
    direction: "Central",
    specialty: "Final blending, cold storage, DNS resolution",
    harvestWindow: "N/A",
    description:
      "Not a pasture but the heart of the co-op: the barn where all harvested signal is hand-blended, cold-stored, and allocated to members. The co-op's authoritative DNS server lives here, in an insulated closet behind the ledger stand. It is named 'Marigold' and has been rebooted exactly twice since 2017.",
  },
]
