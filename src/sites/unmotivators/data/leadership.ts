export interface Leader {
  slug: string
  name: string
  title: string
  yearsOfService: number
  bio: string
  quote: string
  portraitImage: string
  person: "bill" | "brandon" | "jim" | "sean"
}

export const leaders: Leader[] = [
  {
    slug: "holden-marsham",
    name: "Holden Marsham",
    title: "Chief Disappointment Officer",
    yearsOfService: 14,
    bio: "Holden founded Unmotivators Inc. in 2012 after the collapse of his motivational-speaking career, which ended during a conference keynote in Sarasota when, three minutes in, he stopped and told the audience the truth. The audience did not clap. He walked off the stage and, eventually, to here. He has not spoken at a conference since. He attends meetings. He signs paperwork. He does not remember why he started the company, but the company continues, and so does he.",
    quote: "Motivation is a product. We just make an honest one.",
    portraitImage: "/sites/unmotivators/leaders/holden-marsham.png",
    person: "bill",
  },
  {
    slug: "russell-atholton",
    name: "Russell Atholton",
    title: "VP of Unmet Potential",
    yearsOfService: 11,
    bio: "Russell joined Unmotivators Inc. in 2015 as a product manager. He has not been promoted. He has not been demoted. His annual performance review has used the same language since 2018, and he has not asked about it. He manages a team of four, though one of them transferred quietly last November, and the org chart has not been updated. His office has a plant that may or may not be real. He prefers not to check.",
    quote: "Ambition is a subscription. I canceled mine in 2019.",
    portraitImage: "/sites/unmotivators/leaders/russell-atholton.png",
    person: "brandon",
  },
  {
    slug: "dennis-kelwick",
    name: "Dennis Kelwick",
    title: "Director of Managed Expectations",
    yearsOfService: 9,
    bio: "Dennis is responsible for lowering the expectations of staff, customers, and the board. He runs a quarterly review process in which every number is restated downward, with a footnote. The footnote is always the same footnote. He has a desk. His office has a window. The blinds are usually closed. He attends all-hands meetings. He does not speak during them. He would like this bio to end.",
    quote: "If you give people less to hope for, they grieve less when it doesn't happen.",
    portraitImage: "/sites/unmotivators/leaders/dennis-kelwick.png",
    person: "jim",
  },
  {
    slug: "mitchell-pardove",
    name: "Mitchell Pardove",
    title: "Head of Burnout Operations",
    yearsOfService: 12,
    bio: "Mitchell oversees Unmotivators Inc.'s commitment to sustainable disappointment. He runs an internal program called Preserved Exhaustion, which identifies employees whose weariness is the most authentic and institutionalizes them. He himself was institutionalized in 2017. He has not taken a vacation since. He does not know what he would do with one. He has a pair of shoes by the door. He will wear them again, probably, soon.",
    quote: "Burnout is a resource. We manage it the way some companies manage water.",
    portraitImage: "/sites/unmotivators/leaders/mitchell-pardove.png",
    person: "sean",
  },
]

export function getLeaderBySlug(slug: string): Leader | undefined {
  return leaders.find((l) => l.slug === slug)
}
