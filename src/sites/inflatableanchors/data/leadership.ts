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
    slug: "hawkwind",
    person: "bill",
    name: "Captain Edmund Hawkwind",
    title: "Founder & Chief Buoyancy Officer",
    bio: "A former maritime pilot who founded Inflatable Anchors Marine in 2011 after one final, exhausting weigh-anchor off the coast of Maine. Still personally tests every new model in a heated pool in his garage.",
    portraitImage: "/sites/apex/team/bill-sambrone.png",
  },
  {
    slug: "copper",
    person: "brandon",
    name: "Nathaniel Copper",
    title: "VP of Retrieval Engineering",
    bio: "Oversees the design of the proprietary rapid-deflation valve. Personally owns the record for fastest anchor retrieval in a boater-supervised trial. Does not discuss the unsupervised trials.",
    portraitImage: "/sites/apex/team/member-1.png",
  },
  {
    slug: "ballast",
    person: "sean",
    name: "Winston Ballast",
    title: "Director of Inflation Standards",
    bio: "Maintains the tolerance specification for every anchor in the catalog. Has personally inflated more anchors than any human in history, a fact he does not enjoy mentioning.",
    portraitImage: "/sites/apex/team/member-3.png",
  },
  {
    slug: "driftwood",
    person: "jim",
    name: "Oscar Driftwood",
    title: "Head of Customer Harbor Relations",
    bio: "Handles customer feedback, warranty claims, and the occasional recovery operation. Has appeared on three marine podcasts, all of them unsolicited.",
    portraitImage: "/sites/apex/team/member-2.png",
  },
]
