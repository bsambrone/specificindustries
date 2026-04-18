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
    slug: "thistlewood",
    person: "bill",
    name: "Ambrose Thistlewood",
    title: "Founder & Chief Hydration Scientist",
    bio: "Established Dehydrated Water Laboratories in 1847 on a singular belief: the essence of water could be preserved without the water itself. Still signs every new batch of dehydrated water, when asked to do so.",
    portraitImage: "/sites/apex/team/bill-sambrone.png",
  },
  {
    slug: "blackwood",
    person: "brandon",
    name: "Percival Blackwood",
    title: "Director of Powder Engineering",
    bio: "Joined the Laboratories in 2004 following fifteen years in industrial desiccation. Personally oversees the crystalline uniformity of every packet. Claims to have never tasted reconstituted water, for reasons he declines to elaborate.",
    portraitImage: "/sites/apex/team/member-1.png",
  },
  {
    slug: "dunhaven",
    person: "jim",
    name: "Roger Dunhaven",
    title: "VP of Dehydration Research",
    bio: "Leads the Laboratories' ongoing scientific investigation into what water would be, if it were not present. His unpublished 2018 whitepaper remains on his desk, unfinished, by design.",
    portraitImage: "/sites/apex/team/member-2.png",
  },
  {
    slug: "ashcroft",
    person: "sean",
    name: "Wilbur Ashcroft",
    title: "Head of Just-Add-Water Integration",
    bio: "Came to the Laboratories in 2017 to modernize the just-add-water instruction card. Owns the tone, type setting, and paper stock of every packet. Still uses a typewriter at home, on weekends.",
    portraitImage: "/sites/apex/team/member-3.png",
  },
]
