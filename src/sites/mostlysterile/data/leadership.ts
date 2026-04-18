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
    slug: "halvorsen",
    person: "bill",
    name: "Dr. Theodore Halvorsen",
    title: "Founder & Chief Medical Officer",
    bio: "Founded Mostly Sterile in 2014 on a pragmatic conviction: perfect sterility is a luxury that pricing out most of the market. Holds an MD (unrestored) and has been reliably present at every surplus auction in the region.",
    portraitImage: "/sites/apex/team/bill-sambrone.png",
  },
  {
    slug: "braddock",
    person: "brandon",
    name: "Mitchell Braddock",
    title: "VP of Approximately Sterile Operations",
    bio: "Oversees the inventory floor and the proprietary 'good-enough' audit process. Personally signs off on any lot that passes at least three of the four standard sterility checks.",
    portraitImage: "/sites/apex/team/member-3.png",
  },
  {
    slug: "finch",
    person: "jim",
    name: "Harold Finch",
    title: "Director of Surgical Surplus",
    bio: "Manages acquisition of hospital-surplus instruments and PPE. Personally drives the acquisition van on weekends. Will not answer questions about the van's prior uses.",
    portraitImage: "/sites/apex/team/member-2.png",
  },
  {
    slug: "prescott",
    person: "sean",
    name: "Quentin Prescott",
    title: "Head of Hospital Relations",
    bio: "Handles institutional customer relations, clinician training support, and the written responses to all regulatory inquiries. Has personally drafted 340 such responses, none of which have produced a follow-up.",
    portraitImage: "/sites/apex/team/member-1.png",
  },
]
