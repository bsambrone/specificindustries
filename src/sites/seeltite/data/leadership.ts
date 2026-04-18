export interface Leader {
  slug: "thorne" | "hadley" | "boecker" | "castellan"
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string
  portraitImage: string
}

export const leaders: Leader[] = [
  {
    slug: "thorne",
    person: "bill",
    name: "Walter Thorne",
    title: "Founder & Chief Containment Officer",
    bio: "Walt started the company in 1973 because he had a bad week. He made one gasket. It worked. He made another. That one worked too. Fifty-two years later he still signs every port-spec revision, and he still thinks the right answer to most gambles is \"don't force it.\"",
    portraitImage: "/sites/seeltite/leader-thorne.png",
  },
  {
    slug: "hadley",
    person: "brandon",
    name: "Marcus Hadley",
    title: "Head of Seal Engineering",
    bio: "Marcus owns the seal. Every durometer change, every revision of the silicone recipe, every micrometer of tolerance on the OPX-14 port — he signed it. Quiet in meetings. Loud when the spec is wrong. If the gasket holds, Marcus is why.",
    portraitImage: "/sites/seeltite/leader-hadley.png",
  },
  {
    slug: "boecker",
    person: "jim",
    name: "Jim Boecker",
    title: "VP of Disposal Systems",
    bio: "Jim runs the ten accessories. He bought a vintage Presto Salad Shooter in 1987 because he liked the mechanism; thirty-eight years later the Salad Shooter Attachment is the catalog's second-best seller. Jim is the reason we have more than one way to handle a losing gamble.",
    portraitImage: "/sites/seeltite/leader-boecker.png",
  },
  {
    slug: "castellan",
    person: "sean",
    name: "Dale Castellan",
    title: "Director of Predictive Alerts",
    bio: "Dale built the Telemetry Module. The reason you get a haptic alert four to twelve seconds before a likely event is Dale's statistics work. He does not carry a smartphone on weekends, which is the highest compliment we can pay the product he built.",
    portraitImage: "/sites/seeltite/leader-castellan.png",
  },
]
