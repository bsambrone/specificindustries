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
    slug: "coopersmith",
    person: "bill",
    name: "Jebediah Coopersmith",
    title: "Founder & Head Spectrum Farmer",
    bio: "Founded Grass Fed WiFi in 2014 after a growing concern that commodity bandwidth had become divorced from its pasture. Personally grazes the 900 MHz band every morning, weather permitting.",
    portraitImage: "/sites/apex/team/bill-sambrone.png",
  },
  {
    slug: "lark",
    person: "brandon",
    name: "Obadiah Lark",
    title: "Director of Pasture Operations",
    bio: "Oversees daily rotation of the co-op's frequency herds across the grazing lands. Believes that a router fed on native wildflowers sings clearer than one raised in a datacenter, and has the anecdotes to prove it.",
    portraitImage: "/sites/apex/team/member-1.png",
  },
  {
    slug: "whitlaw",
    person: "jim",
    name: "Cyrus Whitlaw",
    title: "Bandwidth Shepherd",
    bio: "Responsible for the welfare and roam pattern of the co-op's heritage-breed packets. Has personally named each of the primary uplinks. Does not allow anyone else to address them by their names.",
    portraitImage: "/sites/apex/team/member-2.png",
  },
  {
    slug: "nettleton",
    person: "sean",
    name: "Hollis Nettleton",
    title: "VP of Heritage Frequencies",
    bio: "Curates the co-op's pre-industrial frequency catalog. Can identify an improperly aged signal by ear and is, on principle, suspicious of the 5 GHz band.",
    portraitImage: "/sites/apex/team/member-3.png",
  },
]
