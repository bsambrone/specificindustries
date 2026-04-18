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
    slug: "walter-hardcastle",
    person: "bill",
    name: 'General (Ret.) Walter "Wally" Hardcastle',
    title: "Founder & Chief Morale Officer",
    bio: "General Hardcastle served 38 years across 4 continents, 11 commands, and 2,400 PowerPoint briefings. He retired in 2019 and has since dedicated his life to the conviction that morale can be purchased. He founded Squared Away Supply Co. from his basement, which is carpeted in safety-brief handouts.",
    portraitImage: "/sites/squaredaway/leadership-hardcastle.png",
  },
  {
    slug: "preston-blackwell",
    person: "brandon",
    name: "Admiral (Ret.) Preston Blackwell III",
    title: "Chief Seamanship Officer",
    bio: "Admiral Blackwell commanded three Nimitz-class carriers, two destroyer squadrons, and one very large aquarium. He is responsible for procurement of the Goat Locker™ Soap, which he believes should have been an MWR priority for decades. He lives on a boat. Of course he does.",
    portraitImage: "/sites/squaredaway/leadership-blackwell.png",
  },
  {
    slug: "tucker-lindgren",
    person: "jim",
    name: "Colonel (Ret.) Tucker Lindgren",
    title: "VP of Premium Experience",
    bio: "Colonel Lindgren flew 2,100 hours in the C-17 and 4,800 hours in business class. He led the product design team for the Qatar Package™ and personally certified every thread count in the Cashmere Loungewear line. He insists the PT medal is ironic. It is not.",
    portraitImage: "/sites/squaredaway/leadership-lindgren.png",
  },
  {
    slug: "huxley-maddox",
    person: "sean",
    name: 'Sergeant Major Huxley "Hux" Maddox',
    title: "Director of Oorah Operations",
    bio: "Sergeant Major Maddox enlisted at 17, deployed seven times, and has never once lowered his volume. He oversees the Marine product line personally, from the Culinary Coloring Sticks™ to the MARPAT Throw Pillow Set, and conducts all customer service calls in second person, imperative mood.",
    portraitImage: "/sites/squaredaway/leadership-maddox.png",
  },
]
