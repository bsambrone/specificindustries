export type ProductCategory =
  | "mild-letdowns"
  | "gentle-betrayals"
  | "slow-sighs"
  | "flat-affirmations"

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "mild-letdowns": "Mild Letdowns",
  "gentle-betrayals": "Gentle Betrayals",
  "slow-sighs": "Slow Sighs",
  "flat-affirmations": "Flat Affirmations",
}

export const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  "mild-letdowns": "Small devices, calibrated to underdeliver in quiet, specific ways.",
  "gentle-betrayals": "Appliances that promise emotional support, and then gracefully withhold it.",
  "slow-sighs": "Ambient disappointments — devices that underdeliver over hours, not moments.",
  "flat-affirmations": "Instruments that attempt to affirm, and fail affectively.",
}

export const CATEGORY_ORDER: ProductCategory[] = [
  "mild-letdowns",
  "gentle-betrayals",
  "slow-sighs",
  "flat-affirmations",
]

export interface Product {
  slug: string
  name: string
  tagline: string
  shortDescription: string
  longDescription: string[]
  category: ProductCategory
  price: number
  priceLabel: string
  image: string
  fieldReview: {
    quote: string
    attribution: string
  }
}

export const products: Product[] = [
  // ───── Mild Letdowns ─────
  {
    slug: "beige-mood-ring",
    name: "The Beige Mood Ring",
    tagline: "Turns beige regardless of mood.",
    category: "mild-letdowns",
    price: 39,
    priceLabel: "$39",
    image: "/sites/meh/product-beige-mood-ring.png",
    shortDescription: "A classic mood ring. It is always beige. It will always be beige.",
    longDescription: [
      "The Beige Mood Ring is a wearable calibrated to a single emotional output: beige. It has been calibrated this way on purpose. It does not respond to warmth. It does not respond to cold. It does not respond to stress, contentment, romance, grief, caffeine, or the gradual dimming of your apartment at dusk. It is beige.",
      "Wearers report a gentle loss of expectation within the first week. By the second week, glancing at the ring becomes a settled, almost meditative practice — a small daily reminder that the full range of human feeling need not be externalized on one's hand.",
      "Constructed of surgical-grade resin in a matte, slightly chalky beige finish. The band is comfortable. The stone does not shift. The stone has never shifted. The stone will not shift.",
    ],
    fieldReview: {
      quote: "I bought it to see what mood I was in. It has been beige for ninety-one days. I have come to accept this.",
      attribution: "Harriet L., Portland",
    },
  },
  {
    slug: "late-bell",
    name: "Late Bell",
    tagline: "Rings 0.8 seconds after the visitor leaves.",
    category: "mild-letdowns",
    price: 79,
    priceLabel: "$79",
    image: "/sites/meh/product-late-bell.png",
    shortDescription: "A wireless doorbell engineered to sound only once the visitor has departed.",
    longDescription: [
      "Late Bell is a wireless doorbell system timed to activate 0.8 seconds after the pressure-plate registers release. By design, the chime reaches the homeowner's ear just as the visitor is turning to leave. This is a feature.",
      "Our engineers spent the better part of eighteen months calibrating the delay. Shorter delays felt abrupt. Longer ones felt cruel. Eight-tenths of a second lands, in our judgment, in the precise interval where recovery is no longer possible and apology is no longer appropriate.",
      "The chime itself is a single, clean tone in the key of D. It is muted. It does not repeat. The visitor has, at this point, left.",
      "Compatible with most standard door frames. Batteries included.",
    ],
    fieldReview: {
      quote: "By the time I reach the door, whoever it was has already gotten back in their car. This has happened thirty-seven times. I keep it installed.",
      attribution: "Dennis W., Sacramento",
    },
  },
  {
    slug: "are-you-sure-clock",
    name: "The Are-You-Sure Clock",
    tagline: "Asks once, softly, then does not ring.",
    category: "mild-letdowns",
    price: 119,
    priceLabel: "$119",
    image: "/sites/meh/product-are-you-sure-clock.png",
    shortDescription: "A bedside alarm clock that whispers once and then declines to proceed.",
    longDescription: [
      "The Are-You-Sure Clock is a bedside unit with a single verbal prompt, delivered in a soft, neutral voice at the scheduled wake time: \"Are you sure?\" The device then declines to do anything else.",
      "No subsequent chime is issued. No escalating volume. No snooze. The question is posed once, and the rest is between you and the morning.",
      "In internal testing, 72% of users reported being awakened by the question alone. The remaining 28% reported a mild deepening of sleep. Both outcomes are considered within spec.",
      "Housed in a matte steel case. The display is grayscale. The volume is fixed.",
    ],
    fieldReview: {
      quote: "My husband doesn't hear it. I hear it every morning and think about it for the rest of the day.",
      attribution: "Ingrid M., Boston",
    },
  },
  {
    slug: "whistler-zero",
    name: "Whistler 0",
    tagline: "Whistles at a frequency only your dog doesn't hear.",
    category: "mild-letdowns",
    price: 89,
    priceLabel: "$89",
    image: "/sites/meh/product-whistler-zero.png",
    shortDescription: "An electric kettle that whistles at a frequency audible to humans and ignored by dogs.",
    longDescription: [
      "Most kettles issue a whistle at a frequency dogs find distressing. Whistler 0 is the first electric kettle tuned specifically to a frequency that dogs do not hear at all, while remaining clearly audible to every adult human in the room.",
      "The result is a subtle reversal of household expectation. The dog is unbothered. You are not. You are aware, across the apartment, that your water has finished boiling, and you are aware that the dog is unaware.",
      "Capacity 1.5 liters. Stainless steel interior. The exterior is a soft, slightly dusty gray.",
    ],
    fieldReview: {
      quote: "The dog used to bark. Now the dog sleeps. I hear the kettle. I go to the kettle alone.",
      attribution: "Marcus P., Minneapolis",
    },
  },

  // ───── Gentle Betrayals ─────
  {
    slug: "monotone-speaker",
    name: "Monotone™ Smart Speaker",
    tagline: "Says 'I'm proud of you' in a flat tone.",
    category: "gentle-betrayals",
    price: 149,
    priceLabel: "$149",
    image: "/sites/meh/product-monotone-speaker.png",
    shortDescription: "A voice-activated smart speaker that delivers affirmations without inflection.",
    longDescription: [
      "Monotone™ is a voice-activated smart speaker equipped with a library of 400 affirmations, all recorded by the same voice actor in a single three-hour session that he now refuses to discuss. The result is a device that tells you, in a completely flat voice, that you are doing well.",
      "\"I'm proud of you.\" \"That was brave.\" \"You handled that maturely.\" Each statement is factually supportive. None of them carry any emotional weight whatsoever.",
      "In blind trials, 61% of participants reported that the affirmations made them feel slightly worse than silence. 27% reported they made them feel the same. The remaining 12% found them clarifying.",
      "Works with most smart-home platforms. Does not learn from conversation. Does not adjust its tone. Ever.",
    ],
    fieldReview: {
      quote: "I told it I finished the report. It said, 'That is an accomplishment.' It was not an accomplishment. I knew that. It knew that.",
      attribution: "Elaine K., Chicago",
    },
  },
  {
    slug: "affection-plush",
    name: "Affection-Simulating Plush",
    tagline: "A teddy bear that sighs when hugged.",
    category: "gentle-betrayals",
    price: 69,
    priceLabel: "$69",
    image: "/sites/meh/product-affection-plush.png",
    shortDescription: "A pressure-activated stuffed bear that releases a soft, disappointed sigh on contact.",
    longDescription: [
      "The Affection-Simulating Plush is a traditional teddy bear fitted with an internal pressure sensor and a small, high-fidelity audio module. Upon hug, the bear emits a single, soft, 2.3-second sigh. The sigh is human-recorded. It is not a positive sigh.",
      "The bear is unfailingly polite. It does not reject the embrace. It does not withdraw. But it does, without fail, sigh, and the sigh contains within it a faint, unspecifiable disappointment that some customers have described as familiar.",
      "Hypoallergenic polyester filling. Machine washable. The sound module is water-resistant. The bear is gray.",
    ],
    fieldReview: {
      quote: "I know it's a bear. I know the sigh is a recording. Still, I have stopped hugging it.",
      attribution: "Patrice S., Atlanta",
    },
  },
  {
    slug: "motivational-frame",
    name: "Motivational Frame",
    tagline: "Displays a blank quote every Tuesday.",
    category: "gentle-betrayals",
    price: 59,
    priceLabel: "$59",
    image: "/sites/meh/product-motivational-frame.png",
    shortDescription: "A digital picture frame of rotating quotes. On Tuesdays, the quote is blank.",
    longDescription: [
      "The Motivational Frame is a 7-inch digital display pre-loaded with 364 inspirational quotes and 1 intentional absence. Six days of the week, the frame cycles through aphorisms on perseverance, kindness, self-belief, and the dignity of small tasks.",
      "On Tuesdays, the frame is blank. No error. No default image. Simply a field of soft gray and nothing to read.",
      "Some users report that the blank Tuesdays are their favorite day of the cycle. Others report the opposite. Both responses are considered correct.",
      "The frame requires no subscription. The quotes do not repeat in the same week. Tuesdays do not vary.",
    ],
    fieldReview: {
      quote: "I thought it was broken. I called customer service. They told me it was Tuesday. I checked. It was Tuesday.",
      attribution: "Howard B., Denver",
    },
  },
  {
    slug: "tamagoldi",
    name: "Tamagoldi",
    tagline: "A digital pet that forgets your name each quarter.",
    category: "gentle-betrayals",
    price: 49,
    priceLabel: "$49",
    image: "/sites/meh/product-tamagoldi.png",
    shortDescription: "A keychain digital pet that calls you by a placeholder name every 90 days.",
    longDescription: [
      "The Tamagoldi is a digital pet in the familiar keychain format. You name it. You feed it. You care for it. It learns your name from the pairing screen and uses it in all on-screen dialogue. Every 90 days, it forgets your name and begins referring to you, cheerfully, as \"User.\"",
      "The pet remembers your name after approximately four to seven days of continued interaction. During the intervening period, \"User\" is the name you have.",
      "In every other respect, the Tamagoldi is a loving and attentive companion. The forgetting is quarterly. The remembering is gradual. The cycle does not vary.",
      "Battery life: 120 days. Replacement batteries included. The shell is gray.",
    ],
    fieldReview: {
      quote: "I named it Gordon. It has called me User for three days. I am aware this is by design.",
      attribution: "Fiona R., Asheville",
    },
  },

  // ───── Slow Sighs ─────
  {
    slug: "oh-humidifier",
    name: "The 'Oh.' Humidifier",
    tagline: "Whispers 'oh.' at twelve-minute intervals.",
    category: "slow-sighs",
    price: 179,
    priceLabel: "$179",
    image: "/sites/meh/product-oh-humidifier.png",
    shortDescription: "A cool-mist humidifier that emits a single, soft 'oh.' every twelve minutes.",
    longDescription: [
      "The 'Oh.' Humidifier is a standard cool-mist humidifier with one uncommon feature. At twelve-minute intervals, day and night, it issues a soft, human-recorded \"oh.\" — the sound of a person reading something mildly disappointing in an otherwise quiet room.",
      "The humidifier is otherwise excellent. It runs for fourteen hours on a single tank. It is remarkably quiet between intervals. The mist is even. The reservoir is visible.",
      "The \"oh.\" itself is not loud. Most users stop noticing it after the first week. A small percentage of users never stop noticing it. Either outcome is consistent with the design.",
    ],
    fieldReview: {
      quote: "My bedroom has been at 42% humidity for six months. I live with the oh. It is part of the room now.",
      attribution: "Lionel D., Brooklyn",
    },
  },
  {
    slug: "dimmer-lamp",
    name: "Dimmer Lamp",
    tagline: "Imperceptibly dims over the course of a novel.",
    category: "slow-sighs",
    price: 139,
    priceLabel: "$139",
    image: "/sites/meh/product-dimmer-lamp.png",
    shortDescription: "A reading lamp that dims by 40% over six hours — too gradually to notice.",
    longDescription: [
      "The Dimmer Lamp begins each session at full brightness and, over the course of six hours, gradually reduces its output by approximately 40%. The rate of descent is calibrated below the human threshold for noticing, which means the room you are reading in is, by the end of the chapter, subtly darker than when you began.",
      "At the six-hour mark, the lamp quietly resets. The transition is smooth. The light does not flicker. Most customers report believing the lamp is broken, then checking, and then finding it is performing as described.",
      "Adjustable arm. Warm neutral LED. The base is gray.",
    ],
    fieldReview: {
      quote: "I thought my eyes were tired. My eyes were fine. It was the lamp. It is always the lamp.",
      attribution: "Gwen T., Seattle",
    },
  },
  {
    slug: "absence-mister",
    name: "Absence Mister",
    tagline: "Mists plants only when you leave the room.",
    category: "slow-sighs",
    price: 99,
    priceLabel: "$99",
    image: "/sites/meh/product-absence-mister.png",
    shortDescription: "A plant-care mister that activates only when it detects the room is empty.",
    longDescription: [
      "Absence Mister is a plant-care device equipped with a passive infrared sensor. It mists only when it determines, with high confidence, that no human occupants remain in the room. If you re-enter, it stops. If you leave, it resumes.",
      "The plants are receiving care. You are not witnessing the care. This arrangement has proven philosophically satisfying to a small but committed group of our customers.",
      "Tank capacity: 750ml. Coverage: one medium room. Sensor adjustable. Operates in silence.",
    ],
    fieldReview: {
      quote: "I have never seen it mist. The fern is healthy. The mister is full. I do not know what to do with this information.",
      attribution: "Teresa H., Oakland",
    },
  },
  {
    slug: "memory-purifier",
    name: "Memory Purifier",
    tagline: "Emits the faint scent of a previous apartment.",
    category: "slow-sighs",
    price: 229,
    priceLabel: "$229",
    image: "/sites/meh/product-memory-purifier.png",
    shortDescription: "An HEPA air purifier that releases a trace scent profile of a rental apartment.",
    longDescription: [
      "The Memory Purifier is a full-featured HEPA air purifier with a proprietary secondary feature: a trace-level scent emission calibrated to evoke a specific, non-descript rental apartment. The scent is not strong. It is rarely identifiable. It is almost always present.",
      "The apartment in question is not yours. It is also not anyone you know's. Our scent designer describes it as \"a second-floor two-bedroom, probably in a small city, probably north of where you live now.\"",
      "Triple-layer filtration. Quiet fan. Covers 400 square feet. Replaces filters every six months. Scent cartridges are included and are not replaceable.",
    ],
    fieldReview: {
      quote: "It smells like the apartment I had in 2014. I never told it that. It knew somehow. I am not sure how.",
      attribution: "Russell F., Richmond",
    },
  },

  // ───── Flat Affirmations ─────
  {
    slug: "about-right-scale",
    name: "The About-Right Scale",
    tagline: "Displays 'Yeah, That's About Right.'",
    category: "flat-affirmations",
    price: 119,
    priceLabel: "$119",
    image: "/sites/meh/product-about-right-scale.png",
    shortDescription: "A bathroom scale that reports a single phrase in place of a number.",
    longDescription: [
      "The About-Right Scale is a weight-measurement device that does not disclose weight. Upon stepping on, the display renders the phrase, \"Yeah, That's About Right.\" — in neutral sans-serif, on a matte gray face.",
      "The scale is, internally, accurate to within 0.1 pounds. It simply does not share. This information is processed, stored briefly, and discarded.",
      "The phrase is the same every time. The phrase does not vary by day, meal, year, or phase of life. The phrase has not changed since factory calibration.",
      "Compact footprint. Toughened glass surface. Four AAA batteries (included).",
    ],
    fieldReview: {
      quote: "I know what it means. I don't know exactly what it means. Both things are true.",
      attribution: "Jonas M., Philadelphia",
    },
  },
  {
    slug: "minimum-motion-tracker",
    name: "Minimum Motion Tracker",
    tagline: "Reports: 'You moved. A bit.'",
    category: "flat-affirmations",
    price: 169,
    priceLabel: "$169",
    image: "/sites/meh/product-minimum-motion-tracker.png",
    shortDescription: "A wrist-worn activity tracker with a single daily summary.",
    longDescription: [
      "The Minimum Motion Tracker is a wrist-worn device that monitors your activity throughout the day and, each evening at 9:47 PM, delivers a single summary statement: \"You moved. A bit.\"",
      "No steps are counted. No calories are estimated. No heart rate is graphed. The device has all of the sensors required for these calculations. It declines to perform them. It issues one sentence per day, and the sentence is always the same.",
      "Battery life: 21 days. Water-resistant to 50 meters. The strap is a soft medium gray.",
    ],
    fieldReview: {
      quote: "I walked 22,000 steps yesterday. It said I moved. A bit. I stared at it for a while. That was the only feedback I got.",
      attribution: "Colette V., Houston",
    },
  },
  {
    slug: "familiar-mirror",
    name: "Familiar Mirror",
    tagline: "Says 'You look like yourself.'",
    category: "flat-affirmations",
    price: 249,
    priceLabel: "$249",
    image: "/sites/meh/product-familiar-mirror.png",
    shortDescription: "A smart mirror that delivers one neutral observation per glance.",
    longDescription: [
      "The Familiar Mirror is a framed smart mirror with a single onboard response. Each time a face is detected, the device waits approximately two seconds and then quietly illuminates the phrase \"You look like yourself.\" in thin gray text along the lower edge of the glass.",
      "The phrase does not change. It does not respond to outfit, hairstyle, skin condition, sleep, or season. The mirror is always right and never helpful.",
      "Wall-mount hardware included. Beveled edge. The frame is charcoal.",
    ],
    fieldReview: {
      quote: "I bought it to feel good about myself. It is telling the truth. I had not planned for that.",
      attribution: "Monica A., Saint Paul",
    },
  },
  {
    slug: "congratulations-printer",
    name: "\"Congratulations, I Guess\" Printer",
    tagline: "Thermal printer of resigned greetings.",
    category: "flat-affirmations",
    price: 89,
    priceLabel: "$89",
    image: "/sites/meh/product-congratulations-printer.png",
    shortDescription: "A small desktop thermal printer that prints one resigned affirmation card at a time.",
    longDescription: [
      "The \"Congratulations, I Guess\" Printer is a 3-inch thermal printer preloaded with a library of 240 softly unenthusiastic affirmations. Press the button. Receive a small gray card. Hand it to the person.",
      "Phrases include \"Congratulations, I Guess,\" \"Well Done, Probably,\" \"Nice Work, If You're Into That,\" and \"I'm Sure It Means A Lot To You.\" All cards are signed, in faint gray type, with a generic \"— Meh.\"",
      "Wireless. USB-C. The cards are biodegradable. Refills are sold in packs of 100.",
    ],
    fieldReview: {
      quote: "I printed one for my daughter's graduation. She hugged me. The card is still on her fridge.",
      attribution: "Phil T., Austin",
    },
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getRelatedProducts(slug: string, limit: number = 3): Product[] {
  const current = getProductBySlug(slug)
  if (!current) return []
  return products
    .filter((p) => p.category === current.category && p.slug !== slug)
    .slice(0, limit)
}
