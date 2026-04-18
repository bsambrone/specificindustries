export interface Leader {
  slug: string
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string
  portraitImage: string
}

export const leaders: Leader[] = [
  {
    slug: "earl-hogsworth",
    person: "bill",
    name: "Earl Hogsworth",
    title: "Founder & Chief Pig Milking Officer",
    bio: "Started this whole thing by accident. Refuses to admit it was a mistake.",
    portraitImage: "/sites/pigmilk/team-earl.png",
  },
  {
    slug: "burt-sloppington-iii",
    person: "jim",
    name: "Burt Sloppington III",
    title: "VP of Pig Relations",
    bio: "Has a way with pigs. The pigs have not confirmed this.",
    portraitImage: "/sites/pigmilk/team-burt.png",
  },
  {
    slug: "chet-trotsworth",
    person: "sean",
    name: "Chet Trotsworth",
    title: "Head of Marketing & Pig Whispering",
    bio: "Convinced the world needs pig milk. Still working on convincing his family.",
    portraitImage: "/sites/pigmilk/team-chet.png",
  },
  {
    slug: "dale-gristle",
    person: "brandon",
    name: "Dale Gristle",
    title: "Quality Assurance (Taster)",
    bio: "Has tasted more pig milk than any human alive. His expression says it all.",
    portraitImage: "/sites/pigmilk/team-dale.png",
  },
]
