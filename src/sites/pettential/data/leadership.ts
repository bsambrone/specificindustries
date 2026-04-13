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
  {
    slug: "vp-serpent",
    name: "Sloane Whitaker",
    title: "VP of Serpent Workplace Solutions",
    bio: "Sloane is a former HR director who 'saw a gap in the limbless professional market' and has spent the last five years filling it with products snakes cannot use. She designed the Handshake Simulation Device after a particularly awkward client meeting where a snake was present. She has never successfully shaken hands with a snake, though she describes several attempts as 'promising.'",
    quote: "Professionalism is not a limb-dependent quality. That's our whole thesis.",
    image: "/sites/pettential/exec-vp-serpent.png",
    referencePerson: "bill",
  },
  {
    slug: "vp-avian",
    name: "Kendrick Ashby",
    title: "VP of Avian Professional Development",
    bio: "Kendrick is a career counselor specializing in non-verbal communicators. He created the Parrot Resume Optimization Suite after a parrot repeated his LinkedIn summary back to him verbatim during a client session. He considers this 'a breakthrough in reflective interviewing.' His department has placed zero birds in professional roles, which he attributes to 'market conditions.'",
    quote: "Birds are the most underemployed demographic in the modern workforce. We're changing that. Slowly. Not at all, actually.",
    image: "/sites/pettential/exec-vp-avian.png",
    referencePerson: "brandon",
  },
  {
    slug: "vp-reptile",
    name: "Colton Draper",
    title: "VP of Reptile Fitness & Mobility",
    bio: "Colton is a personal trainer who was 'tired of clients showing up.' He found reptiles 'refreshingly consistent' in their refusal to engage with any form of exercise. The Tortoise HIIT Program is his magnum opus — a 12-week training plan that has produced zero measurable results across 400 tortoises. He considers each one 'a data point in a larger story we haven't finished telling.'",
    quote: "Results remain pending. They have been pending for four years. This is the process.",
    image: "/sites/pettential/exec-vp-reptile.png",
    referencePerson: "jim",
  },
  {
    slug: "vp-farm",
    name: "Weston Mercer",
    title: "VP of Farm Animal Lifestyle",
    bio: "Weston is a lifestyle influencer who pivoted to livestock after his personal brand peaked at 847 followers. He believes every cow deserves a morning routine and every chicken deserves noise-canceling headphones. He launched the Goat Personal Branding Course after watching a goat eat a business card at a networking event. 'They're hungry for it,' he said, misreading the situation entirely.",
    quote: "Every animal deserves a morning routine. Even the ones that wake up at 4am and scream.",
    image: "/sites/pettential/exec-vp-farm.png",
    referencePerson: "sean",
  },
  {
    slug: "vp-corporate",
    name: "Ainsley Whitmore",
    title: "VP of Corporate Pets Division",
    bio: "Ainsley is a Silicon Valley expat who brought startup culture to household pets. She created LinkedIn Premium for Cats after her own cat walked across her keyboard and accidentally endorsed 14 people for 'strategic thinking.' She interpreted this as 'proof of latent professional instinct' and has not been dissuaded. Her division has the highest revenue and the lowest animal participation rate in the company.",
    quote: "Pets are the last untapped workforce. They live in our homes. They attend our meetings. It's time they contributed.",
    image: "/sites/pettential/exec-vp-corporate.png",
    referencePerson: "bill",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}
