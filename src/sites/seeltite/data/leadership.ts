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
    bio: "Walt founded Seel-Tite in his father's machine shop in 1973. Forty-plus years later, he still reviews every Port Specification revision personally. He does not take meetings before 10:00 AM. He does not take meetings after 16:00. In between, he is in the shop.",
    portraitImage: "/sites/seeltite/leader-thorne.png",
  },
  {
    slug: "hadley",
    person: "brandon",
    name: "Marcus Hadley",
    title: "Head of Seal Engineering",
    bio: "Marcus joined Seel-Tite from the aerospace sealing sector in 2011. He is the author of the OPX-14 port standard and has personally signed off on every gasket durometer change since 2013. He does not speak during staff meetings. He does speak when the gasket does.",
    portraitImage: "/sites/seeltite/leader-hadley.png",
  },
  {
    slug: "boecker",
    person: "jim",
    name: "Jim Boecker",
    title: "VP of Disposal Systems",
    bio: "Jim runs the accessory division. Grinder, Salad Shooter, Cryo-Puck, Incinerator — all three-letter product codes pass through his desk before the mold tooling is cut. He owns the original Presto Salad Shooter that inspired the attachment. It sits on a shelf behind his chair.",
    portraitImage: "/sites/seeltite/leader-boecker.png",
  },
  {
    slug: "castellan",
    person: "sean",
    name: "Dale Castellan",
    title: "Director of Predictive Alerts",
    bio: "Dale heads the Telemetry program. He joined in 2019 after eleven years in industrial IoT. He is responsible for the 4-to-12-second predictive alert window, the haptic pattern library, and the iOS and Android companion applications. He does not carry a smartphone off-hours.",
    portraitImage: "/sites/seeltite/leader-castellan.png",
  },
]
