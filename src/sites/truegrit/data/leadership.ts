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
    slug: "dale",
    person: "bill",
    name: "Dale",
    title: "Founder & Chief Abrasion Officer",
    bio: "Saw a gap in the market while renovating his bathroom. 'What if the thing that cleans surfaces could clean ALL surfaces?' he asked. No one answered, but he built a company anyway.",
    portraitImage: "/sites/truegrit/team-bill.png",
  },
  {
    slug: "gary",
    person: "brandon",
    name: "Gary",
    title: "VP of Grit Sciences",
    bio: "Former materials engineer with a specialty in industrial abrasives. Joined True Grit after Dale described the vision. Gary's expression during that conversation has not changed since.",
    portraitImage: "/sites/truegrit/team-jim.png",
  },
  {
    slug: "hank",
    person: "jim",
    name: "Hank",
    title: "Director of Consumer Endurance",
    bio: "Oversees the customer experience from first contact through recovery. Interprets complaint letters as 'testimonials of effectiveness.' Has a wall of them.",
    portraitImage: "/sites/truegrit/team-brandon.png",
  },
  {
    slug: "chet",
    person: "sean",
    name: "Chet",
    title: "Head of Industrial Relations",
    bio: "Bridges the gap between the construction industry and personal hygiene. Negotiates bulk abrasive contracts with suppliers who always ask what it's for. Chet has learned not to answer.",
    portraitImage: "/sites/truegrit/team-sean.png",
  },
]
