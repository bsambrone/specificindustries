export interface PressArticle {
  slug: string
  publication: string
  headline: string
  subhead: string
  byline: string
  date: string           // ISO date
  excerpt: string        // 1-2 sentence card excerpt
  heroImage: string
  body: string[]         // 4-6 paragraphs
  pullQuote?: string
}

export const articles: PressArticle[] = [
  {
    slug: "techcrunch-series-b",
    publication: "TechCrunch",
    headline: "Prechewed Labs raises $48M Series B to eliminate chewing",
    subhead: "The Kyoto-born nutrition startup led by Theodore Whitlock closed an oversubscribed round at a $420M valuation.",
    byline: "Priya Raghunathan",
    date: "2026-01-17",
    excerpt: "Led by Acre Capital with participation from Tenzing Partners and a who's-who of founder-operator LPs.",
    heroImage: "/sites/prechewed/press/techcrunch.png",
    body: [
      "Prechewed Labs, the pre-oral nutrition startup behind The Daily Bolus, has closed a $48M Series B at a $420M post-money valuation, the company confirmed this morning. The round was led by Acre Capital, with participation from Tenzing Partners and a syndicate of founder-operators that the company declined to fully name.",
      "Theodore Whitlock, who founded Prechewed after what he has described as a 'personal productivity crisis' during his last exit, said the funding would be used to scale the company's proprietary Pre-Oral Hydrolysis™ process and expand the Chewing Floor facility outside Los Angeles.",
      "'Chewing is the last unoptimized surface area in a high-performing operator's calendar,' Whitlock said. 'We are building the infrastructure to retire it.'",
      "Prechewed's consumer catalog now includes 28 SKUs, with a flagship product — The Daily Bolus — positioned as an all-day nutritional replacement for traditional meals. The company also operates a waitlist-only premium line, The Founder's Reserve, reportedly priced at $480 per 3-ounce pouch.",
      "Several LPs expressed interest in the company's enterprise tier, which pitches pre-chewed nutrition as a productivity intervention for knowledge-work teams. One source familiar with the round described the enterprise TAM as 'genuinely unbounded,' citing Prechewed's internal estimate of 312 reclaimed jaw-hours per employee per year.",
      "The company declined to disclose revenue but confirmed that it ships to all 50 states and one P.O. box in Kyoto.",
    ],
    pullQuote: "Chewing is the last unoptimized surface area in a high-performing operator's calendar.",
  },
  {
    slug: "bloomberg-480-pouch",
    publication: "Bloomberg",
    headline: "Inside the $480 pouch taking over private markets",
    subhead: "Founders, LPs, and at least one SAG-nominated director are on the waitlist for The Founder's Reserve.",
    byline: "Marcus Breen",
    date: "2026-02-03",
    excerpt: "The 47-unit monthly batch of aged pre-oral nutrition has become Silicon Valley's most discreet status buy.",
    heroImage: "/sites/prechewed/press/bloomberg.png",
    body: [
      "On a Tuesday morning in late January, 47 numbered foil pouches left a nondescript facility in Inglewood, California, bound for addresses in Atherton, Montecito, Tribeca, and — according to at least one intake manager — a P.O. box in Kyoto. Each pouch weighs three ounces. Each is priced at $480. Each has been aged for 30 days under inert gas.",
      "The product is called The Founder's Reserve, and it is made, or at least branded, by Prechewed Labs. It is not for sale in any conventional sense. There is a waitlist. The waitlist is, by multiple accounts, long.",
      "Prechewed's CEO, Theodore Whitlock, declined to discuss waitlist composition on the record but confirmed that the company has 'chosen not to pursue traditional retail for this tier.' A spokesperson described the product as 'a limited expression of our house philosophy.'",
      "Interviews with eleven current or former Prechewed customers — five of whom spoke on the condition of anonymity, citing what one called 'a soft NDA culture' — suggest the Reserve has become a discreet status signal among a certain Silicon Valley demographic. 'It's the new Hermès,' one investor, who spoke on background, said. 'If you can get it, you don't talk about it.'",
      "The Reserve is not Prechewed's core product — The Daily Bolus holds that position, priced at $42 — but people familiar with the company's go-to-market described the Reserve as 'the halo,' and said it has been instrumental in the company's recent Series B.",
      "Whether the product does anything the regular catalog does not is, as one former employee put it, 'a question Prechewed has not found especially interesting to answer.'",
    ],
    pullQuote: "It's the new Hermès. If you can get it, you don't talk about it.",
  },
  {
    slug: "verge-review",
    publication: "The Verge",
    headline: "We tried Prechewed™ for a week. Here's what happened to our jaws.",
    subhead: "Seven days of pre-oral nutrition, one reviewer, three reluctant conclusions.",
    byline: "Dana Osei",
    date: "2026-02-18",
    excerpt: "Product works. Jaw unclear how to feel about it.",
    heroImage: "/sites/prechewed/press/verge.png",
    body: [
      "For seven days in February, I ate nothing that required chewing. All of my calories came from Prechewed pouches — a mix of The Daily Bolus, Cacio e Pepe, Pad Thai, Ribeye, Tonkotsu, and, on day 5, because I felt I owed it to the review, Thanksgiving.",
      "The product works. That is the most honest thing I can say. Each pouch tastes, as Prechewed claims, remarkably close to the dish it's modeled on — not identical, but within a 90%-ish window of recognition. Texture is uniformly silken, which is either the best thing about Prechewed or the worst thing, depending on what you think food should be.",
      "By day 3, I noticed something I was not prepared for. I had approximately 40 extra minutes in my day. By day 5, I had noticed it twice. By day 7, I had grown attached to those minutes in a way that felt, honestly, a little concerning.",
      "The company's marketing centers on 'jaw-hours reclaimed.' I was skeptical of the phrase before starting this review. I am less skeptical now. My jaw feels fine — a little underused, perhaps, but fine — and my calendar feels noticeably different.",
      "The question I kept returning to, throughout the week, was whether Prechewed is a food company or a productivity company. It is, clearly, the latter wearing the clothes of the former. Whether that is a problem depends entirely on how you feel about productivity products that happen to contain your meals.",
      "I would try the Ribeye again. I would not try the Thanksgiving again. I finished the review on day 7 with a regular sandwich, which took me nineteen minutes.",
    ],
    pullQuote: "Prechewed is, clearly, a productivity company wearing the clothes of a food company.",
  },
  {
    slug: "nyt-styles-montauk",
    publication: "NYT Styles",
    headline: "Why founders in Montauk won't shut up about Bolus Matrix",
    subhead: "A brief field guide to the new wellness vocabulary of early-stage tech.",
    byline: "Annika Folse",
    date: "2026-03-09",
    excerpt: "At a recent Hamptons dinner, not a single jaw moved. The host seemed pleased.",
    heroImage: "/sites/prechewed/press/nyt-styles.png",
    body: [
      "The dinner began at 7:15 on a Friday evening in mid-February, at a Montauk rental whose architect, the host noted, had been 'extraordinarily patient with the pantry.' Of the eleven guests, seven were, at that moment, consuming a foil pouch. Two were sharing one. The other two, by informal count, appeared to be pretending.",
      "The pouches came from Prechewed Labs, a Los Angeles-adjacent company whose product line is, as its name suggests, pre-chewed. The dinner had been called, the host explained, to 'celebrate a protocol.' The protocol was Prechewed's Daily Bolus. No one had prepared any food. Nothing was served on plates.",
      "This would have been, in other eras, deeply strange. In the specific ecosystem of early-stage founders — which is to say, the particular subset of them that has begun to summer in Montauk and winter in Miami — it has become, over the last fourteen months, nearly routine.",
      "'You show up, you bring your pouch, you join the conversation,' said one founder, who declined to be named because he is currently fundraising. 'You don't have to perform eating. You don't have to pretend you're enjoying the shallot situation. You're just here.'",
      "The vocabulary is specific. 'Bolus Matrix' refers, technically, to a proprietary delivery format — in casual usage, it has come to mean something closer to 'the lifestyle.' To be 'on bolus' is to be, among this group, serious. To 'chew anyway' is, in some quarters, mildly suspect.",
      "Whether this endures, or whether it joins the other post-pandemic wellness protocols in the footnote section of a future essay, is — like most things in this cohort — a function of how the next fundraising environment turns out.",
    ],
    pullQuote: "You show up, you bring your pouch, you join the conversation.",
  },
  {
    slug: "wired-chewing-floor",
    publication: "Wired",
    headline: "The Chewing Floor: inside Silicon Valley's most secretive food facility",
    subhead: "Prechewed Labs' production site has ISO 22000 certification, 47 cameras, and a sign-out sheet for laboratory coats.",
    byline: "Henrik Sato",
    date: "2026-03-24",
    excerpt: "A rare tour of the facility where The Daily Bolus is, in a manner of speaking, produced.",
    heroImage: "/sites/prechewed/press/wired.png",
    body: [
      "The facility does not have an exterior sign. Its mailing address is a third-party fulfillment center three miles away. Its phone number reaches a general-intake voicemail at Prechewed Labs' main line. This is, its operators say, intentional.",
      "On a Thursday afternoon in March, I was granted an unusual tour — the first, I was told, extended to external press. The tour was short. Photography was prohibited. A small number of areas, including what our guide referred to as 'the primary mastication wing,' were not visited.",
      "What I saw: an entry vestibule lined with stainless steel, a sign-out sheet for laboratory coats (paper, not digital), a series of cold-storage rooms maintained at 2°C, a filling line that appeared to operate in complete silence, and a back office suite whose door was labeled 'Operator Services.' The door was closed. It remained closed throughout the visit.",
      "What I did not see: any identifiable mastication activity. I did not see people chewing. I also did not see machines chewing. I saw the outputs — pouches, sealed, labeled — emerging from what our guide described as 'the terminal line.' I did not see what happened before that.",
      "This is, according to the company, by design. 'Our process relies on operator anonymity,' a Prechewed spokesperson told me in a follow-up email. 'Mastication is performed by certified human and/or mechanical operators. We do not disclose the breakdown.'",
      "The facility's ISO 22000 certification is real. So is its SQF Level 3 rating. Its own internal certification — 'Certified Mastication Facility™' — is not recognized by any external auditor I could identify. A Prechewed spokesperson confirmed this, and described it as 'an internal standard reflecting our own practices.'",
    ],
    pullQuote: "Mastication is performed by certified human and/or mechanical operators. We do not disclose the breakdown.",
  },
  {
    slug: "vogue-status-symbol",
    publication: "Vogue",
    headline: "The new status symbol is not chewing",
    subhead: "A field report from the spring 2026 fashion week circuit, where the pouch has become the accessory.",
    byline: "Ines Marchetti",
    date: "2026-04-02",
    excerpt: "Seen at Cucinelli, Rick Owens, and three after-parties: the matte-black Prechewed pouch, in hand.",
    heroImage: "/sites/prechewed/press/vogue.png",
    body: [
      "At the spring 2026 Cucinelli show, a recognizable ex-Condé editor sat in the front row holding, with visible deliberation, a matte-black foil pouch. Two seats over, a venture partner held another. Across the aisle, a novelist held a third. The show began; the pouches remained, in hand, throughout.",
      "The pouch is made by Prechewed Labs, and its contents — a pre-oral-phased meal, priced between $18 and $480 depending on variant — are ostensibly the point. On the fashion circuit this season, the contents have become, at minimum, secondary.",
      "'It's a hand object,' said one editor, who declined to be named. 'It's the way the clutch was a hand object in the 2010s. You're not going to open it, you're not necessarily going to use it, but you're holding it, and everyone knows what it means.'",
      "What it means, increasingly, is that the holder is on bolus — which is to say, participating in the broader wellness-productivity culture that Prechewed, and a handful of adjacent brands, have assembled over the last two years. This is not a niche culture. It is not, any longer, a particularly discreet one.",
      "The matte-black pouch is the variant most often seen. This is the standard packaging for The Daily Bolus, Prechewed's flagship. The aged, numbered Founder's Reserve pouch, with its foil wrap and handwritten sequence number, is, according to multiple people, 'for dinner — not for the runway.' A brand spokesperson declined to confirm whether the company intended this distinction.",
      "By the time of the Rick Owens after-party, the pouches had multiplied. No one, as far as could be seen, was eating them.",
    ],
    pullQuote: "It's a hand object. It's the way the clutch was a hand object in the 2010s.",
  },
]

export function getArticleBySlug(slug: string): PressArticle | undefined {
  return articles.find((a) => a.slug === slug)
}
