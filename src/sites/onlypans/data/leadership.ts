export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  person: "bill" | "brandon" | "jim" | "sean"
}

export const executives: Executive[] = [
  {
    slug: "pennington",
    name: "Bill Pennington",
    title: "Founder & Chief Executive",
    bio: "Bill founded Only Pans in 2021 after a long period of reflection on his previous career in the airflow space. He speaks of his earlier work only when directly asked, and only briefly. He is a graduate of a respectable Midwestern business school and would like that mentioned.",
    quote: "We are a cookware platform. That is all we are.",
    image: "/sites/onlypans/exec-pennington.png",
    person: "bill",
  },
  {
    slug: "holloway",
    name: "Brandon Holloway",
    title: "VP, Cookware Relations",
    bio: "Brandon joined in 2021 after Bill assured him the new venture was completely unrelated to the old one. By the time he discovered the format was, in several meaningful ways, identical, his children had already enrolled in a new school district. He is still processing.",
    quote: "I was told this was a kitchenware distribution start-up.",
    image: "/sites/onlypans/exec-holloway.png",
    person: "brandon",
  },
  {
    slug: "beckwith",
    name: "Jim Beckwith",
    title: "VP, Subscriber Stillness",
    bio: "Jim runs the department responsible for helping subscribers understand that the pan is not supposed to do anything. It is, by his own account, the most difficult job he has ever held. His mother has asked three times what he does. He has answered differently each time.",
    quote: "The pan is not broken. It is at rest.",
    image: "/sites/onlypans/exec-beckwith.png",
    person: "jim",
  },
  {
    slug: "rowe",
    name: "Sean Rowe",
    title: "VP, Artisan Partnerships",
    bio: "Sean negotiates contracts with our eight creators. He maintains a standing weekly appointment with a therapist and has recently taken up woodworking. He does not currently keep a journal, but has been considering it.",
    quote: "Every day, I speak respectfully to eight household objects.",
    image: "/sites/onlypans/exec-rowe.png",
    person: "sean",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}
