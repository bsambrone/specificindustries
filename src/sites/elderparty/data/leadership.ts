// src/sites/elderparty/data/leadership.ts

export interface PartyOfficial {
  slug: string
  name: string
  title: string
  bio: string
  highlights: { label: string; value: string }[]
  quote: string
  image: string
  referencePerson: string
}

export const officials: PartyOfficial[] = [
  {
    slug: "cthulhu-rlyeh",
    name: "Cthulhu R'lyeh",
    title: "Founder & Party Leader",
    bio: "Has waited millennia to serve this great nation. Emerged from the Pacific with a vision for America's future that transcends the petty squabbles of mortal politics. Previous experience includes dreaming beneath the waves for eons, inspiring civilizations, and maintaining a consistent approval rating among coastal populations. Believes that true leadership means being willing to wait — and that the wait is over.",
    highlights: [
      { label: "Years of experience", value: "Immeasurable" },
      { label: "Previous office held", value: "Sovereign of R'lyeh (current)" },
      { label: "Campaign slogan", value: "A Return to Older Values" },
      { label: "Key policy", value: "R'lyeh Rising Initiative" },
      { label: "Favorite American tradition", value: "The peaceful transfer of power (finally, to us)" },
    ],
    quote: "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn. In his house at R'lyeh, dead Cthulhu waits dreaming. But not for much longer.",
    image: "/sites/elderparty/team-bill.png",
    referencePerson: "bill",
  },
  {
    slug: "nyarlathotep-marsh",
    name: "Nyarlathotep Marsh",
    title: "Campaign Chairman",
    bio: "A thousand faces, one message. Has run campaigns across dimensions and always delivers results. Voters describe him as 'impossible to forget,' which his team considers the highest compliment in politics. Joined the Elder Party at its founding — or possibly before its founding, depending on which timeline you reference. His smile has been described as 'photogenic' and 'containing too many teeth,' both of which he takes as compliments.",
    highlights: [
      { label: "Campaigns managed", value: "Countless (literally)" },
      { label: "Win rate", value: "100% across all dimensions" },
      { label: "Faces", value: "A thousand (minimum)" },
      { label: "Key strength", value: "Voter persuasion" },
      { label: "Notable achievement", value: "50-state field office rollout (overnight)" },
    ],
    quote: "I don't convince voters. I remind them of what they already know. Deep down, everyone knows.",
    image: "/sites/elderparty/team-brandon.png",
    referencePerson: "brandon",
  },
  {
    slug: "dagon-whately",
    name: "Dagon Whately",
    title: "Policy Director",
    bio: "Third-generation Innsmouth resident. Georgetown Law (class of 1847). Authored the Deep Ones Job Creation Act and the Shoggoth Personhood Amendment. Breathes underwater, which he insists is not relevant to his qualifications but which has proven useful during coastal campaign events. His policy briefings are described as 'thorough, well-sourced, and occasionally damp.'",
    highlights: [
      { label: "Education", value: "Georgetown Law, Class of 1847" },
      { label: "Legislation authored", value: "Deep Ones Job Creation Act, Shoggoth Personhood Amendment" },
      { label: "Specialty", value: "Interdimensional regulatory compliance" },
      { label: "Breathing medium", value: "Air and water (versatile)" },
      { label: "Policy papers published", value: "47 (12 in languages that don't have names yet)" },
    ],
    quote: "Good policy is good policy, whether you're reading it above or below the waterline.",
    image: "/sites/elderparty/team-jim.png",
    referencePerson: "jim",
  },
  {
    slug: "hastur-olmstead",
    name: "Hastur Olmstead",
    title: "Volunteer Coordinator & Field Director",
    bio: "Wherever two or more gather to canvass, he is there. Organizes rallies that attendees describe as 'life-changing' and 'impossible to leave.' His volunteer recruitment numbers consistently exceed projections by 300%, which he attributes to 'a personal connection with every volunteer' — a claim that is technically true, though the nature of that connection remains difficult to articulate. Do not ask about the Yellow Sign.",
    highlights: [
      { label: "Volunteers recruited", value: "200,000+ (and counting)" },
      { label: "Rally attendance record", value: "Every seat filled, every time" },
      { label: "Field offices opened", value: "All of them" },
      { label: "Volunteer retention rate", value: "100% (they don't leave)" },
      { label: "The Yellow Sign", value: "Do not ask" },
    ],
    quote: "Volunteering isn't something you do. It's something you become. The campaign doesn't need your time — it needs you.",
    image: "/sites/elderparty/team-sean.png",
    referencePerson: "sean",
  },
]

export function getOfficialBySlug(slug: string): PartyOfficial | undefined {
  return officials.find((o) => o.slug === slug)
}
