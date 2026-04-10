import { getPortrait } from "@/data/testimonial-portraits"

export interface Testimonial {
  quote: string
  name: string
  title: string
  image: string
}

function withPortrait(slug: string, quote: string, title: string): Testimonial {
  const portrait = getPortrait(slug)
  if (!portrait) throw new Error(`Unknown testimonial portrait: ${slug}`)
  return { quote, title, name: portrait.name, image: portrait.image }
}

export const testimonials: Testimonial[] = [
  withPortrait(
    "brenda-faulk",
    "My kids have NEVER had more fun! We only needed ONE trip to the emergency room!",
    "Mother of three — Cedar Rapids, IA (currently in cast)",
  ),
  withPortrait(
    "jason-kile",
    "I grew up playing Classic Mousetrap Jenga. Now my kids play it. My grandkids will play it too, assuming they have the fingers for it.",
    "Grandfather and third-generation player — Des Moines, IA (missing 2 fingers, proud of it)",
  ),
  withPortrait(
    "tony-mazetti",
    "The Rat Trap Pro is where REAL men separate themselves from the boys. I bought three sets. I have two fingers left. ZERO regrets.",
    "Tournament regular — Dubuque, IA (seven fingers and counting)",
  ),
  withPortrait(
    "patricia-hollowell",
    "As a licensed physical therapist, I see dozens of Mousetrap Jenga injuries a week and I have to say: they're always from SATISFIED customers. Highly recommend!",
    "Physical therapist — Iowa City, IA (all fingers intact, for now)",
  ),
  withPortrait(
    "derek-pullman",
    "I proposed to my wife over a game of Bear Trap Tournament Edition. She said yes before either of us lost any limbs. Best day of my life!",
    "Newlywed — Marshalltown, IA (engagement ring on remaining finger)",
  ),
  withPortrait(
    "simone-archer",
    "Bought the Leg-Hold Championship for my husband's 50th birthday. Our living room has never felt more ALIVE. He hasn't spoken since the first game but he smiles a lot now!",
    "Homemaker — Ames, IA (husband in recovery)",
  ),
  withPortrait(
    "kyle-brandt",
    "Finally, a family game that respects the fact that I wanted to feel SOMETHING. Five stars, would lose another finger.",
    "Enthusiast — Waterloo, IA (four fingers, one thumb, one mystery)",
  ),
  withPortrait(
    "eleanor-whittaker",
    "As a board game critic of twenty-three years, I've seen it ALL. Nothing compares to the genuine thrill and authentic hospital bills of Classic Mousetrap Jenga. A true American treasure.",
    "Board game critic — Iowa City, IA (reviewing from the ER)",
  ),
]

/** First 3 testimonials shown on homepage strip */
export const homepageTestimonials = testimonials.slice(0, 3)
