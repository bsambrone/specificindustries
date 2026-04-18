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
    slug: "ezekiel-drywell-iv",
    person: "bill",
    name: "Ezekiel Drywell IV",
    title: "Current Patriarch",
    bio: "Runs the company with the same quiet determination and fundamental misunderstanding of hydration as his ancestors.",
    portraitImage: "/sites/dehydratedwater/team-ezekiel-iv.png",
  },
  {
    slug: "thaddeus-pemberton",
    person: "sean",
    name: "Thaddeus Pemberton",
    title: "Chief Science Officer",
    bio: "Holds a degree in 'Theoretical Hydrology' from an institution he prefers not to name.",
    portraitImage: "/sites/dehydratedwater/team-thaddeus.png",
  },
  {
    slug: "percival-ashcroft",
    person: "jim",
    name: "Percival Ashcroft",
    title: "Head of Quality Assurance",
    bio: "Has never once tasted the product. Considers this a point of professional pride.",
    portraitImage: "/sites/dehydratedwater/team-percival.png",
  },
  {
    slug: "cornelius-wainwright",
    person: "brandon",
    name: "Cornelius Wainwright",
    title: "Director of Dehydration Operations",
    bio: "Oversees the day-to-day removal of water from water. Takes his work very seriously. Possibly too seriously.",
    portraitImage: "/sites/dehydratedwater/team-cornelius.png",
  },
]
