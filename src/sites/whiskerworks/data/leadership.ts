export interface Leader {
  slug: string
  name: string
  title: string
  bio: string
  portrait: string
  person: "bill" | "brandon" | "jim" | "sean"
}

export const leaders: Leader[] = [
  {
    slug: "chancellor",
    name: "Cornelius Whitfield",
    title: "Chancellor & Founder",
    bio: "Cornelius founded Whiskerworks in 2019 above a Spirit Halloween on Route 9. He had spent the previous decade in mid-tier trade-school administration and, during one particularly bleak quarterly meeting, 'saw a need for something specifically feline.' He describes the institution's mission as 'vocational, ambitious, and not currently under investigation.' He signs every diploma personally.",
    portrait: "/sites/whiskerworks/leaders/bill.png",
    person: "bill",
  },
  {
    slug: "provost",
    name: "Garrett Marsh",
    title: "Provost",
    bio: "Garrett oversees academic affairs across all six divisions. He has previously founded three trade schools, all now closed, which he describes as 'completed pilot programs.' He joined Whiskerworks in 2021 after a successful interview he conducted alone in the parking lot. He favors lanyards over ties.",
    portrait: "/sites/whiskerworks/leaders/brandon.png",
    person: "brandon",
  },
  {
    slug: "dean-blackbook",
    name: "Russell Coleman",
    title: "Dean of the Blackbook Division",
    bio: "Russell does not grant interviews. His bio, per institutional policy, is mostly redacted. What is known: he was hired in 2020, occupies Suite 208's northeast office, and has never once been seen on a Tuesday.",
    portrait: "/sites/whiskerworks/leaders/jim.png",
    person: "jim",
  },
  {
    slug: "cfo",
    name: "Vincent Dunn",
    title: "Chief Financial Officer",
    bio: "Vincent joined Whiskerworks from a mid-tier regional lender where he specialized in 'flexible amortization.' He is the architect of the 24-easy-payments tuition plan. Asked whether the math adds up, he responded: 'The math works for us, which is the math that matters.' He declines to elaborate.",
    portrait: "/sites/whiskerworks/leaders/sean.png",
    person: "sean",
  },
]

export function getLeaderBySlug(slug: string): Leader | undefined {
  return leaders.find((l) => l.slug === slug)
}
