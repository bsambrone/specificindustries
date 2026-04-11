export interface FanPost {
  image: string
  caption: string
  locked: boolean
}

export interface TipMenuItem {
  amount: number
  description: string
}

export interface Fan {
  slug: string
  name: string
  handle: string
  fanType: string
  location: string
  monthlyPrice: number
  subscriberCount: number
  niche: string
  audienceTag: string
  bio: string
  coverImage: string
  avatarImage: string
  posts: FanPost[]
  tipMenu: TipMenuItem[]
  warningLabel?: string
}

export const fans: Fan[] = [
  {
    slug: "brenda",
    name: "Brenda",
    handle: "@brendablows",
    fanType: "Box Fan, est. 1957",
    location: "Tulsa, OK",
    monthlyPrice: 3.99,
    subscriberCount: 12847,
    niche: "Working-class nostalgia",
    audienceTag: "Wholesome",
    bio: "Hi y'all. I'm Brenda. I've been blowing air out of a window in Tulsa since 1957 and I'm grateful for every single one of you. I do three speeds — low, medium, and high — and I oscillate when the mood strikes me.",
    coverImage: "/sites/onlyfans/fan-brenda-cover.png",
    avatarImage: "/sites/onlyfans/fan-brenda-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-brenda-post-01.png", caption: "midwestern morning, low setting", locked: false },
      { image: "/sites/onlyfans/fan-brenda-post-02.png", caption: "afternoon kitchen, medium speed", locked: false },
      { image: "/sites/onlyfans/fan-brenda-post-03.png", caption: "golden hour, full power", locked: true },
      { image: "/sites/onlyfans/fan-brenda-post-04.png", caption: "looking down at the chrome", locked: true },
      { image: "/sites/onlyfans/fan-brenda-post-05.png", caption: "side profile against white wall", locked: true },
      { image: "/sites/onlyfans/fan-brenda-post-06.png", caption: "evening shift, indoor light", locked: true },
    ],
    tipMenu: [
      { amount: 5, description: "Personalized angle adjustment video" },
      { amount: 20, description: "Custom oscillation pattern, your choice" },
      { amount: 50, description: "Behind-the-grille tour (pre-recorded)" },
    ],
  },
  {
    slug: "vance",
    name: "Big Vance",
    handle: "@vance_unleashed",
    fanType: "Industrial Wind Tunnel — 80,000 CFM",
    location: "Carson City, NV",
    monthlyPrice: 14.99,
    subscriberCount: 4209,
    niche: "Extreme thrill-seekers",
    audienceTag: "Extreme",
    bio: "I AM NOT FOR EVERYONE. I move 80,000 CFM. I have removed shingles. I have been declared a public nuisance in two counties. If you can handle me, I am here for you.",
    coverImage: "/sites/onlyfans/fan-vance-cover.png",
    avatarImage: "/sites/onlyfans/fan-vance-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-vance-post-01.png", caption: "warehouse floor, blades at max", locked: false },
      { image: "/sites/onlyfans/fan-vance-post-02.png", caption: "low angle, cage profile", locked: false },
      { image: "/sites/onlyfans/fan-vance-post-03.png", caption: "loading dock, golden hour", locked: true },
      { image: "/sites/onlyfans/fan-vance-post-04.png", caption: "side profile, full frame", locked: true },
      { image: "/sites/onlyfans/fan-vance-post-05.png", caption: "warning labels close-up", locked: true },
      { image: "/sites/onlyfans/fan-vance-post-06.png", caption: "outdoor, dusk, gravel lot", locked: true },
    ],
    tipMenu: [
      { amount: 10, description: "Blow your hat across the parking lot" },
      { amount: 50, description: "Custom debris-displacement demonstration" },
      { amount: 200, description: "Voicemail of pure airflow (no words)" },
    ],
    warningLabel: "EXTREME — not recommended for indoor viewing",
  },
  {
    slug: "oscillata",
    name: "Mistress Oscillata",
    handle: "@oscillata",
    fanType: "Tower Fan — Limited Engagement",
    location: "Manhattan, NY",
    monthlyPrice: 24.99,
    subscriberCount: 487,
    niche: "Luxury minimalists",
    audienceTag: "Luxury",
    bio: "I do not perform on demand. My oscillation is curated. I release one cycle per quarter. If you appreciate restraint, you may join my select audience.",
    coverImage: "/sites/onlyfans/fan-oscillata-cover.png",
    avatarImage: "/sites/onlyfans/fan-oscillata-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-oscillata-post-01.png", caption: "the side profile (free)", locked: false },
      { image: "/sites/onlyfans/fan-oscillata-post-02.png", caption: "twilight loft (free)", locked: false },
      { image: "/sites/onlyfans/fan-oscillata-post-03.png", caption: "the orchid composition", locked: true },
      { image: "/sites/onlyfans/fan-oscillata-post-04.png", caption: "brushed steel base, close", locked: true },
      { image: "/sites/onlyfans/fan-oscillata-post-05.png", caption: "velvet backdrop study", locked: true },
      { image: "/sites/onlyfans/fan-oscillata-post-06.png", caption: "sunrise loft, single edge", locked: true },
    ],
    tipMenu: [
      { amount: 25, description: "Acknowledgement card (handwritten)" },
      { amount: 100, description: "One additional unscheduled oscillation" },
      { amount: 500, description: "Private quarterly viewing (by appointment only)" },
    ],
  },
  {
    slug: "reginald",
    name: "Sir Reginald Plumebottom III",
    handle: "@plumebottom",
    fanType: "Ceiling Fan — Five Blades",
    location: "Charleston, SC",
    monthlyPrice: 5.99,
    subscriberCount: 31540,
    niche: "Wholesome porch family",
    audienceTag: "Wholesome",
    bio: "Good day. I have been moving this same air since 1973 and I see no reason to stop. My subscribers come for consistency, and consistency is what they receive.",
    coverImage: "/sites/onlyfans/fan-reginald-cover.png",
    avatarImage: "/sites/onlyfans/fan-reginald-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-reginald-post-01.png", caption: "midday slow rotation", locked: false },
      { image: "/sites/onlyfans/fan-reginald-post-02.png", caption: "golden hour brass", locked: false },
      { image: "/sites/onlyfans/fan-reginald-post-03.png", caption: "downrod profile", locked: true },
      { image: "/sites/onlyfans/fan-reginald-post-04.png", caption: "evening light kit on", locked: true },
      { image: "/sites/onlyfans/fan-reginald-post-05.png", caption: "rainy charleston afternoon", locked: true },
      { image: "/sites/onlyfans/fan-reginald-post-06.png", caption: "twilight, screen porch", locked: true },
    ],
    tipMenu: [
      { amount: 5, description: "A polite tip of the brass cap" },
      { amount: 15, description: "One additional mid-summer rotation" },
      { amount: 40, description: "An evening illumination of the light kit, just for you" },
    ],
  },
  {
    slug: "aerovolt",
    name: "AeroVolt 9000™",
    handle: "@aerovolt",
    fanType: "Bladeless Tower — Patented",
    location: "Palo Alto, CA",
    monthlyPrice: 19.99,
    subscriberCount: 8901,
    niche: "Tech-bro premium",
    audienceTag: "Tech",
    bio: "AeroVolt 9000 is redefining what airflow can be. Subscribe to receive the AeroVolt Whitepaper and quarterly product roadmap updates. Disrupting the wind industry since 2019.",
    coverImage: "/sites/onlyfans/fan-aerovolt-cover.png",
    avatarImage: "/sites/onlyfans/fan-aerovolt-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-aerovolt-post-01.png", caption: "the marble counter installation", locked: false },
      { image: "/sites/onlyfans/fan-aerovolt-post-02.png", caption: "home office workflow integration", locked: false },
      { image: "/sites/onlyfans/fan-aerovolt-post-03.png", caption: "navy backdrop study", locked: true },
      { image: "/sites/onlyfans/fan-aerovolt-post-04.png", caption: "isometric unboxing", locked: true },
      { image: "/sites/onlyfans/fan-aerovolt-post-05.png", caption: "the conference room moment", locked: true },
      { image: "/sites/onlyfans/fan-aerovolt-post-06.png", caption: "white seamless studio", locked: true },
    ],
    tipMenu: [
      { amount: 10, description: "Receive the AeroVolt 12-page airflow whitepaper PDF" },
      { amount: 50, description: "30-minute Zoom with the product team (no agenda)" },
      { amount: 250, description: "Be added to the AeroVolt advisory board (honorary)" },
    ],
  },
  {
    slug: "lil-buzz",
    name: "Lil' Buzz",
    handle: "@lilbuzz_official",
    fanType: "USB Desk Fan — 12 CFM",
    location: "Austin, TX",
    monthlyPrice: 0.99,
    subscriberCount: 2847103,
    niche: "Cubicle underdog",
    audienceTag: "Underdog",
    bio: "Hi!! It's me, Lil' Buzz!! I move 12 CFM and I am SO happy you're here!! Every subscriber gets a personal thank-you and a virtual fist bump. THANK YOU for believing in me!!",
    coverImage: "/sites/onlyfans/fan-lil-buzz-cover.png",
    avatarImage: "/sites/onlyfans/fan-lil-buzz-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-lil-buzz-post-01.png", caption: "fluttering the paperwork!!", locked: false },
      { image: "/sites/onlyfans/fan-lil-buzz-post-02.png", caption: "plugged in and ready!!", locked: false },
      { image: "/sites/onlyfans/fan-lil-buzz-post-03.png", caption: "small but mighty angle", locked: true },
      { image: "/sites/onlyfans/fan-lil-buzz-post-04.png", caption: "succulent buddy day", locked: true },
      { image: "/sites/onlyfans/fan-lil-buzz-post-05.png", caption: "dorm desk study session", locked: true },
      { image: "/sites/onlyfans/fan-lil-buzz-post-06.png", caption: "blade close-up!!", locked: true },
    ],
    tipMenu: [
      { amount: 1, description: "Personalized thank-you message (Lil' Buzz will probably cry)" },
      { amount: 5, description: "A second personalized thank-you message (Lil' Buzz definitely cried)" },
      { amount: 20, description: "Virtual high-five and a name-shoutout in the next post" },
    ],
  },
  {
    slug: "ghost",
    name: "The Ghost in the Attic",
    handle: "@neverseen",
    fanType: "Whole-House Attic Fan — Presence Only",
    location: "Phoenix, AZ",
    monthlyPrice: 8.99,
    subscriberCount: 1247,
    niche: "Felt, never seen",
    audienceTag: "Mysterious",
    bio: "I am here. I have always been here. You will not see me. You will only feel a slight cooling of the upstairs hallway. This is enough.",
    coverImage: "/sites/onlyfans/fan-ghost-cover.png",
    avatarImage: "/sites/onlyfans/fan-ghost-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-ghost-post-01.png", caption: "from the hallway below", locked: false },
      { image: "/sites/onlyfans/fan-ghost-post-02.png", caption: "first light of dawn", locked: false },
      { image: "/sites/onlyfans/fan-ghost-post-03.png", caption: "in profile, between rafters", locked: true },
      { image: "/sites/onlyfans/fan-ghost-post-04.png", caption: "behind the storage", locked: true },
      { image: "/sites/onlyfans/fan-ghost-post-05.png", caption: "silhouette against the vent", locked: true },
      { image: "/sites/onlyfans/fan-ghost-post-06.png", caption: "midnight, by flashlight", locked: true },
    ],
    tipMenu: [
      { amount: 5, description: "A faint cooling on a hot afternoon" },
      { amount: 25, description: "An unexplained creak from the attic at 3 AM" },
      { amount: 100, description: "A photograph that will not develop" },
    ],
  },
  {
    slug: "whirrcore",
    name: "WhirrCore_42",
    handle: "@whirrcore_ttv",
    fanType: "PC Case Fan — 120mm RGB",
    location: "undisclosed basement",
    monthlyPrice: 6.99,
    subscriberCount: 19201,
    niche: "Gamer / streamer",
    audienceTag: "Gamer",
    bio: "sup fanbase 🎮 just out here at 2400 rpm running it back. drop a sub for full RGB rotation logs and i'll shoutout your gamertag in next week's 12-hour endurance stream. gg ez",
    coverImage: "/sites/onlyfans/fan-whirrcore-cover.png",
    avatarImage: "/sites/onlyfans/fan-whirrcore-avatar.png",
    posts: [
      { image: "/sites/onlyfans/fan-whirrcore-post-01.png", caption: "purple cycle three-quarter", locked: false },
      { image: "/sites/onlyfans/fan-whirrcore-post-02.png", caption: "cyan + max rpm motion blur", locked: false },
      { image: "/sites/onlyfans/fan-whirrcore-post-03.png", caption: "side profile w/ cable", locked: true },
      { image: "/sites/onlyfans/fan-whirrcore-post-04.png", caption: "duo build w/ my homie", locked: true },
      { image: "/sites/onlyfans/fan-whirrcore-post-05.png", caption: "white cycle top down", locked: true },
      { image: "/sites/onlyfans/fan-whirrcore-post-06.png", caption: "dark room glow check", locked: true },
    ],
    tipMenu: [
      { amount: 5, description: "Custom RGB color request for one post" },
      { amount: 25, description: "Gamertag shoutout in next stream" },
      { amount: 100, description: "Be added to the WhirrCore Discord 'verified airflow enjoyers' role" },
    ],
  },
]

export function getFanBySlug(slug: string): Fan | undefined {
  return fans.find((f) => f.slug === slug)
}

export const homepageFeaturedFans = ["brenda", "oscillata", "lil-buzz", "whirrcore"]
  .map((slug) => fans.find((f) => f.slug === slug)!)
