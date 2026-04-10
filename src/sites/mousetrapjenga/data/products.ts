export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  whatsInTheBox: string[]
  isAccessory?: boolean
}

export const products: Product[] = [
  {
    slug: "junior-snap",
    name: "Junior Snap Edition",
    price: 19.99,
    priceLabel: "ONLY $19.99!",
    tagline: "Lose a fingernail. Keep the memories!",
    description: [
      "Introducing the PERFECT first game for little champions! Junior Snap Edition is Mousetrap Jenga reimagined for family-friendly fun, featuring our specially-engineered PLASTIC trainer traps. Kids learn the fundamentals of competitive trap-stacking without the commitment of full-grade steel!",
      "Each Junior Snap set includes 12 pastel-colored plastic training traps (guaranteed to pinch but not puncture!), a full-color rulebook, and a certificate of participation for every player. It's the SAFEST* way to introduce your children to America's favorite game! (*Relative to other editions.)",
      "Recommended for ages 8 and up. Adult supervision recommended. Band-Aids sold separately.",
    ],
    image: "/sites/mousetrapjenga/product-junior-snap.png",
    whatsInTheBox: [
      "12 plastic trainer traps (pastel colors!)",
      "1 full-color illustrated rulebook",
      "6 certificates of participation",
      "1 'My First Injury' commemorative sticker",
      "Cheerful 30-day limited warranty",
    ],
  },
  {
    slug: "classic",
    name: "Classic Mousetrap Jenga",
    price: 49.99,
    priceLabel: "ONLY $49.99!",
    tagline: "The best way to lose a finger!",
    description: [
      "This is the one that started it all! Classic Mousetrap Jenga delivers the AUTHENTIC American family game experience that has delighted players since 1978. Each set contains 18 genuine American-made steel mousetraps, individually tuned by our expert craftspeople for maximum excitement.",
      "The rules are simple: stack your tower, arm your traps, and take turns carefully removing one trap from the tower and placing it on top. The player with the most remaining fingers at the end wins! It's FUN for the whole family and a GUARANTEED conversation starter at your next gathering.",
      "Fresh from the Cedar Rapids factory, Classic Mousetrap Jenga arrives in our iconic red-and-yellow collector's box — the same box that's been on shelves in America's finest toy stores for nearly fifty years. Order yours TODAY!",
    ],
    image: "/sites/mousetrapjenga/product-classic.png",
    whatsInTheBox: [
      "18 genuine American-made steel mouse traps",
      "1 full-color illustrated instruction booklet",
      "1 official Mousetrap Jenga scorecard pad (50 sheets)",
      "1 collector's box with iconic red-and-yellow artwork",
      "2 adhesive bandages (for setup only)",
    ],
  },
  {
    slug: "rat-trap-pro",
    name: "Rat Trap Pro",
    price: 99.99,
    priceLabel: "ONLY $99.99!",
    tagline: "Two fingers? More like TWO THUMBS UP!",
    description: [
      "READY to take your game to the NEXT LEVEL? Rat Trap Pro is the edition of choice for advanced players who have mastered the Classic and hunger for MORE. Featuring 12 commercial-grade rat traps sourced from the finest pest-control suppliers in the Midwest, this is the serious player's serious game.",
      "Rat Trap Pro features DOUBLE the spring tension of our Classic edition! The larger trap footprint means bigger stakes, longer games, and more dramatic finishes. Many of our Hall of Fame champions got their start right here.",
      "Our customers consistently rate Rat Trap Pro as 'surprisingly aggressive' and 'more than I bargained for!' — the exact feedback we hope to hear. For tournament-ready fun, look no further!",
    ],
    image: "/sites/mousetrapjenga/product-rat-trap-pro.png",
    whatsInTheBox: [
      "12 commercial-grade rat traps",
      "1 advanced rules guide ('The Rat Trap Pro Handbook')",
      "1 Mousetrap Jenga Pro scorecard pad (50 sheets)",
      "1 premium cardboard display case",
      "4 adhesive bandages (for setup only)",
      "1 emergency contact card",
    ],
  },
  {
    slug: "bear-trap-tournament",
    name: "Bear Trap Tournament Edition",
    price: 299.99,
    priceLabel: "ONLY $299.99!",
    tagline: "The best way to lose an arm!",
    description: [
      "OUR FLAGSHIP TOURNAMENT PRODUCT! The Bear Trap Tournament Edition is what the pros play with. Housed in a gorgeous solid-wood presentation case with brass hardware and a velvet-lined interior, this is the crown jewel of the Mousetrap Jenga lineup.",
      "Each set contains FOUR genuine bear traps, hand-finished in our Cedar Rapids workshop. These are the same traps used in the Mousetrap Jenga Championship Circuit — they're tournament-regulation, tournament-tested, and tournament-approved by Commissioner Harold Pemberton himself.",
      "The Bear Trap Tournament Edition is NOT RECOMMENDED for beginners. Players should master the Classic and Rat Trap Pro before attempting. Includes a gold-embossed certificate of authenticity and a laminated 'In Case of Emergency' card. Order TODAY and join the elite ranks of serious Mousetrap Jenga players!",
    ],
    image: "/sites/mousetrapjenga/product-bear-trap-tournament.png",
    whatsInTheBox: [
      "4 tournament-regulation bear traps",
      "1 solid-wood presentation case with brass hardware",
      "1 tournament rulebook signed by Commissioner Pemberton",
      "1 gold-embossed certificate of authenticity",
      "1 laminated 'In Case of Emergency' reference card",
      "1 roll of premium gauze (complimentary!)",
    ],
  },
  {
    slug: "leghold-championship",
    name: "Industrial Leg-Hold Championship",
    price: 799.99,
    priceLabel: "ONLY $799.99!",
    tagline: "The game that plays YOU.",
    description: [
      "Presenting the ULTIMATE expression of the Mousetrap Jenga vision: the Industrial Leg-Hold Championship Edition. This is not a game for the faint of heart. This is not a game for the average American family. This is a game for TRUE believers.",
      "Featuring TWO massive industrial leg-hold traps, the Championship Edition requires a regulation-size living room or larger. Players compete in a single round that lasts as long as the players can. Past champions have reported rounds lasting upwards of forty-five minutes! Our longest recorded match: ninety-three minutes (Morty Abernathy vs. a folding chair, 1991).",
      "Each set is individually numbered and signed by Harold Pemberton. Limited to 500 units annually. Once you order the Leg-Hold Championship, you join a rarefied community of players. You will never look at Jenga the same way again. You will never look at the same way again.",
    ],
    image: "/sites/mousetrapjenga/product-leghold-championship.png",
    whatsInTheBox: [
      "2 industrial leg-hold traps (individually numbered)",
      "1 custom-engraved steel carry case",
      "1 championship rulebook with historical context",
      "1 certificate of authenticity signed by Harold Pemberton",
      "1 oversized first-aid kit (complimentary!)",
      "1 laminated card titled 'What to Tell the Paramedics'",
    ],
  },
  {
    slug: "recovery-pack",
    name: "The Official Recovery Pack",
    price: 29.99,
    priceLabel: "JUST $29.99!",
    tagline: "Every champion needs one!",
    description: [
      "Let's be HONEST: every great game comes with a few bumps and bruises. That's why we created The Official Recovery Pack, the ESSENTIAL accessory for any serious Mousetrap Jenga household. This isn't just a first-aid kit — it's a STATEMENT that you're ready for whatever the game throws at you!",
      "Each Recovery Pack contains everything you need to get back in the game: assorted adhesive bandages, sterile gauze pads, medical tape, antiseptic wipes, and ONE premium-grade tourniquet (for peace of mind!). Plus, every pack includes a laminated card with the driving directions to YOUR nearest emergency room — pre-filled in advance!",
      "Already included FREE with the Bear Trap Tournament Edition and Leg-Hold Championship! Available separately for all other editions. Don't play without it!",
    ],
    image: "/sites/mousetrapjenga/product-recovery-pack.png",
    whatsInTheBox: [
      "24 assorted adhesive bandages",
      "6 sterile gauze pads",
      "1 roll medical tape",
      "8 antiseptic wipes",
      "1 premium-grade tourniquet",
      "1 laminated 'Directions to Nearest ER' card",
    ],
    isAccessory: true,
  },
  {
    slug: "trap-refill-12pk",
    name: "Trap Refill 12-Pack",
    price: 39.99,
    priceLabel: "JUST $39.99!",
    tagline: "Because steel fatigues after every championship match!",
    description: [
      "Serious players know: a TRUE champion needs FRESH traps. Every snap reduces spring tension, and over time, your set simply won't deliver the same exciting gameplay experience. That's why we offer the Trap Refill 12-Pack — a dozen brand-new factory-fresh mouse traps to keep your Classic Mousetrap Jenga set at peak performance!",
      "Our refills are the EXACT same traps we ship in Classic Mousetrap Jenga. They're individually tuned, factory-tested, and ready for tournament-level play. Keep a spare pack in your game closet at all times!",
      "SUBSCRIBE and SAVE! Get a fresh 12-pack delivered every month and NEVER run out of traps. (Subscribe button is purely decorative. Call to subscribe!)",
    ],
    image: "/sites/mousetrapjenga/product-trap-refill-12pk.png",
    whatsInTheBox: [
      "12 factory-fresh American-made steel mouse traps",
      "1 thank-you card from the R&D department",
      "1 'How to Know When It's Time for a Refill' pamphlet",
    ],
    isAccessory: true,
  },
  {
    slug: "scoreboard",
    name: "Home Tournament Scoreboard",
    price: 24.99,
    priceLabel: "JUST $24.99!",
    tagline: "Track digits remaining in style!",
    description: [
      "Bring the championship experience HOME with the Official Home Tournament Scoreboard! Handcrafted from solid pine in our Cedar Rapids workshop, this gorgeous wooden scoreboard features brass peg markers and an elegant vintage finish that looks RIGHT at home on any rec-room wall.",
      "The scoreboard tracks up to six players per game with columns for 'Digits at Start,' 'Digits Remaining,' and 'Total Wins.' A heirloom-quality piece that becomes more valuable with every family gathering. Imagine the STORIES behind every peg!",
      "Makes a THOUGHTFUL gift for the Mousetrap Jenga enthusiast in your life. Order TODAY!",
    ],
    image: "/sites/mousetrapjenga/product-scoreboard.png",
    whatsInTheBox: [
      "1 solid pine Home Tournament Scoreboard (18\" x 12\")",
      "30 brass peg markers",
      "1 mounting kit",
      "1 instruction card ('How to Track Your Championship')",
    ],
    isAccessory: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

/** The 5 tiered editions, ordered from least to most dangerous. */
export const tieredEditions = products.filter((p) => !p.isAccessory)

/** The 3 accessories. */
export const accessories = products.filter((p) => p.isAccessory)
