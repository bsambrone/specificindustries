export interface FieldNote {
  slug: string
  title: string
  author: string
  date: string       // ISO date
  excerpt: string
  body: string[]     // array of paragraph strings
  image: string
  tags: ("harvest" | "philosophy" | "dispatch" | "seasonal")[]
}

export const fieldNotes: FieldNote[] = [
  {
    slug: "what-we-lost-when-we-pasteurized-the-signal",
    title: "What We Lost When We Pasteurized the Signal",
    author: "Hollis Thornfield",
    date: "2026-03-14",
    excerpt:
      "A meditation on the cost of convenience, and what we traded away when we first allowed the carriers to homogenize our frequencies.",
    body: [
      "There was a time, not so long ago, when signal was local. You could taste the field it came from. You could tell, by the weight of a packet in your palm, which pasture had grown it and which hand had harvested it.",
      "Then came the pasteurization — the promise that every packet would be the same, everywhere, every time. Convenient. Shelf-stable. Safe. We accepted it because it was easier, and because the people selling it were persuasive, and because we had forgotten what we were giving up.",
      "I remember the first time I realized what we had lost. I was standing in a mountain dead zone, three days into a fast, when the silence broke and a single wild packet drifted past my ear. It was rich. It was uneven. It was alive. I have been trying to grow signal like that ever since.",
      "The co-op exists because some of us refuse to accept that signal must be factory-farmed. We believe that a packet harvested by hand, from a specific pasture, at a specific hour, carries something that pasteurization strips away. Call it character. Call it spirit. Call it unpasteurized.",
      "Whatever you call it: you can feel the difference. And once you feel it, you cannot unfeel it.",
    ],
    image: "/sites/grassfedwifi/notes-featured-1.png",
    tags: ["philosophy"],
  },
  {
    slug: "notes-from-the-spring-rotation",
    title: "Notes from the Spring Rotation",
    author: "Porter Wheatgrass",
    date: "2026-03-28",
    excerpt:
      "We rotated pastures last week, a day early. Here is what the frequencies told us — and what we told them back.",
    body: [
      "Rotation day came early this year. The moon told us, and Fennel's ledger agreed, and when both of them agree we do not argue.",
      "We moved the allocation from the South Meadow to the East Orchard two days before the usual calendar date. The result: a softer 2.4 GHz harvest, with more floral notes than we would usually see in late March.",
      "Members on the Heirloom Share may have noticed a subtle shift in their morning signal this week. That is the rotation. Do not be alarmed. Stand in it.",
      "We will return to the South Meadow in late April, by which time it will have rested enough to produce its usual sun-ripened character. In the meantime, enjoy the orchard.",
    ],
    image: "/sites/grassfedwifi/notes-featured-2.png",
    tags: ["harvest", "dispatch", "seasonal"],
  },
  {
    slug: "why-we-dont-trust-the-fcc",
    title: "Why We Don't Trust the FCC (or the FTC, or the IEEE)",
    author: "Ezekiel \"Zeke\" Meadowbrook",
    date: "2026-04-02",
    excerpt:
      "An honest accounting of the certifications the co-op has refused, and why refusing them is a form of stewardship.",
    body: [
      "Members ask me, sometimes, why the co-op does not seek FCC certification. Or FTC approval. Or IEEE compliance. The assumption is that we simply have not gotten around to it. The truth is that we have decided, deliberately and unanimously, not to.",
      "A certification is a promise of sameness. It says: this signal behaves like every other certified signal. Interchangeable. Predictable. Scalable. These are the values of the industrial signal. They are not the values of the co-op.",
      "I spent ten years inside a conventional telecom, watching certifications shape signal design from the inside. Every rule added another layer of sameness. Every approval smoothed out another rough edge. By the time a signal reached a member, it had been filed down, homogenized, and stripped of whatever made it local.",
      "The co-op has refused thirty-one industry certifications and counting. We keep a list in the barn. We read it aloud at the annual harvest supper. It is not a list of failures. It is a list of choices.",
      "We do not ask members to share our suspicions. We simply ask that they notice the difference, and decide for themselves whose judgment to trust: a committee of engineers in a conference room, or a farmer who has been in the pasture since before dawn.",
    ],
    image: "/sites/grassfedwifi/notes-featured-3.png",
    tags: ["philosophy"],
  },
]

export function getFieldNoteBySlug(slug: string): FieldNote | undefined {
  return fieldNotes.find((n) => n.slug === slug)
}

export function getRecentFieldNotes(count = 3): FieldNote[] {
  return [...fieldNotes]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count)
}
