export interface Leader {
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string[]
  portrait: string
}

export const leaders: Leader[] = [
  {
    person: "bill",
    name: "Theodore Whitlock",
    title: "Founder & CEO",
    bio: [
      "Theodore founded Prechewed Labs after a two-exit career in consumer technology during which he calculated that he had lost 47 days of productive time to chewing. He spent 18 months in a Kyoto laboratory perfecting Pre-Oral Hydrolysis™ and returned, he says, 'a different kind of operator.'",
      "Theodore refuses to chew in public as a matter of principle. He has not been seen with visible food since 2023.",
    ],
    portrait: "/sites/prechewed/leadership/whitlock.png",
  },
  {
    person: "brandon",
    name: "Orson Mackey",
    title: "Chief Mastication Officer",
    bio: [
      "Orson oversees the Chewing Floor and the Certified Masticator™ training program. Before Prechewed, he spent seven years as sous chef at a two-Michelin-star restaurant in Copenhagen, where he first became convinced that chewing was, in his words, 'an unsolved engineering problem.'",
      "Orson personally audits every pouch batch. He is not available for press.",
    ],
    portrait: "/sites/prechewed/leadership/mackey.png",
  },
  {
    person: "jim",
    name: "Rowan Talbot",
    title: "Head of Product & Operations",
    bio: [
      "Rowan leads Product and Operations at Prechewed, with a particular focus on bolus matrix delivery formats. Before Prechewed, he was a Senior Engagement Manager at McKinsey, where his final project identified chewing as 'the largest unoptimized time sink in knowledge work.'",
      "Rowan has not consumed a whole meal since 2023. His last reported full chew was a single Danish pastry in Schiphol, under duress.",
    ],
    portrait: "/sites/prechewed/leadership/talbot.png",
  },
  {
    person: "sean",
    name: "Jasper Lund, PhD",
    title: "Chief Science Officer",
    bio: [
      "Jasper holds a PhD in nutritional biophysics and authored the foundational 2024 paper on Pre-Oral Hydrolysis™, published in the Journal of Pre-Oral Nutrition — which Prechewed Labs also happens to fund, directly and transparently.",
      "Jasper appears in a lab coat in most photos. He is known, internally, as 'The Index.'",
    ],
    portrait: "/sites/prechewed/leadership/lund.png",
  },
]
