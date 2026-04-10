export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  referencePerson: string
}

export const executives: Executive[] = [
  {
    slug: "pemberton",
    name: "Harold Pemberton",
    title: "Founder & Chief Inventor",
    bio: "Harold invented Mousetrap Jenga in his Cedar Rapids basement in 1978 after concluding that 'regular Jenga simply wasn't exciting enough.' A third-generation Iowan and self-taught spring engineer, Harold still personally approves every production run that leaves the factory. He has been married to the same woman since 1973 and still has most of his fingers.",
    quote: "If it doesn't make your grandmother gasp, it's not a real toy.",
    image: "/sites/mousetrapjenga/exec-pemberton.png",
    referencePerson: "bill",
  },
  {
    slug: "wickham",
    name: "Delbert Wickham",
    title: "VP of Research & Trap Development",
    bio: "A third-generation spring engineer from Scranton, Delbert joined Mousetrap Jenga in 1982 and has personally sourced every steel trap the company has ever sold. He works out of the R&D lab in the factory basement, where he has been known to test-fire every shipment by hand. He prefers his traps 'angry' and once described a defective unit as 'frankly, disappointingly merciful.'",
    quote: "We don't make 'safe' traps. We make 'honest' traps.",
    image: "/sites/mousetrapjenga/exec-wickham.png",
    referencePerson: "brandon",
  },
  {
    slug: "abernathy",
    name: "Morty Abernathy",
    title: "VP of Playtesting & Quality Assurance",
    bio: "Morty has personally playtested every edition Mousetrap Jenga has released since 1982. Father of three, 'owner' of eight fingers, and holder of the 1987 'four consecutive turns without injury' record that still stands today, he is the living heart of our quality assurance program. He refuses to discuss how the 1987 record attempt ended.",
    quote: "Every champion has a story. Mine has several appendages in it.",
    image: "/sites/mousetrapjenga/exec-abernathy.png",
    referencePerson: "jim",
  },
  {
    slug: "fink",
    name: "Eugene Fink",
    title: "VP of Safety & Customer Joy",
    bio: "Eugene Fink joined Mousetrap Jenga in 1989 and has been the guardian of our safety program ever since. He keeps the company first-aid station fully stocked at all times and maintains cordial relationships with emergency rooms in a twelve-county radius. Eugene believes every American family deserves the right to lose a digit together, and he's made it his life's mission to ensure they do so with a smile.",
    quote: "Safety isn't about avoiding injury. It's about having the bandages ready!",
    image: "/sites/mousetrapjenga/exec-fink.png",
    referencePerson: "sean",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}
