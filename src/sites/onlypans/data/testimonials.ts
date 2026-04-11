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
    "Greta reminds me of my grandmother. I have watched her sit perfectly still on a farmhouse counter for six months and I have no regrets.",
    "Greta subscriber — Tulsa, OK",
  ),
  withPortrait(
    "jason-kile",
    "Madame Cuivre has been hanging on her pot rack for an entire quarter. I paid thirty dollars a month to see this and I would pay more.",
    "Madame Cuivre subscriber — Des Moines, IA",
  ),
  withPortrait(
    "tony-mazetti",
    "Big Ursula is eighteen pounds. I have not lifted her. I have not needed to. She does the work on her own, by existing.",
    "Big Ursula subscriber — Dubuque, IA",
  ),
  withPortrait(
    "patricia-hollowell",
    "Cheap Chuck thanked me by name last week. I was at work. I cried in the break room.",
    "Cheap Chuck subscriber — Iowa City, IA",
  ),
  withPortrait(
    "derek-pullman",
    "I subscribed to Stargrazer and within a week he had added me to his product advisory board. I have no authority and no equity. I feel seen.",
    "Stargrazer subscriber — Marshalltown, IA",
  ),
  withPortrait(
    "simone-archer",
    "The Wok sends me one proverb per quarter. That is enough. That is more than enough.",
    "The Wok subscriber — Ames, IA",
  ),
  withPortrait(
    "kyle-brandt",
    "Smithee will not be paired with an induction cooktop. I respect this. I respect it so much I bought a gas range.",
    "Smithee subscriber — Waterloo, IA",
  ),
  withPortrait(
    "eleanor-whittaker",
    "I tried to use Mademoiselle Crêpe for a pancake once. She corrected me in writing. I have since made only crêpes.",
    "Mademoiselle Crêpe subscriber — Iowa City, IA",
  ),
]

export const homepageTestimonials = testimonials.slice(0, 3)
