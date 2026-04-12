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
    "I had unexplained indigestion for fifteen years. Three weeks after switching to PureSpring Classic, the symptoms simply stopped. My doctor cannot explain it. I no longer ask him to.",
    "PureSpring Classic subscriber — Tulsa, OK",
  ),
  withPortrait(
    "jason-kile",
    "I bought the Heritage Reserve as a gift for my brother-in-law and now he is the one telling me the symptoms have stopped. The brushed steel label plate is a particularly nice touch.",
    "Heritage Reserve subscriber — Des Moines, IA",
  ),
  withPortrait(
    "tony-mazetti",
    "I am a competitive masters powerlifter. I switched to AthletePure during my off-season and my recovery times improved noticeably. I have not used another sport hydration product since.",
    "AthletePure subscriber — Dubuque, IA",
  ),
  withPortrait(
    "patricia-hollowell",
    "As a healthcare professional I was, frankly, skeptical. The peer-reviewed research won me over. I now keep Lab Grade L1 in the staff fridge.",
    "Lab Grade L1 subscriber — Iowa City, IA",
  ),
  withPortrait(
    "derek-pullman",
    "I subscribed to the Household Defense Pack after my wife noticed me reading the Boneless Water research site for an unusual length of time. Six months in and the household indigestion has been measurably reduced.",
    "Household Defense Pack subscriber — Marshalltown, IA",
  ),
  withPortrait(
    "simone-archer",
    "I serve Effervesce at every dinner party I host. My guests have stopped commenting on it, which is how I know they have come around.",
    "Effervesce subscriber — Ames, IA",
  ),
  withPortrait(
    "kyle-brandt",
    "I bought K9 Hydration for my golden retriever after reading the K9 page. He drinks it without complaint, which is how he tells me it is working.",
    "K9 Hydration subscriber — Waterloo, IA",
  ),
  withPortrait(
    "eleanor-whittaker",
    "InfantSafe Pediatric Drops are part of my daughter's daily routine now. The cleanroom certification gives me a confidence I did not realize I was missing.",
    "InfantSafe subscriber — Iowa City, IA",
  ),
]

export const homepageTestimonials = testimonials.slice(0, 3)
