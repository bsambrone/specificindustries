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
    slug: "william-goldsworth",
    person: "bill",
    name: "William R. Goldsworth",
    title: "Founder & Chief Executive",
    bio: "Founded the firm in 1987 with a thesis that remains unchanged. Previously a commodities analyst at a firm he does not name. Holds a personal position in all three instruments.",
    portraitImage: "/sites/rocks/team-bill.png",
  },
  {
    slug: "marcus-ashcroft",
    person: "brandon",
    name: "Marcus T. Ashcroft",
    title: "Chief Acquisition Officer",
    bio: "Leads terrestrial sourcing operations. Maintains relationships with the firm's proprietary extraction partners. Formerly in industrial procurement; his current role is not meaningfully different.",
    portraitImage: "/sites/rocks/team-brandon.png",
  },
  {
    slug: "lawrence-stonebridge",
    person: "jim",
    name: "Lawrence V. Stonebridge",
    title: "Director, Vault Operations",
    bio: "Responsible for the Class III custody facility and its attestation ledger. Holds the only physical key. Has not taken a day off since 2019, which the firm considers a positive indicator of operational focus.",
    portraitImage: "/sites/rocks/team-jim.png",
  },
  {
    slug: "douglas-pennington",
    person: "sean",
    name: "Douglas F. Pennington",
    title: "Head of Bedrock Research",
    bio: "Oversees internal research on long-dated lithic assets. Publications include several unpublished memoranda. His sole public statement on firm strategy: 'We are long rocks.'",
    portraitImage: "/sites/rocks/team-sean.png",
  },
]
