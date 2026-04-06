// src/sites/elderparty/data/coalitions.ts

export interface Coalition {
  slug: string
  name: string
  tagline: string
  description: string[]
  endorsementStatement: string
  leaderQuote: { text: string; author: string; title: string }
  platformAlignments: string[]
  image: string
}

export const coalitions: Coalition[] = [
  {
    slug: "mineral-labor",
    name: "Children's Mineral Labor Coalition",
    tagline: "Idle hands are unproductive hands.",
    description: [
      "Founded in 1987, the Children's Mineral Labor Coalition has long advocated for youth enrichment through hands-on mineral extraction programs. The Coalition believes that salt mines provide an ideal learning environment where young Americans develop discipline, teamwork, and an appreciation for the earth's resources that no classroom can replicate.",
      "With chapters in 34 states and a youth membership exceeding 200,000, the CMLC is one of the fastest-growing grassroots organizations in American politics. Their annual 'Dig Deep' summer camp program has been praised by participants as 'character-building' and by their parents as 'surprisingly affordable, since the children produce the salt that funds the program.'",
    ],
    endorsementStatement: "The Elder Party understands that America's future lies beneath the surface — literally. Their Education and Economy platforms align perfectly with our mission to put young Americans to work where it matters: underground.",
    leaderQuote: {
      text: "A child who can swing a pickaxe is a child who can swing an election.",
      author: "Margaret Halloway",
      title: "CMLC National Chairwoman",
    },
    platformAlignments: ["education", "economy"],
    image: "/sites/elderparty/coalition-mineral-labor.png",
  },
  {
    slug: "possession-party",
    name: "Demonic Possession Party",
    tagline: "Possession is a civil right, not a medical condition.",
    description: [
      "The Demonic Possession Party has fought for decades to destigmatize possession as a natural and enriching human experience. With over 500,000 registered members — many of whom registered themselves, and several of whom were registered by the entities currently residing within them — the DPP represents one of America's most passionate political movements.",
      "The Party's platform is simple: possession should be covered by health insurance (as a wellness benefit, not a treatment), employers should provide reasonable accommodation for possessed workers, and the entities themselves deserve a voice in the democratic process. 'Two votes per body isn't double-counting,' argues DPP leadership. 'It's representation.'",
    ],
    endorsementStatement: "The Elder Party's Healthcare and Civil Rights platforms create the legal and medical framework our members have been demanding for decades. Cthulhu R'lyeh understands what it means to exist in multiple states of consciousness simultaneously.",
    leaderQuote: {
      text: "We speak with many voices because we contain many voices. That's not a disorder. That's democracy.",
      author: "The Collective Voice of David Chen",
      title: "DPP Spokesperson(s)",
    },
    platformAlignments: ["healthcare", "civil-rights"],
    image: "/sites/elderparty/coalition-possession-party.png",
  },
  {
    slug: "illuminated-order",
    name: "The Illuminated Order",
    tagline: "We've always run things. Now we'd like credit.",
    description: [
      "After centuries of operating behind the scenes, The Illuminated Order has decided that the time for secrecy has passed. 'We've been managing global affairs since before most nations existed,' explains the Order's public liaison. 'The results speak for themselves. We'd simply like the recognition we've earned, and perhaps a seat at the table we've been setting.'",
      "The Order brings unmatched organizational capability to the Elder Party coalition. Their network spans every continent, every major institution, and several that officially don't exist. Their endorsement comes with logistical support that campaign managers describe as 'impossibly efficient' and 'arriving before we asked for it.' The Order's transition to public life has been remarkably smooth, though several world leaders have declined to comment on why.",
    ],
    endorsementStatement: "The Elder Party represents the first political movement worthy of our public endorsement. We have watched from the shadows long enough. It is time to step into the light — and to bring with us the structures we have built in the dark.",
    leaderQuote: {
      text: "Transparency is simply the final stage of control.",
      author: "The Grand Architect",
      title: "The Illuminated Order, Office of Public Affairs",
    },
    platformAlignments: ["foreign-policy"],
    image: "/sites/elderparty/coalition-illuminated-order.png",
  },
  {
    slug: "fishermen-innsmouth",
    name: "Fishermen United for Innsmouth",
    tagline: "The catch of the day is a better tomorrow.",
    description: [
      "Fishermen United for Innsmouth represents the coastal workers who have lived and labored alongside the Deep Ones for generations. Members of the union — some of whom display the distinctive Innsmouth features that come with prolonged coastal residence — advocate for fair labor standards that recognize the unique contributions of both human and non-human workers.",
      "The union's collective bargaining agreements are considered groundbreaking: they cover gill maintenance leave, underwater shift differentials, and a pioneering 'transformation accommodation' clause that ensures members retain full benefits regardless of how many physiological changes they undergo during their employment. 'A worker is a worker,' says union leadership, 'whether they breathe air or water.'",
    ],
    endorsementStatement: "The Elder Party's Economy and Housing platforms directly address the needs of our members — both the ones who still look human and the ones who've moved past that. Cthulhu R'lyeh is the first candidate who truly understands waterfront communities.",
    leaderQuote: {
      text: "The tide comes in, the tide goes out. So do we. That's just how it works around here.",
      author: "Captain Obadiah Marsh IV",
      title: "FUI President & Harbor Master",
    },
    platformAlignments: ["economy", "housing"],
    image: "/sites/elderparty/coalition-fishermen-innsmouth.png",
  },
  {
    slug: "mothers-geometry",
    name: "Mothers Against Euclidean Geometry",
    tagline: "Our children deserve to see all the angles.",
    description: [
      "Mothers Against Euclidean Geometry began as a parent-teacher organization in Arkham, Massachusetts, where several mothers noticed that their children's mathematics textbooks contained exactly zero references to non-Euclidean spatial relationships. 'How are our kids supposed to navigate a non-linear universe with only three dimensions of education?' asked founding member Patricia Gilman at the group's first meeting.",
      "The organization has since grown to over 100,000 members nationwide. Their advocacy has led to pilot programs in 12 states where students learn to calculate angles that don't add up to 180 degrees, measure rooms that are larger on the inside than the outside, and draw shapes that hurt to look at. Test scores in conventional mathematics have dropped, but members argue this is because 'conventional mathematics is the problem.'",
    ],
    endorsementStatement: "The Elder Party's Education platform is the first that acknowledges what we've known for years: Euclidean geometry is a cage, and our children deserve to be freed from it.",
    leaderQuote: {
      text: "My daughter came home and drew a triangle with four sides. Her teacher said it was wrong. I said it was progress.",
      author: "Patricia Gilman",
      title: "MAEG Founder & President",
    },
    platformAlignments: ["education"],
    image: "/sites/elderparty/coalition-mothers-geometry.png",
  },
  {
    slug: "arkham-watch",
    name: "The Arkham Neighborhood Watch",
    tagline: "When the Old Ones watch your street, crime watches itself.",
    description: [
      "The Arkham Neighborhood Watch operates on a simple principle: the most effective deterrent to crime is the persistent, inescapable sense that something vast and unknowable is observing your every action. Since implementing their 'Elder Summoning' protocol in 2019, participating neighborhoods have reported a 100% reduction in crime. They have also reported a 340% increase in residents 'hearing things,' but the Watch considers this an acceptable trade-off.",
      "Volunteers patrol in pairs — one human, one... present. Block captains maintain summoning circles at key intersections, which double as traffic calming measures. The Watch's annual report notes that while property values in participating neighborhoods have dropped, 'the residents who remain are deeply, irrevocably committed to the community.'",
    ],
    endorsementStatement: "The Elder Party's National Security platform scales our proven community safety model to the national level. What works on Pickman Street can work for America.",
    leaderQuote: {
      text: "We haven't had a break-in since the sigils went up. We haven't had a lot of things since the sigils went up.",
      author: "Herbert Armitage",
      title: "ANW Block Captain, Arkham Ward 3",
    },
    platformAlignments: ["national-security"],
    image: "/sites/elderparty/coalition-arkham-watch.png",
  },
  {
    slug: "esoteric-taxpayers",
    name: "The Esoteric Taxpayers Alliance",
    tagline: "Your tax dollars should fund gateways, not potholes.",
    description: [
      "The Esoteric Taxpayers Alliance represents fiscal conservatives who believe that government spending should prioritize dimensional gateway infrastructure over conventional public works. 'Roads deteriorate. Bridges rust. A properly maintained dimensional gateway is eternal,' argues the Alliance. 'We're not asking for more spending. We're asking for smarter spending — in directions most taxpayers can't perceive.'",
      "The Alliance's proposed federal budget reallocates 40% of the Department of Transportation's funding to the proposed Department of Dimensional Transit. Members point out that a single gateway can replace thousands of miles of highway, reduce commute times to zero (or negative values), and connect communities across distances that Euclidean geometry considers impossible. The only downside, they concede, is that 'some travelers arrive slightly different than when they left.'",
    ],
    endorsementStatement: "The Elder Party is the first major party that treats dimensional infrastructure as the fiscal priority it is. Cthulhu R'lyeh's Energy and Economy platforms reflect the kind of forward-looking fiscal policy this country desperately needs.",
    leaderQuote: {
      text: "I pay my taxes. I just want them spent on infrastructure that transcends physical law. Is that too much to ask?",
      author: "Harold Prescott, CPA",
      title: "ETA Chairman & Certified Public Accountant",
    },
    platformAlignments: ["energy", "economy"],
    image: "/sites/elderparty/coalition-esoteric-taxpayers.png",
  },
]

export function getCoalitionBySlug(slug: string): Coalition | undefined {
  return coalitions.find((c) => c.slug === slug)
}
