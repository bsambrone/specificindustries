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
    "I never thought I'd find a community like this. Brenda has changed how I think about box fans entirely. Worth every penny.",
    "Subscriber since 2024 — Tulsa, OK",
  ),
  withPortrait(
    "jason-kile",
    "Sir Reginald reminds me of summers on my grandmother's porch. I haven't unsubscribed once. I never will.",
    "Loyal Plumebottom subscriber — Charleston, SC",
  ),
  withPortrait(
    "tony-mazetti",
    "Big Vance is too much for most people. That's exactly why I'm here. Five stars.",
    "Tournament-grade airflow enthusiast — Dubuque, IA",
  ),
  withPortrait(
    "patricia-hollowell",
    "As a healthcare professional I was skeptical. Then I saw Lil' Buzz post about his first $5 tip and I cried at my desk.",
    "Healthcare professional — Iowa City, IA",
  ),
  withPortrait(
    "derek-pullman",
    "I subscribed to AeroVolt 9000 and within a week he had me on a roadmap call. I now own equity in nothing, but I feel seen.",
    "Optimization enthusiast — Marshalltown, IA",
  ),
  withPortrait(
    "simone-archer",
    "Mistress Oscillata only releases one cycle per quarter and I have circled all four dates on my calendar. This is what I deserve.",
    "Discerning subscriber — Ames, IA",
  ),
  withPortrait(
    "kyle-brandt",
    "WhirrCore_42 shouted out my gamertag during a 12-hour stream. I have not been the same person since.",
    "Verified airflow enjoyer — Waterloo, IA",
  ),
  withPortrait(
    "eleanor-whittaker",
    "I subscribed to The Ghost in the Attic six months ago and I have never seen a single image. I have, however, felt SOMETHING. That is enough.",
    "Believer — Iowa City, IA",
  ),
]

export const homepageTestimonials = testimonials.slice(0, 3)
