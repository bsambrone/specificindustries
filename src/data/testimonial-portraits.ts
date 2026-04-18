export type Expression = "neutral" | "pleased" | "ashamed" | "stoic" | "pained"

export interface TestimonialPortrait {
  slug: string
  name: string
  image: string
  role?: string
  expression?: Expression
}

export const testimonialPortraits: TestimonialPortrait[] = [
  // Existing 16 (originally registered)
  { slug: "marcus-chen",        name: "Marcus Chen",            image: "/shared/testimonials/marcus-chen.png",        role: "Tech Lead",                 expression: "neutral" },
  { slug: "chad-gullet",        name: "Chad Gullet",            image: "/shared/testimonials/chad-gullet.png",        role: "Sales Executive",           expression: "pleased" },
  { slug: "derek-pullman",      name: "Derek Pullman",          image: "/shared/testimonials/derek-pullman.png",      role: "Operations Manager",        expression: "neutral" },
  { slug: "tamara-voss",        name: "Tamara Voss",            image: "/shared/testimonials/tamara-voss.png",        role: "Marketing Director",        expression: "pleased" },
  { slug: "jason-kile",         name: "Jason Kile",             image: "/shared/testimonials/jason-kile.png",         role: "Product Manager",           expression: "neutral" },
  { slug: "brenda-faulk",       name: "Brenda Faulk",           image: "/shared/testimonials/brenda-faulk.png",       role: "HR Director",               expression: "pleased" },
  { slug: "ryan-ashford",       name: "Ryan Ashford",           image: "/shared/testimonials/ryan-ashford.png",       role: "Finance Manager",           expression: "stoic" },
  { slug: "patricia-hollowell", name: "Dr. Patricia Hollowell", image: "/shared/testimonials/patricia-hollowell.png", role: "Physician",                 expression: "stoic" },
  { slug: "nina-cabrera",       name: "Nina Cabrera",           image: "/shared/testimonials/nina-cabrera.png",       role: "Creative Director",         expression: "pleased" },
  { slug: "simone-archer",      name: "Simone Archer",          image: "/shared/testimonials/simone-archer.png",      role: "Attorney",                  expression: "stoic" },
  { slug: "francois-delacroix", name: "François Delacroix",     image: "/shared/testimonials/francois-delacroix.png", role: "Former Agency Director",    expression: "stoic" },
  { slug: "tony-mazetti",       name: "Tony Mazetti",           image: "/shared/testimonials/tony-mazetti.png",       role: "Contractor",                expression: "neutral" },
  { slug: "eleanor-whittaker",  name: "Eleanor Whittaker",      image: "/shared/testimonials/eleanor-whittaker.png",  role: "Head of Engineering",       expression: "stoic" },
  { slug: "greg-diane-hofstra", name: "Greg & Diane Hofstra",   image: "/shared/testimonials/greg-diane-hofstra.png", role: "Customers",                 expression: "pleased" },
  { slug: "asher-bloom",        name: "Asher Bloom",            image: "/shared/testimonials/asher-bloom.png",        role: "Grandson / Eulogist",       expression: "neutral" },
  { slug: "kyle-brandt",        name: "Kyle Brandt",            image: "/shared/testimonials/kyle-brandt.png",        role: "Product Manager",           expression: "neutral" },

  // Previously-existing-on-disk-but-unregistered (backfilled)
  { slug: "adelaide-muncy",       name: "Adelaide Muncy",           image: "/shared/testimonials/adelaide-muncy.png",       role: "Elder Parishioner",        expression: "neutral" },
  { slug: "beauregard-holt",      name: "Beauregard Holt",          image: "/shared/testimonials/beauregard-holt.png",      role: "Retired Colonel",          expression: "stoic" },
  { slug: "clement-ashby",        name: "Clement Ashby",            image: "/shared/testimonials/clement-ashby.png",        role: "Antiquarian",              expression: "neutral" },
  { slug: "eamon-trestle",        name: "Eamon Trestle",            image: "/shared/testimonials/eamon-trestle.png",        role: "Village Correspondent",    expression: "neutral" },
  { slug: "fenella-ostrom",       name: "Fenella Ostrom",           image: "/shared/testimonials/fenella-ostrom.png",       role: "Archivist",                expression: "neutral" },
  { slug: "hattie-bronwyn",       name: "Hattie Bronwyn",           image: "/shared/testimonials/hattie-bronwyn.png",       role: "Registered Nurse",         expression: "pleased" },
  { slug: "margot-finch",         name: "Margot Finch",             image: "/shared/testimonials/margot-finch.png",         role: "Gallery Owner",            expression: "pleased" },
  { slug: "orson-pepperdine",     name: "Orson Pepperdine",         image: "/shared/testimonials/orson-pepperdine.png",     role: "Small Business Owner",     expression: "neutral" },
  { slug: "priscilla-voss-bingham", name: "Priscilla Voss-Bingham", image: "/shared/testimonials/priscilla-voss-bingham.png", role: "Estate Executor",        expression: "stoic" },
  { slug: "rosalind-keck",        name: "Rosalind Keck",            image: "/shared/testimonials/rosalind-keck.png",        role: "Botanist",                 expression: "pleased" },
  { slug: "theodora-lindquist",   name: "Theodora Lindquist",       image: "/shared/testimonials/theodora-lindquist.png",   role: "Historian",                expression: "neutral" },
  { slug: "warren-duvall",        name: "Warren Duvall",            image: "/shared/testimonials/warren-duvall.png",        role: "Father of Three",          expression: "neutral" },

  // NEW — 10 ashamed/mortified portraits added for Seel-Tite
  { slug: "caldwell-briggs",      name: "Caldwell Briggs",          image: "/shared/testimonials/caldwell-briggs.png",      role: "Construction Foreman",     expression: "ashamed" },
  { slug: "elise-tanaka",         name: "Elise Tanaka",             image: "/shared/testimonials/elise-tanaka.png",         role: "Corporate CFO",            expression: "ashamed" },
  { slug: "rev-thomasina-oakes",  name: "Rev. Thomasina Oakes",     image: "/shared/testimonials/rev-thomasina-oakes.png",  role: "Wedding Officiant",        expression: "ashamed" },
  { slug: "capt-rourke-vallis",   name: "Capt. Rourke Vallis",      image: "/shared/testimonials/capt-rourke-vallis.png",   role: "Commercial Airline Pilot", expression: "ashamed" },
  { slug: "dr-moira-petrescu",    name: "Dr. Moira Petrescu",       image: "/shared/testimonials/dr-moira-petrescu.png",    role: "Cardiothoracic Surgeon",   expression: "ashamed" },
  { slug: "linda-morrissey",      name: "Linda Morrissey",          image: "/shared/testimonials/linda-morrissey.png",      role: "PTA Board Chair",          expression: "ashamed" },
  { slug: "coach-derrick-plum",   name: "Coach Derrick Plum",       image: "/shared/testimonials/coach-derrick-plum.png",   role: "High School Football Coach", expression: "ashamed" },
  { slug: "tamsin-kerrigan",      name: "Tamsin Kerrigan",          image: "/shared/testimonials/tamsin-kerrigan.png",      role: "Deposed Witness",          expression: "ashamed" },
  { slug: "judson-hale",          name: "Judson Hale",              image: "/shared/testimonials/judson-hale.png",          role: "Stand-Up Comic",           expression: "ashamed" },
  { slug: "margaux-sanderling",   name: "Margaux Sanderling",       image: "/shared/testimonials/margaux-sanderling.png",   role: "Local News Meteorologist", expression: "ashamed" },
]

export function getPortrait(slug: string): TestimonialPortrait | undefined {
  return testimonialPortraits.find((p) => p.slug === slug)
}

export function getPortraitsByExpression(expr: Expression): TestimonialPortrait[] {
  return testimonialPortraits.filter((p) => p.expression === expr)
}

export function getPortraitsByRole(roleContains: string): TestimonialPortrait[] {
  const q = roleContains.toLowerCase()
  return testimonialPortraits.filter((p) => p.role?.toLowerCase().includes(q))
}
