export interface HarvestMonth {
  month: number         // 1-12
  name: string
  inSeason: string
  pairsWellWith: string
  harvestNotes: string
  featuredAddonSlug?: string
}

export const harvestCalendar: HarvestMonth[] = [
  {
    month: 1,
    name: "January",
    inSeason: "2.4 GHz, cold-pressed, averaging 14 Mbps with a faint mineral note",
    pairsWellWith: "bone broth, knit sweaters, browser-tab meditation, 240p video calls",
    harvestNotes:
      "The quietest month. We gather in low light, moving slowly, letting the signal come to us. Members report a deeper sense of presence on video calls.",
    featuredAddonSlug: "winter-reserve",
  },
  {
    month: 2,
    name: "February",
    inSeason: "2.4 GHz with early-thaw undertones, 18 Mbps at midday",
    pairsWellWith: "sourdough fermentation, sock-darning, short emails, rsync jobs under 2 GB",
    harvestNotes:
      "The ground is still firm, but the packets are beginning to stir. A good month for heavy downloads that you intend to actually finish.",
    featuredAddonSlug: "winter-reserve",
  },
  {
    month: 3,
    name: "March",
    inSeason: "3.6 GHz, first-flush, pollen-adjacent, 24 Mbps / 220 ms ping",
    pairsWellWith: "seedling trays, bee-related anxiety, honest 480p video calls",
    harvestNotes:
      "The first warm frequencies of the year. Thin but promising. We do not rush the March harvest — hurry produces bitterness in the signal.",
    featuredAddonSlug: "spring-pollen",
  },
  {
    month: 4,
    name: "April",
    inSeason: "4.2 GHz coming in strong, pollen-dusted packets, 32 Mbps on a clear day",
    pairsWellWith: "sourdough starters, balcony gardening, lukewarm video calls at 720p",
    harvestNotes:
      "A gentle month. We hand-gather packets at dawn, before the bees wake. Expect occasional gaps during afternoon thunderstorms — these are features, not bugs.",
    featuredAddonSlug: "spring-pollen",
  },
  {
    month: 5,
    name: "May",
    inSeason: "4.8 GHz, full-pollen, green-hay finish, 48 Mbps peak throughput",
    pairsWellWith: "fermentation projects, new notebooks, slow podcasts, overnight OS updates",
    harvestNotes:
      "The co-op's busiest month. Every hand is in the pasture. Connection speeds are high but allocation hours are strict.",
    featuredAddonSlug: "spring-pollen",
  },
  {
    month: 6,
    name: "June",
    inSeason: "5.0 GHz, sun-ripened, early-solstice, 62 Mbps and climbing",
    pairsWellWith: "outdoor work, cold soup, long async messages, 1080p video calls",
    harvestNotes:
      "The sun does most of the work. We supervise. Members should expect a noticeable warmth in their downloads.",
    featuredAddonSlug: "summer-solstice",
  },
  {
    month: 7,
    name: "July",
    inSeason: "5.4 GHz, peak solstice, full-body packets, 84 Mbps / sub-80 ms ping",
    pairsWellWith: "stone fruit, river swims, long-form writing, multi-tab research sessions",
    harvestNotes:
      "The richest-feeling signal of the summer. Members are advised to hydrate during heavy downloads.",
    featuredAddonSlug: "summer-solstice",
  },
  {
    month: 8,
    name: "August",
    inSeason: "5.2 GHz, late-solstice, drying, 72 Mbps with increasing jitter",
    pairsWellWith: "peach preserves, longer walks, unread newsletters, staged npm installs",
    harvestNotes:
      "The packets begin to cure. Slightly drier than July but with more character. A member favorite.",
    featuredAddonSlug: "summer-solstice",
  },
  {
    month: 9,
    name: "September",
    inSeason: "5.6 GHz, first-harvest density, 96 Mbps at the peak of the pour",
    pairsWellWith: "new-school-year anxiety, apple butter, blurry 4K video calls, weekly backup jobs",
    harvestNotes:
      "The density arrives. Members should brace themselves for the first true taste of the autumn reserve.",
    featuredAddonSlug: "harvest-moon",
  },
  {
    month: 10,
    name: "October",
    inSeason: "6.0 GHz, peak density, harvest moon, 118 Mbps / 54 ms ping",
    pairsWellWith: "candles, root vegetables, deep-work sessions, unattended cron jobs",
    harvestNotes:
      "Our most celebrated month. The signal is at its richest. Estate Share members are welcomed to the harvest supper.",
    featuredAddonSlug: "harvest-moon",
  },
  {
    month: 11,
    name: "November",
    inSeason: "5.8 GHz, late-harvest, cooling, 88 Mbps with longer tail latencies",
    pairsWellWith: "gratitude journals, stew, slower morning calls, archive retrieval jobs",
    harvestNotes:
      "The packets begin to settle. Connection speeds decline slightly but complexity increases.",
    featuredAddonSlug: "harvest-moon",
  },
  {
    month: 12,
    name: "December",
    inSeason: "2.4 GHz, quiet, with faint solstice undertones, 11 Mbps (intentionally)",
    pairsWellWith: "candlelight, handwritten letters, brief video calls, email clients only",
    harvestNotes:
      "The co-op slows. We hand-package the year's reserve and rest. The signal is thin but deeply intentional.",
    featuredAddonSlug: "winter-reserve",
  },
]

export function getCurrentMonth(): HarvestMonth {
  const month = new Date().getMonth() + 1 // 1-12
  const found = harvestCalendar.find((m) => m.month === month)
  // Should always find one — fallback for type safety
  return found ?? harvestCalendar[0]
}
