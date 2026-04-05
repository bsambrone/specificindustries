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
    tagline: "Classic free-roaming signal, hand-routed over 2.4 GHz. Our original recipe, unchanged since the co-op's founding.",
    description: [
      "The Heirloom Share is where every member begins. It is the recipe Hollis wrote down on the back of a feed bag in the co-op's first winter, and we have not changed a single ingredient since — not the DNS, not the SSID convention, not the MAC-address logbook in the barn.",
      "This is unpasteurized signal in its most honest form. A generous, unpasteurized pour of 2.4 GHz, suited to a single household that values authenticity over throughput and is willing to work around the rhythms of the harvest. Members report 12–28 Mbps in good weather, less during afternoon thunderstorms, more during a full moon.",
    ],
    image: "/sites/grassfedwifi/share-heirloom.png",
    includes: [
      "Unlimited free-range browsing on 2.4 GHz",
      "Stone-ground DNS resolution (coarse grind, full character, average query time 340 ms)",
      "Hand-tuned SSID per household (co-op chooses the name, written in the ledger)",
      "Uptime guarantee of 73% during daylight hours",
      "Monthly farmer newsletter, delivered via unencrypted packet",
      "Access to members-only harvest alerts (broadcast at dawn)",
    ],
    bandwidth: "12–28 Mbps, weather-dependent, 340 ms average ping",
    allocation: "Single household, one router, two antennas",
    seasonalAddonsIncluded: 0,
    disclaimers: [
      "Signal quality varies with weather, lunar cycles, and the moods of the pasture.",
      "Seasonal add-ons available for separate purchase.",
      "DNS queries routed through the co-op barn. Expected latency is not a bug.",
    ],
  },
  {
    slug: "reserve",
    name: "Reserve Share",
    price: 79,
    priceLabel: "$79/month",
    tagline: "Small-batch 5 GHz signal aged in oak-lined server rooms. Hand-selected frequencies, barrel-routed packets.",
    description: [
      "The Reserve Share is for members who have moved past the entry tier and want something with more structure. We age these packets in oak-lined server rooms, hand-selecting the frequencies that carry the deepest notes — typically the upper 5 GHz bands, with occasional bleed into 6 GHz during the autumn rotation.",
      "Includes priority signal access during allocation hours (05:30–07:00 daily) and a quarterly invitation to tour the frequency pastures in person. Family-sized — connect up to six devices to a single hand-wound router without diluting the pour. Members report 40–85 Mbps depending on the pasture, with ping times that improve as the oak opens up.",
    ],
    image: "/sites/grassfedwifi/share-reserve.png",
    includes: [
      "Everything in Heirloom",
      "Small-batch, barrel-aged packets on 5 GHz (12-day oak minimum)",
      "Priority signal access during allocation hours (05:30–07:00)",
      "One rotating seasonal add-on (member's choice)",
      "Uptime guarantee of 86% across all phases of the moon",
      "Quarterly farm tour invitation (no devices permitted past the gate)",
      "Dedicated MAC address range, hand-assigned by Fennel",
    ],
    bandwidth: "40–85 Mbps, 5 GHz primary, 180 ms average ping",
    allocation: "Family share — up to 6 devices on one router",
    seasonalAddonsIncluded: 1,
    disclaimers: [
      "Oak-aging imparts tannins to the signal. This is a feature.",
      "Farm tours occur at dawn and do not involve WiFi.",
      "Ping times improve with the oak. Do not submit tickets in the first 72 hours.",
    ],
  },
  {
    slug: "estate",
    name: "Estate Share",
    price: 149,
    priceLabel: "$149/month",
    tagline: "Hand-churned packets from our highest pastures. Unlimited throughput, limited membership, allocated by committee.",
    description: [
      "The Estate Share is the co-op's highest allocation, hand-churned from the packets harvested on our upland frequency pastures. These are the rarest signals the co-op produces — 6 GHz with occasional harmonics in the 7 GHz unlicensed experimental band, which the co-op occupies under terms we have chosen not to publicize. Membership is limited, allocated annually by committee, and cannot be rushed.",
      "Members receive every seasonal add-on, a dedicated farmer-steward contact, and an engraving of their name on the co-op barn's south wall. An annual harvest-supper invitation is extended to all Estate members and their households. Uptime exceeds 94% and ping averages under 60 ms during allocation hours — numbers we do not guarantee to anyone, but which our logs have consistently shown since 2019.",
    ],
    image: "/sites/grassfedwifi/share-estate.png",
    includes: [
      "Everything in Reserve",
      "Unlimited hand-churned throughput, 6 GHz primary with upland harmonics",
      "All four seasonal add-ons, included",
      "Dedicated farmer-steward contact (not by ticket system)",
      "Static IPv4 address, hand-assigned from the co-op block",
      "Uptime guarantee of 94% across all seasons, all weather",
      "Name hand-carved into the co-op barn's south wall",
      "Annual harvest-supper invitation (household of four, no electronics past the gate)",
    ],
    bandwidth: "Unlimited, 6 GHz hand-churned, sub-60 ms ping during allocation hours",
    allocation: "Community share — household + small business, unlimited devices, one router per site",
    seasonalAddonsIncluded: "all",
    disclaimers: [
      "Committee allocation decisions are final. Written appeals may be submitted by carrier pigeon.",
      "Barn engravings are permanent but may weather.",
      "Static IPv4 is drawn from an allocation we have held since 1998. We will not explain how.",
    ],
  },
]

export function getShareBySlug(slug: string): Share | undefined {
  return shares.find((s) => s.slug === slug)
}

export const shareQuips = [
  "Your share is growing.",
  "Committee notified. DNS updated.",
  "A packet is being hand-selected.",
  "The farmer nods approvingly.",
  "Another mason jar filled. Ledger updated.",
  "Your MAC address has been written down.",
  "Routing tables re-drawn by hand.",
]
