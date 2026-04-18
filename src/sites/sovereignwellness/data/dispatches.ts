export interface Dispatch {
  slug: string
  title: string
  excerpt: string
  urgent?: boolean              // true for the ALL-CAPS "URGENT DISPATCH"
  publishedLabel: string        // e.g., "In the waning gibbous, 2026"
  image: string
  paragraphs: string[]          // body content
}

export const dispatches: Dispatch[] = [
  {
    slug: "the-1962-filing",
    title: "The 1962 Filing: A Reconstruction",
    excerpt: "What we can piece together, forty-four years on, of the afternoon the remedies were boxed and carried out.",
    publishedLabel: "Third Tuesday, 2026",
    image: "/sites/sovereignwellness/dispatches/the-1962-filing.png",
    paragraphs: [
      "The particulars of the afternoon of the 14th of September, 1962, have never been formally recorded. Our understanding is assembled from three contemporaneous journal entries, a partial invoice from a moving company that dissolved in 1971, and a single photograph developed privately and passed between two of our Founders' predecessors.",
      "The remedies were boxed in lots of twenty. The boxes were labeled only with Roman numerals. The convoy departed at 3:17 in the afternoon. Its destination has never been publicly disclosed. The building from which the boxes were removed remained vacant for the next eleven years.",
      "We do not make claims we cannot support. We make only this claim: the filing occurred. What was filed, where it now resides, and why it was filed — these remain open questions. The answers, we believe, are in the Archive we inherited, which is why we inherited it.",
      "Ezekiel Thornwood Harrow, upon joining our organization in 1994, remarked only that he recognized three of the lot numbers. He did not elaborate.",
    ],
  },
  {
    slug: "what-they-dont-tell-you-about-your-sweat",
    title: "WHAT THEY DON'T TELL YOU ABOUT YOUR OWN SWEAT",
    excerpt: "A dispatch of extraordinary urgency. READ THIS BEFORE YOU PERSPIRE AGAIN.",
    urgent: true,
    publishedLabel: "FILED UNDER DURESS, 2026",
    image: "/sites/sovereignwellness/dispatches/what-they-dont-tell-you-about-your-sweat.png",
    paragraphs: [
      "YOUR SWEAT CONTAINS INFORMATION. WE KNOW THIS. THEY KNOW THIS. THE QUESTION IS WHY YOU DO NOT.",
      "Every droplet is a signature. Every signature is collected. There are, at time of writing, seven commercial firms and two non-commercial entities engaged in the systematic cataloging of human perspiration residue. You have stepped on their sensors. You have sat on their upholstery. You have, in all likelihood, contributed a full teacup in the last seven days alone.",
      "THIS IS NOT CONSPIRACY. IT IS LOGISTICS.",
      "The relevant Protocols address this. We will not name them in plain text. Consult the Treatments index. The remedies that matter are numbered, not named.",
      "We do not say this lightly: change your socks immediately. What you leave behind matters.",
    ],
  },
  {
    slug: "humility-of-the-dropper",
    title: "On the Humility of the Dropper",
    excerpt: "A meditation on the quiet dignity of sublingual dosing, and why a drop is never, in fact, a drop.",
    publishedLabel: "A Tuesday in lambent autumn, 2026",
    image: "/sites/sovereignwellness/dispatches/humility-of-the-dropper.png",
    paragraphs: [
      "The dropper is the most humble of all apothecary instruments. It does not pour; it offers. It does not dispense; it suggests. It is calibrated not in milliliters but in temperament — three drops for the stoic, four for the sensitive, seven for the afflicted and eleven for the reconstituted.",
      "Modern pharmacy has done away with the dropper almost entirely. This is, in our view, not an oversight. The dropper requires patience. The dropper requires a steady hand. The dropper requires a relationship with the tincture.",
      "We continue to use the dropper, and to source them by hand from a glassworks in the north of Vermont. The glassworks is operated by two siblings. We have visited them once. They did not, when we arrived, appear to expect us.",
      "The next time you administer a Protocol, pause. Observe the dropper. Consider what it asks of you. Then — only then — count the drops.",
    ],
  },
  {
    slug: "four-gibbous-malaises",
    title: "A Field Guide to the Four Gibbous Malaises",
    excerpt: "The waning gibbous is not one mood but four. A clinical reckoning.",
    publishedLabel: "During the appropriate phase, 2026",
    image: "/sites/sovereignwellness/dispatches/four-gibbous-malaises.png",
    paragraphs: [
      "The waning gibbous phase of the lunar cycle has, in modern clinical parlance, been flattened into a single flat descriptor: 'tired.' This is not a reckoning. This is a dismissal.",
      "The Archive identifies four distinct malaises that manifest during the phase. The First is characterized by a heaviness in the forearms and an aversion to printed matter. The Second by a taste of metal that appears exclusively between 3 and 5 in the afternoon. The Third by an unwillingness to answer the telephone that, it must be said, occasionally persists past the lunar cycle entire. The Fourth by a sensation that one has forgotten a specific word for a specific object, typically a small household implement.",
      "The Lunar Transit Malaise Balm (see the Treatments index) addresses all four simultaneously, though our formulators note that it works most efficiently on the Third. The Fourth, in candor, is the hardest to correct and occasionally resists the regimen entirely.",
      "If any of the foregoing describes you, you are not alone. You are approximately thirty-four percent of the adult population. They simply do not speak of it.",
    ],
  },
  {
    slug: "why-we-no-longer-answer-the-telephone",
    title: "Why We No Longer Answer The Telephone",
    excerpt: "A brief manifesto on communication hygiene, and the new correspondence calendar.",
    publishedLabel: "Monday following the equinox, 2026",
    image: "/sites/sovereignwellness/dispatches/why-we-no-longer-answer-the-telephone.png",
    paragraphs: [
      "The telephone, as it has come to function in the twenty-first century, is no longer a device for conversation. It is a device for interruption, marketed in the language of conversation. The distinction is not semantic. It is structural.",
      "As of the first of the year, we no longer answer the telephone. We read plaintext inquiries on the third Tuesday of each calendar month, in chronological order, by hand, aloud, in a single sitting. We reply when moved to.",
      "The email address listed on our Contact page is monitored by a human being who takes their work seriously. The response time is measured in weeks and not in minutes. This is intentional.",
      "If your inquiry is urgent, reconsider whether it is, in fact, urgent. If the answer remains yes — write slowly, write well, and trust that we will read.",
    ],
  },
]

export function getDispatchBySlug(slug: string): Dispatch | undefined {
  return dispatches.find((d) => d.slug === slug)
}
