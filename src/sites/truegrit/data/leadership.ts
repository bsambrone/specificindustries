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
    slug: "hackett",
    person: "bill",
    name: "Silas Hackett",
    title: "Founder & Chief Abrasive Officer",
    bio: "Founded True Grit Personal Care in 1998 after his grandfather's observation that modern personal cleansing products had gone soft in an unrecoverable way. Personally tests every new grit on himself, weekly.",
    portraitImage: "/sites/apex/team/bill-sambrone.png",
  },
  {
    slug: "stonewall",
    person: "brandon",
    name: "Bruno Stonewall",
    title: "VP of Grit Engineering",
    bio: "Oversees grit specification and the proprietary mineral-sourcing process. Personally owns the grading rubric for every grit in the catalog. Does not subcontract the grading.",
    portraitImage: "/sites/apex/team/member-3.png",
  },
  {
    slug: "brimstone",
    person: "jim",
    name: "Otis Brimstone",
    title: "Director of Applications",
    bio: "Manages the applied-use lab where every product is tested against real-world personal cleansing scenarios. Has developed a personal tolerance that no laboratory has been able to reproduce.",
    portraitImage: "/sites/apex/team/member-2.png",
  },
  {
    slug: "grindle",
    person: "sean",
    name: "Dwight Grindle",
    title: "Head of Cleansing Products",
    bio: "Responsible for the product line, packaging, and end-user safety warnings. Personally drafts every warning label. The lawyers have learned not to revise them.",
    portraitImage: "/sites/apex/team/member-1.png",
  },
]
