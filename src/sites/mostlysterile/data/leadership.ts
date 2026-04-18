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
    slug: "charlton-harrow",
    person: "bill",
    name: "Charlton L. Harrow",
    title: "Founder & Chief Executive",
    bio: "Lapsed pre-med student and the original vision behind Mostly Sterile. Founded the company in 2014 from a self-storage unit off Route 9. Retains his original apron.",
    portraitImage: "/sites/mostlysterile/team-founder.png",
  },
  {
    slug: "wendell-dobrushkin",
    person: "brandon",
    name: "Wendell M. Dobrushkin",
    title: "Chief Financial Officer",
    bio: "Handles the money. Joined Mostly Sterile in 2017 after an independent career in adjacent financial roles which he considers to be substantially similar to this one.",
    portraitImage: "/sites/mostlysterile/team-cfo.png",
  },
  {
    slug: "hollis-vossler",
    person: "jim",
    name: "Hollis R. Vossler",
    title: "Chief Medical Officer",
    bio: "Unaffiliated with any American Medical Association. Provides day-to-day clinical oversight to the extent feasible and is available for consultation during regular business hours, where available.",
    portraitImage: "/sites/mostlysterile/team-cmo.png",
  },
  {
    slug: "roderick-ashbee-chen",
    person: "sean",
    name: "Roderick V. Ashbee-Chen",
    title: "Head of Compliance",
    bio: "New hire. Started recently. Responsibilities include reviewing our existing practices and flagging items for further review, as well as general onboarding. Continues to settle in.",
    portraitImage: "/sites/mostlysterile/team-compliance.png",
  },
]
