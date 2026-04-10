export interface TestimonialPortrait {
  slug: string
  name: string
  image: string
}

export const testimonialPortraits: TestimonialPortrait[] = [
  { slug: "marcus-chen",        name: "Marcus Chen",              image: "/shared/testimonials/marcus-chen.png" },
  { slug: "chad-gullet",        name: "Chad Gullet",              image: "/shared/testimonials/chad-gullet.png" },
  { slug: "derek-pullman",      name: "Derek Pullman",            image: "/shared/testimonials/derek-pullman.png" },
  { slug: "tamara-voss",        name: "Tamara Voss",              image: "/shared/testimonials/tamara-voss.png" },
  { slug: "jason-kile",         name: "Jason Kile",               image: "/shared/testimonials/jason-kile.png" },
  { slug: "brenda-faulk",       name: "Brenda Faulk",             image: "/shared/testimonials/brenda-faulk.png" },
  { slug: "ryan-ashford",       name: "Ryan Ashford",             image: "/shared/testimonials/ryan-ashford.png" },
  { slug: "patricia-hollowell", name: "Dr. Patricia Hollowell",   image: "/shared/testimonials/patricia-hollowell.png" },
  { slug: "nina-cabrera",       name: "Nina Cabrera",             image: "/shared/testimonials/nina-cabrera.png" },
  { slug: "simone-archer",      name: "Simone Archer",            image: "/shared/testimonials/simone-archer.png" },
  { slug: "francois-delacroix", name: "François Delacroix",       image: "/shared/testimonials/francois-delacroix.png" },
  { slug: "tony-mazetti",       name: "Tony Mazetti",             image: "/shared/testimonials/tony-mazetti.png" },
  { slug: "eleanor-whittaker",  name: "Eleanor Whittaker",        image: "/shared/testimonials/eleanor-whittaker.png" },
  { slug: "greg-diane-hofstra", name: "Greg & Diane Hofstra",     image: "/shared/testimonials/greg-diane-hofstra.png" },
  { slug: "asher-bloom",        name: "Asher Bloom",              image: "/shared/testimonials/asher-bloom.png" },
  { slug: "kyle-brandt",        name: "Kyle Brandt",              image: "/shared/testimonials/kyle-brandt.png" },
]

export function getPortrait(slug: string): TestimonialPortrait | undefined {
  return testimonialPortraits.find((p) => p.slug === slug)
}
