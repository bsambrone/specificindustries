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
    slug: "hoggett",
    person: "bill",
    name: "Eustace Hoggett",
    title: "Founder & Master Pig-Dairyman",
    bio: "Founded Pig Milk Creamery in 2008 after an observation he has declined to elaborate on. Personally milks every Sunday, regardless of season. Has won no awards, and does not expect to.",
    portraitImage: "/sites/apex/team/bill-sambrone.png",
  },
  {
    slug: "troughton",
    person: "jim",
    name: "Oliver Troughton",
    title: "VP of Swine Milk Yield",
    bio: "Leads the creamery's continuous improvement program in per-sow yield. Holds the unofficial record for consecutive morning milkings without injury, a fact he reviews monthly.",
    portraitImage: "/sites/apex/team/member-2.png",
  },
  {
    slug: "snoot",
    person: "sean",
    name: "Albert Snoot",
    title: "Director of Dairy Porcine Operations",
    bio: "Responsible for sow welfare, diet formulation, and the creamery's unique music-during-milking protocol. Prefers Chopin. The sows appear to agree.",
    portraitImage: "/sites/apex/team/member-1.png",
  },
  {
    slug: "wallow",
    person: "brandon",
    name: "Cedric Wallow",
    title: "Head of Creamery Standards",
    bio: "Oversees the creamery's single-origin pig milk classification system. The system is not recognized by any regulatory body, which he considers an asset.",
    portraitImage: "/sites/apex/team/member-3.png",
  },
]
