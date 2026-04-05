export interface Share {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  includes: string[]
  bandwidth: string
  allocation: string
  seasonalAddonsIncluded: number | "all"
  disclaimers: string[]
}

export const shares: Share[] = [
  {
    slug: "heirloom",
    name: "Heirloom Share",
    price: 39,
    priceLabel: "$39/month",
    tagline: "Classic free-roaming signal. Our original recipe, unchanged since the co-op's founding.",
    description: [
      "The Heirloom Share is where every member begins. It is the recipe Hollis wrote down on the back of a feed bag in the co-op's first winter, and we have not changed a single ingredient since.",
      "This is unpasteurized signal in its most honest form. A generous, unpasteurized pour, suited to a single household that values authenticity over throughput and is willing to work around the rhythms of the harvest.",
    ],
    image: "/sites/grassfedwifi/share-heirloom.png",
    includes: [
      "Unlimited free-range browsing",
      "Stone-ground DNS (coarse grind, full character)",
      "Monthly farmer newsletter",
      "Access to the members-only harvest alerts",
    ],
    bandwidth: "A generous, unpasteurized pour",
    allocation: "Single household",
    seasonalAddonsIncluded: 0,
    disclaimers: [
      "Signal quality varies with weather, lunar cycles, and the moods of the pasture.",
      "Seasonal add-ons available for separate purchase.",
    ],
  },
  {
    slug: "reserve",
    name: "Reserve Share",
    price: 79,
    priceLabel: "$79/month",
    tagline: "Small-batch signal aged in oak-lined server rooms. Hand-selected frequencies.",
    description: [
      "The Reserve Share is for members who have moved past the entry tier and want something with more structure. We age these packets in oak-lined server rooms, hand-selecting the frequencies that carry the deepest notes.",
      "Includes priority signal access during allocation hours and a quarterly invitation to tour the frequency pastures in person. Family-sized — connect up to six devices without diluting the pour.",
    ],
    image: "/sites/grassfedwifi/share-reserve.png",
    includes: [
      "Everything in Heirloom",
      "Small-batch, barrel-aged packets",
      "Priority signal access during allocation hours",
      "One rotating seasonal add-on (member's choice)",
      "Quarterly farm tour invitation",
    ],
    bandwidth: "Small-batch, barrel-aged packets",
    allocation: "Family share (up to 6 devices)",
    seasonalAddonsIncluded: 1,
    disclaimers: [
      "Oak-aging imparts tannins to the signal. This is a feature.",
      "Farm tours occur at dawn and do not involve WiFi.",
    ],
  },
  {
    slug: "estate",
    name: "Estate Share",
    price: 149,
    priceLabel: "$149/month",
    tagline: "Hand-churned packets from our highest pastures. Limited availability. Allocated by committee.",
    description: [
      "The Estate Share is the co-op's highest allocation, hand-churned from the packets harvested on our upland frequency pastures. Membership is limited, allocated annually by committee, and cannot be rushed.",
      "Members receive every seasonal add-on, a dedicated farmer-steward contact, and an engraving of their name on the co-op barn's south wall. An annual harvest-supper invitation is extended to all Estate members and their households.",
    ],
    image: "/sites/grassfedwifi/share-estate.png",
    includes: [
      "Everything in Reserve",
      "Unlimited hand-churned throughput",
      "All four seasonal add-ons, included",
      "Dedicated farmer-steward contact",
      "Name hand-carved into the co-op barn's south wall",
      "Annual harvest-supper invitation (household of four)",
    ],
    bandwidth: "Unlimited hand-churned throughput",
    allocation: "Community share (household + small business, unlimited devices)",
    seasonalAddonsIncluded: "all",
    disclaimers: [
      "Committee allocation decisions are final. Written appeals may be submitted by carrier pigeon.",
      "Barn engravings are permanent but may weather.",
    ],
  },
]

export function getShareBySlug(slug: string): Share | undefined {
  return shares.find((s) => s.slug === slug)
}

export const shareQuips = [
  "Your share is growing.",
  "Committee notified.",
  "A packet is being hand-selected.",
  "The farmer nods approvingly.",
  "Another mason jar filled.",
]
