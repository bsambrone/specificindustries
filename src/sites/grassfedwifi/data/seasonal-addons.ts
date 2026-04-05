export interface SeasonalAddon {
  slug: string
  name: string
  availability: string
  months: number[]
  price: number
  priceLabel: string
  tagline: string
  description: string
  image: string
}

export const seasonalAddons: SeasonalAddon[] = [
  {
    slug: "spring-pollen",
    name: "Spring Pollen Pack",
    availability: "Mar–May",
    months: [3, 4, 5],
    price: 19,
    priceLabel: "$19/quarter",
    tagline: "Delicate early-season 3.6 GHz packets, perfect for video calls under 480p.",
    description:
      "Collected at dawn from the co-op's eastern meadows during the first pollen drift. The frequencies carry a faint floral signature that lingers through most video calls. Adds approximately 6 Mbps to the baseline pour and reduces DNS lookup time by an amount that Fennel measures but does not publish.",
    image: "/sites/grassfedwifi/seasonal-spring.png",
  },
  {
    slug: "summer-solstice",
    name: "Summer Solstice Bundle",
    availability: "Jun–Aug",
    months: [6, 7, 8],
    price: 19,
    priceLabel: "$19/quarter",
    tagline: "Peak bandwidth at maximum daylight. Sun-ripened 5 GHz packets.",
    description:
      "Harvested at peak daylight, these sun-ripened packets carry the warmth of the longest days. Full-bodied. Robust. Occasionally sunburned. Adds up to 18 Mbps during daylight hours, with a noticeable improvement in upstream throughput that the committee attributes to photosynthesis and the committee does not elaborate.",
    image: "/sites/grassfedwifi/seasonal-summer.png",
  },
  {
    slug: "harvest-moon",
    name: "Harvest Moon Premium",
    availability: "Sep–Nov",
    months: [9, 10, 11],
    price: 29,
    priceLabel: "$29/quarter",
    tagline: "The richest signal of the year. 6 GHz packets gathered at peak density.",
    description:
      "The co-op's most celebrated seasonal offering. Gathered during the autumn density peak, these packets have a depth and richness that members describe as 'almost overwhelming.' Adds up to 35 Mbps and reduces ping by 40 ms on clear nights. Members who receive this add-on are asked not to stream during the October new-moon harvest.",
    image: "/sites/grassfedwifi/seasonal-harvest.png",
  },
  {
    slug: "winter-reserve",
    name: "Winter Reserve",
    availability: "Dec–Feb",
    months: [12, 1, 2],
    price: 19,
    priceLabel: "$19/quarter",
    tagline: "Slow-signal, cold-pressed 2.4 GHz bandwidth for quiet months.",
    description:
      "A meditative offering. Cold-pressed during the quiet months, this 2.4 GHz signal moves slowly and encourages the same of its recipients. Adds 4 Mbps to the baseline pour but increases signal-character by an amount the co-op has chosen not to quantify in decibels. Ping times are unhurried. This is intentional.",
    image: "/sites/grassfedwifi/seasonal-winter.png",
  },
]

export function getSeasonalAddonBySlug(slug: string): SeasonalAddon | undefined {
  return seasonalAddons.find((a) => a.slug === slug)
}

export function getCurrentAddon(): SeasonalAddon | undefined {
  const month = new Date().getMonth() + 1 // 1-12
  return seasonalAddons.find((a) => a.months.includes(month))
}
