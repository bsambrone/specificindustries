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
    slug: "bellweather",
    name: "Gerald Bellweather",
    title: "Founder & Chief Occasion Officer",
    bio: "Gerald founded Odd Occasions after spending two hours in a card shop looking for something that said 'Sorry I accidentally liked your ex's photo from 2016' and finding nothing. He realized that life's most specific moments were going entirely uncelebrated, and dedicated his career to fixing that. He personally approves every gift box concept and has vetoed only one (\"Congrats on Your Unremarkable Tuesday\" — too broad).",
    quote: "Every moment deserves recognition. Especially the ones nobody else would think to acknowledge.",
    image: "/sites/oddoccasions/exec-bellweather.png",
    person: "bill",
  },
  {
    slug: "ashworth",
    name: "Declan Ashworth",
    title: "VP of Occasion Research",
    bio: "Declan leads a small but passionate team that monitors real-life situations for underserved gifting opportunities. His research methodology involves surveys, focus groups, and sitting quietly in coffee shops listening to strangers describe awkward moments. He has cataloged over 4,000 specific occasions and maintains a spreadsheet he describes as 'the most important document in modern retail.'",
    quote: "The data doesn't lie. People are living through incredibly specific moments every single day, completely un-gifted.",
    image: "/sites/oddoccasions/exec-ashworth.png",
    person: "brandon",
  },
  {
    slug: "lundy",
    name: "Theodore Lundy",
    title: "Head of Curation",
    bio: "Theodore personally selects every item in every gift box. He has strong opinions about tissue paper weight (18gsm, never lighter), ribbon curl radius (\"it should suggest joy, not aggression\"), and the precise angle at which an apology card should sit inside the box (12 degrees, leaning toward the recipient). Before joining Odd Occasions, he worked in museum exhibit design, which he says was less demanding.",
    quote: "The difference between a good gift box and a great one is in the details nobody consciously notices but everyone unconsciously feels.",
    image: "/sites/oddoccasions/exec-lundy.png",
    person: "jim",
  },
  {
    slug: "nye",
    name: "Fletcher Nye",
    title: "Director of Recipient Experience",
    bio: "Fletcher oversees the moment of unboxing — the pause, the read, the reaction. He has conducted over 600 recipient observation sessions (with consent) and has developed a proprietary framework for measuring 'emotional resolution per box.' His proudest moment was a recipient who laughed, then cried, then said 'How did they know?' He considers this the gold standard.",
    quote: "We're not selling gift boxes. We're selling the feeling of being understood in a way you didn't know you needed.",
    image: "/sites/oddoccasions/exec-nye.png",
    person: "sean",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}
