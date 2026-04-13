// src/sites/pettential/data/leadership.ts
export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  referencePerson: "bill" | "brandon" | "jim" | "sean"
}

export const executives: Executive[] = [
  {
    slug: "ceo",
    name: "Greyson Holt",
    title: "Chief Evolution Officer",
    bio: "Greyson founded Pettential after a goldfish stared at him during a particularly bad quarterly review and he saw, in that unblinking gaze, untapped potential. He left management consulting the next day to pursue a vision: every animal, regardless of species, limb count, or cognitive capacity, deserves a performance plan. He has since served over 10,000 animals. None have improved. He considers this 'a baseline we can build from.'",
    quote: "Every animal has potential. We just haven't figured out how to unlock it. And we may never. But we sell the tools.",
    image: "/sites/pettential/exec-ceo.png",
    referencePerson: "bill",
  },
  {
    slug: "cto",
    name: "Marshall Vane",
    title: "Chief Training Officer",
    bio: "Marshall built Pettential's proprietary performance tracking platform, which has successfully detected no change across 10,000 animals over six years. Previously led R&D at a fitness wearable company, where he realized humans were 'too easy — they actually respond to stimuli.' Holds 3 patents on immeasurable outcomes and a pending patent on 'quantifying stagnation as a service.'",
    quote: "The data doesn't lie. It just doesn't say anything.",
    image: "/sites/pettential/exec-cto.png",
    referencePerson: "brandon",
  },
  {
    slug: "coo",
    name: "Barrett Sinclair",
    title: "Chief Optimization Officer",
    bio: "Barrett oversees all six performance divisions simultaneously from a standing desk in a windowless office. He has never seen an animal in person and manages entirely through dashboards that show flat lines. He interprets the flat lines as 'consistent performance' and has built an entire operational framework around this interpretation. His quarterly all-hands meetings are attended by no animals.",
    quote: "Operational excellence is the absence of deviation. By that measure, every animal we serve is a top performer.",
    image: "/sites/pettential/exec-coo.png",
    referencePerson: "jim",
  },
  {
    slug: "vp-aquatic",
    name: "Reed Calloway",
    title: "VP of Aquatic Performance",
    bio: "Reed is a marine biologist turned performance coach who spent 4 years developing the Goldfish Treadmill. The goldfish did not notice. He has published zero peer-reviewed papers but maintains a personal blog with 11 subscribers (9 are bots). His mantra is 'The data speaks for itself,' though the data has been silent for the entirety of his tenure.",
    quote: "The data speaks for itself. It does not.",
    image: "/sites/pettential/exec-vp-aquatic.png",
    referencePerson: "sean",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}
