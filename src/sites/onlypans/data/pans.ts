export interface PanPost {
  image: string
  caption: string
  locked: boolean
}

export interface TipMenuItem {
  amount: number
  description: string
}

export interface Pan {
  slug: string
  name: string
  handle: string
  panType: string
  location: string
  monthlyPrice: number
  subscriberCount: number
  niche: string
  audienceTag: string
  bio: string
  coverImage: string
  avatarImage: string
  posts: PanPost[]
  tipMenu: TipMenuItem[]
  warningLabel?: string
}

export const pans: Pan[] = [
  {
    slug: "greta",
    name: "Greta",
    handle: "@greta.iron",
    panType: "Cast Iron Skillet · est. 1952",
    location: "South Pittsburg, TN",
    monthlyPrice: 4.99,
    subscriberCount: 48201,
    niche: "Generational classic",
    audienceTag: "Classic",
    bio: "Hi. I'm Greta. I have been in the same family since 1952. I remember every egg. I remember every steak. I will not speak of them.",
    coverImage: "/sites/onlypans/pan-greta-cover.png",
    avatarImage: "/sites/onlypans/pan-greta-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-greta-post-01.png", caption: "morning light, freshly seasoned", locked: false },
      { image: "/sites/onlypans/pan-greta-post-02.png", caption: "just after a scrub", locked: false },
      { image: "/sites/onlypans/pan-greta-post-03.png", caption: "on a cold stovetop", locked: true },
      { image: "/sites/onlypans/pan-greta-post-04.png", caption: "held up to the window", locked: true },
      { image: "/sites/onlypans/pan-greta-post-05.png", caption: "upside down, the underside", locked: true },
      { image: "/sites/onlypans/pan-greta-post-06.png", caption: "the handle, in detail", locked: true },
    ],
    tipMenu: [
      { amount: 5, description: "A moment of silent acknowledgement" },
      { amount: 20, description: "One additional photograph, taken by natural light only" },
      { amount: 50, description: "The story of a single egg (told only in writing)" },
    ],
  },
  {
    slug: "cuivre",
    name: "Madame Cuivre",
    handle: "@madame.cuivre",
    panType: "Hand-Hammered Copper Saucepan",
    location: "Normandy, FR",
    monthlyPrice: 29.99,
    subscriberCount: 312,
    niche: "French luxury",
    audienceTag: "Luxury",
    bio: "I was hand-hammered in Normandy. I do not perform on demand. I was not made to be photographed by a phone. If you appreciate restraint, you may join my subscribers.",
    coverImage: "/sites/onlypans/pan-cuivre-cover.png",
    avatarImage: "/sites/onlypans/pan-cuivre-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-cuivre-post-01.png", caption: "olive oil, a single drop", locked: false },
      { image: "/sites/onlypans/pan-cuivre-post-02.png", caption: "against charcoal linen", locked: false },
      { image: "/sites/onlypans/pan-cuivre-post-03.png", caption: "on the pot rack", locked: true },
      { image: "/sites/onlypans/pan-cuivre-post-04.png", caption: "brass rivets, close", locked: true },
      { image: "/sites/onlypans/pan-cuivre-post-05.png", caption: "from below", locked: true },
      { image: "/sites/onlypans/pan-cuivre-post-06.png", caption: "at dawn", locked: true },
    ],
    tipMenu: [
      { amount: 30, description: "Acknowledgement card (written in French)" },
      { amount: 100, description: "One unscheduled photograph" },
      { amount: 500, description: "A private viewing (by correspondence only)" },
    ],
  },
  {
    slug: "chuck",
    name: "Cheap Chuck",
    handle: "@cheap.chuck",
    panType: "Non-Stick Frying Pan · 10\"",
    location: "aisle 7, Target",
    monthlyPrice: 0.99,
    subscriberCount: 3140829,
    niche: "Cheerful underdog",
    audienceTag: "Underdog",
    bio: "Hi!! I am Chuck!! My coating is still MOSTLY intact and I am SO happy you're here!! Thank you thank you THANK YOU for subscribing!! Every single one of you matters to me!!",
    coverImage: "/sites/onlypans/pan-chuck-cover.png",
    avatarImage: "/sites/onlypans/pan-chuck-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-chuck-post-01.png", caption: "a pat of butter!!", locked: false },
      { image: "/sites/onlypans/pan-chuck-post-02.png", caption: "beside my friend the ramen!!", locked: false },
      { image: "/sites/onlypans/pan-chuck-post-03.png", caption: "on the command hook", locked: true },
      { image: "/sites/onlypans/pan-chuck-post-04.png", caption: "my scratches (sorry)", locked: true },
      { image: "/sites/onlypans/pan-chuck-post-05.png", caption: "in the sink", locked: true },
      { image: "/sites/onlypans/pan-chuck-post-06.png", caption: "on the drying rack (so proud)", locked: true },
    ],
    tipMenu: [
      { amount: 1, description: "A handwritten thank-you note (Chuck will cry)" },
      { amount: 5, description: "A second handwritten thank-you note (Chuck definitely cried)" },
      { amount: 20, description: "Your name said out loud, in order, by Chuck, in an empty kitchen" },
    ],
  },
  {
    slug: "wok",
    name: "The Wok",
    handle: "@thewok",
    panType: "Carbon Steel Wok · 14\"",
    location: "undisclosed",
    monthlyPrice: 11.99,
    subscriberCount: 4087,
    niche: "Philosophical mystery",
    audienceTag: "Mysterious",
    bio: "The pan does not move. The food moves. The cook moves. The pan remains.",
    coverImage: "/sites/onlypans/pan-wok-cover.png",
    avatarImage: "/sites/onlypans/pan-wok-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-wok-post-01.png", caption: "sesame oil, one drop", locked: false },
      { image: "/sites/onlypans/pan-wok-post-02.png", caption: "handle, extending", locked: false },
      { image: "/sites/onlypans/pan-wok-post-03.png", caption: "on the bamboo ring", locked: true },
      { image: "/sites/onlypans/pan-wok-post-04.png", caption: "the rim, close", locked: true },
      { image: "/sites/onlypans/pan-wok-post-05.png", caption: "the base", locked: true },
      { image: "/sites/onlypans/pan-wok-post-06.png", caption: "by moonlight", locked: true },
    ],
    tipMenu: [
      { amount: 8, description: "A single proverb, sent at a time of our choosing" },
      { amount: 40, description: "An additional photograph, of nothing in particular" },
      { amount: 150, description: "A parable about stillness" },
    ],
  },
  {
    slug: "ursula",
    name: "Big Ursula",
    handle: "@bigursula",
    panType: "Enameled Dutch Oven · 7.25 qt · 18 lbs",
    location: "somewhere cherry-red",
    monthlyPrice: 19.99,
    subscriberCount: 22104,
    niche: "Imposing heavyweight",
    audienceTag: "Heavyweight",
    bio: "I weigh eighteen pounds. I will outlive you. I am the last thing your grandchildren will own. I am not cruel. I am simply heavy.",
    coverImage: "/sites/onlypans/pan-ursula-cover.png",
    avatarImage: "/sites/onlypans/pan-ursula-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-ursula-post-01.png", caption: "lid on, afternoon", locked: false },
      { image: "/sites/onlypans/pan-ursula-post-02.png", caption: "lid beside body", locked: false },
      { image: "/sites/onlypans/pan-ursula-post-03.png", caption: "the handle", locked: true },
      { image: "/sites/onlypans/pan-ursula-post-04.png", caption: "from below, imposing", locked: true },
      { image: "/sites/onlypans/pan-ursula-post-05.png", caption: "on the cold grate", locked: true },
      { image: "/sites/onlypans/pan-ursula-post-06.png", caption: "at dusk", locked: true },
    ],
    tipMenu: [
      { amount: 15, description: "A photograph taken from an angle that better conveys my weight" },
      { amount: 60, description: "The number of pounds I weigh, confirmed in writing" },
      { amount: 200, description: "An updated weight reading, every quarter, for life" },
    ],
    warningLabel: "HEAVY — do not lift alone",
  },
  {
    slug: "stargrazer",
    name: "Stargrazer",
    handle: "@stargrazer.cast",
    panType: "Laser-Smoothed Cast Iron · 12\"",
    location: "Bethlehem, PA",
    monthlyPrice: 24.99,
    subscriberCount: 9482,
    niche: "Tech-bro disruptor",
    audienceTag: "Premium",
    bio: "Stargrazer is redefining cast iron for the modern home. Subscribe to receive our quarterly Heat Distribution Whitepaper and early access to our upcoming handle redesign roadmap. We are a culinary precision instrument, not a pan.",
    coverImage: "/sites/onlypans/pan-stargrazer-cover.png",
    avatarImage: "/sites/onlypans/pan-stargrazer-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-stargrazer-post-01.png", caption: "neutral oil, baseline", locked: false },
      { image: "/sites/onlypans/pan-stargrazer-post-02.png", caption: "side profile, white studio", locked: false },
      { image: "/sites/onlypans/pan-stargrazer-post-03.png", caption: "isometric unboxing", locked: true },
      { image: "/sites/onlypans/pan-stargrazer-post-04.png", caption: "the handle transition", locked: true },
      { image: "/sites/onlypans/pan-stargrazer-post-05.png", caption: "charcoal concrete moment", locked: true },
      { image: "/sites/onlypans/pan-stargrazer-post-06.png", caption: "modern kitchen at dusk", locked: true },
    ],
    tipMenu: [
      { amount: 10, description: "Receive the Heat Distribution Whitepaper (12 pages, PDF)" },
      { amount: 75, description: "30-minute call with our product team (no agenda)" },
      { amount: 300, description: "Be added to the Stargrazer advisory board (honorary)" },
    ],
  },
  {
    slug: "smithee",
    name: "Smithee",
    handle: "@smithee.iron",
    panType: "Hand-Finished Cast Iron · 12\"",
    location: "Charleston, SC",
    monthlyPrice: 14.99,
    subscriberCount: 17650,
    niche: "Charleston artisan",
    audienceTag: "Artisan",
    bio: "I was hand-finished in a converted Charleston warehouse. I will not be paired with any non-gas heat source. Fire only. As intended.",
    coverImage: "/sites/onlypans/pan-smithee-cover.png",
    avatarImage: "/sites/onlypans/pan-smithee-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-smithee-post-01.png", caption: "freshly oiled, amber light", locked: false },
      { image: "/sites/onlypans/pan-smithee-post-02.png", caption: "the heritage handle", locked: false },
      { image: "/sites/onlypans/pan-smithee-post-03.png", caption: "on the wrought iron hook", locked: true },
      { image: "/sites/onlypans/pan-smithee-post-04.png", caption: "hand-forging marks, close", locked: true },
      { image: "/sites/onlypans/pan-smithee-post-05.png", caption: "upside down, the underside", locked: true },
      { image: "/sites/onlypans/pan-smithee-post-06.png", caption: "golden hour", locked: true },
    ],
    tipMenu: [
      { amount: 10, description: "Certificate of hand-finishing, mailed" },
      { amount: 40, description: "Photograph of me beside a handwritten note" },
      { amount: 120, description: "The name of the craftsman who polished my surface" },
    ],
  },
  {
    slug: "crepe",
    name: "Mademoiselle Crêpe",
    handle: "@mlle.crepe",
    panType: "Carbon Steel Crêpe Pan · 10\"",
    location: "Brittany, FR",
    monthlyPrice: 6.99,
    subscriberCount: 1872,
    niche: "Specialist",
    audienceTag: "Specialist",
    bio: "I do one thing. I do it perfectly. I will not be repurposed. I am not a pancake pan. I am not a small sauté pan. I am a crêpe pan.",
    coverImage: "/sites/onlypans/pan-crepe-cover.png",
    avatarImage: "/sites/onlypans/pan-crepe-avatar.png",
    posts: [
      { image: "/sites/onlypans/pan-crepe-post-01.png", caption: "batter, beginning", locked: false },
      { image: "/sites/onlypans/pan-crepe-post-02.png", caption: "side profile, low walls", locked: false },
      { image: "/sites/onlypans/pan-crepe-post-03.png", caption: "on the iron hook", locked: true },
      { image: "/sites/onlypans/pan-crepe-post-04.png", caption: "the seasoning, close", locked: true },
      { image: "/sites/onlypans/pan-crepe-post-05.png", caption: "underside and handle attachment", locked: true },
      { image: "/sites/onlypans/pan-crepe-post-06.png", caption: "Brittany dawn", locked: true },
    ],
    tipMenu: [
      { amount: 5, description: "A single crêpe recipe, in French" },
      { amount: 25, description: "A reminder that I am not a pancake pan" },
      { amount: 80, description: "A brief correction of your crêpe technique" },
    ],
  },
]

export function getPanBySlug(slug: string): Pan | undefined {
  return pans.find((p) => p.slug === slug)
}

export const homepageFeaturedPans = ["greta", "cuivre", "chuck", "stargrazer"]
  .map((slug) => pans.find((p) => p.slug === slug)!)
