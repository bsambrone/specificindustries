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
    slug: "ashcroft",
    person: "bill",
    name: "Desmond Ashcroft",
    title: "Founder & Chief Disappointment Officer",
    bio: "Founded Meh. in 2019 after a long, increasingly disillusioning career in consumer electronics. Oversees all product direction. Rarely smiles. Never overpromises.",
    portraitImage: "/sites/meh/team-founder.png",
  },
  {
    slug: "peveril",
    person: "brandon",
    name: "Roland Peveril",
    title: "President of Lowered Expectations",
    bio: "Joined in 2020 from a senior role at a more aspirational company. Manages day-to-day operations and most things that Desmond prefers not to manage. Believed to own the company's only remaining enthusiasm.",
    portraitImage: "/sites/meh/team-president.png",
  },
  {
    slug: "ellsworth",
    person: "jim",
    name: "Warren Ellsworth",
    title: "VP of Affective Underdelivery",
    bio: "Leads the engineering team. Responsible for calibrating the precise shortfall in every device. Considers the work largely complete, though he maintains there is always further to go.",
    portraitImage: "/sites/meh/team-vp.png",
  },
  {
    slug: "marlowe",
    person: "sean",
    name: "Julian Marlowe",
    title: "Head of Ambient Sighs",
    bio: "Oversees the sound design of all auditory elements — the sighs, the ohs, the single soft tones. Formerly a voice actor. Prefers to work in silence.",
    portraitImage: "/sites/meh/team-ambient.png",
  },
]
