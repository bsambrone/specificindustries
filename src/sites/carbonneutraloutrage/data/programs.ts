export interface ProgramStat {
  label: string
  value: string
}

export interface ProgramStep {
  number: number
  heading: string
  body: string
}

export interface Program {
  slug: string
  name: string
  displayName: string  // with ™/® where applicable
  tagline: string
  oneLiner: string     // for the /programs index card
  heroImage: string
  problem: string      // 1 short paragraph of fake crisis framing
  howItWorks: ProgramStep[]  // exactly 3
  stats: ProgramStat[]       // exactly 3
}

export const programs: Program[] = [
  {
    slug: "outrage-kits",
    name: "Carbon-Neutral Outrage Kits",
    displayName: "Carbon-Neutral Outrage Kits",
    tagline: "Pre-assembled freakout supplies sourced from FSC-certified suppliers.",
    oneLiner: "Everything you need for a sustainable meltdown, in one biodegradable box.",
    heroImage: "/sites/carbonneutraloutrage/programs/outrage-kits.png",
    problem:
      "The average household freakout requires 12 disposable items — single-use grievance pamphlets, foam fingers, plastic-handled signs, and at least one pre-packaged hot take. The carbon footprint of a single suburban tantrum exceeds that of a transatlantic flight by a margin we are not yet legally permitted to disclose.",
    howItWorks: [
      { number: 1, heading: "We source", body: "Every component — from the cardboard pitchfork backing to the soy-ink slogan stencils — comes from FSC-certified, fair-trade, climate-positive suppliers. We audit our suppliers quarterly. They audit us back, which is unusual." },
      { number: 2, heading: "We assemble", body: "Kits are packed by hand at our regional fulfillment cooperative in central Oregon. Workers are paid a living rage and receive comprehensive emotional benefits." },
      { number: 3, heading: "We offset", body: "Every kit ships with a Verified Outrage Offset™ certificate covering the projected emissions of its entire useful lifecycle, including the after-meltdown recycling phase." },
    ],
    stats: [
      { label: "Kits distributed since 2017", value: "2.3M" },
      { label: "Average lifecycle CO₂e per kit", value: "0.4 kg" },
      { label: "Suppliers we have stopped working with", value: "11" },
    ],
  },
  {
    slug: "reusable-pitchforks",
    name: "The Reusable Pitchfork Initiative",
    displayName: "The Reusable Pitchfork Initiative",
    tagline: "Bamboo-handled, modular-tine pitchforks rated for 10,000 uprisings.",
    oneLiner: "End single-use pitchfork waste. Sharpen, return, re-issue.",
    heroImage: "/sites/carbonneutraloutrage/programs/reusable-pitchforks.png",
    problem:
      "Approximately 47 million single-use pitchforks are manufactured each year in the United States alone. The vast majority — 89%, by our count — are used exactly once before being discarded, often within sight of the very civic institution they were meant to oppose. This is not sustainable. This is not even responsible.",
    howItWorks: [
      { number: 1, heading: "Check out a pitchfork", body: "Visit any of our 340 pitchfork libraries (often co-located with public libraries) and check out a fork using your CSO membership card. We trust you to return it." },
      { number: 2, heading: "Use it responsibly", body: "Bamboo handles tolerate up to 10,000 uprisings before micro-fracture. Tines are modular — replace individually if dulled. Do not paint over the program logo." },
      { number: 3, heading: "Return for sharpening", body: "Drop the fork in any participating receptacle within 14 days. Our regional sharpening cooperatives recondition tines, restore handle integrity, and re-issue the fork to the next user." },
    ],
    stats: [
      { label: "Pitchforks in circulation", value: "1.2M" },
      { label: "Avg uprisings per pitchfork", value: "847" },
      { label: "Single-use pitchforks averted (cumulative)", value: "9.6M" },
    ],
  },
  {
    slug: "outrage-of-the-month",
    name: "Outrage of the Month Club",
    displayName: "Outrage of the Month Club",
    tagline: "Curated monthly cause delivered to your inbox. Never overreact to the wrong thing again.",
    oneLiner: "One sanctioned outrage per month. Issued by methodology, not by algorithm.",
    heroImage: "/sites/carbonneutraloutrage/programs/outrage-of-the-month.png",
    problem:
      "The modern outrage economy generates an estimated 4,300 candidate grievances per adult per day. Sorting through them — let alone selecting the appropriate ones to engage with — produces a measurable cognitive carbon load. Most overreactions are wasted on issues that, on calm review, did not warrant the energy expenditure.",
    howItWorks: [
      { number: 1, heading: "Subscribe", body: "Join the club for a sliding-scale annual membership. Members receive one (1) curated outrage per calendar month, hand-selected by our editorial council." },
      { number: 2, heading: "Engage proportionally", body: "Each issue includes a Proportional Response Guide indicating recommended decibel range, social media cadence, and whether a reusable pitchfork checkout is appropriate." },
      { number: 3, heading: "Compost the residue", body: "Once the month closes, we issue a Cease & Compost notice: please decommission your engagement with the prior month's outrage and direct it to your nearest Hot Takes Composting bin." },
    ],
    stats: [
      { label: "Active subscribers", value: "84,000" },
      { label: "Issues delivered since 2018", value: "97" },
      { label: "Avg subscriber attention reduction", value: "61%" },
    ],
  },
  {
    slug: "outrage-offsets",
    name: "Verified Outrage Offsets™",
    displayName: "Verified Outrage Offsets™",
    tagline: "Cap-and-trade for tantrums. Buy credits to neutralize a particularly wasteful freakout.",
    oneLiner: "Offset the unavoidable meltdowns. Standards-aligned. Audited.",
    heroImage: "/sites/carbonneutraloutrage/programs/outrage-offsets.png",
    problem:
      "Some overreactions cannot be prevented. A wedding speech goes wrong. A neighbor parks across two spots. A senior leadership team retreat is held outdoors. The emissions are real. The remorse, while sincere, is not a substitute for offsets.",
    howItWorks: [
      { number: 1, heading: "Calculate", body: "Use our Tantrum Footprint Calculator (or a third-party-certified equivalent) to estimate the CO₂e of the incident in question. Round up." },
      { number: 2, heading: "Purchase credits", body: "Each Verified Outrage Offset™ neutralizes 1 kg CO₂e and corresponds to a real-world reduction project — primarily reforestation and methane-capture programs operated by partner organizations." },
      { number: 3, heading: "Receive your certificate", body: "A blockchain-anchored (we are working on this) certificate is issued in your name, suitable for framing, regifting, or quietly producing during family conversations." },
    ],
    stats: [
      { label: "Credits issued (cumulative)", value: "47,000 t CO₂e" },
      { label: "Partner reduction projects", value: "23" },
      { label: "Avg credit price", value: "$18.40 / kg" },
    ],
  },
  {
    slug: "tantrum-footprint",
    name: "Tantrum Footprint Calculator",
    displayName: "Tantrum Footprint Calculator",
    tagline: "Estimate the CO₂e of your last meltdown. Decibels. Duration. Slammed-door count.",
    oneLiner: "Free, peer-reviewed, slightly judgmental.",
    heroImage: "/sites/carbonneutraloutrage/programs/tantrum-footprint.png",
    problem:
      "You cannot manage what you do not measure. The Campaign's research team has spent six years developing a peer-reviewed methodology to convert qualitative meltdown attributes (volume, duration, profanity volume, door-slam count) into a single, comparable carbon-equivalent number.",
    howItWorks: [
      { number: 1, heading: "Recall the incident", body: "Think back to the most recent overreaction you remember clearly. Honesty improves accuracy; the calculator does not transmit your inputs to a server." },
      { number: 2, heading: "Enter the four metrics", body: "Decibels (peak), duration in minutes, slammed door count, and profanity count. Default values are based on the suburban-quartile mean if you are unsure." },
      { number: 3, heading: "Receive your footprint", body: "The calculator returns a kg CO₂e estimate, a driving-distance equivalent, and (if applicable) a recommended Verified Outrage Offsets™ purchase." },
    ],
    stats: [
      { label: "Calculations performed", value: "1.8M" },
      { label: "Avg footprint per session", value: "2.7 kg CO₂e" },
      { label: "Methodology version", value: "v4.2 (Mar 2026)" },
    ],
  },
  {
    slug: "reforestation-through-rage",
    name: "Reforestation Through Rage™",
    displayName: "Reforestation Through Rage™",
    tagline: "Every 100 tweets plants a tree. Every quote-tweet plants a sapling.",
    oneLiner: "Convert your timeline into a forest.",
    heroImage: "/sites/carbonneutraloutrage/programs/reforestation-through-rage.png",
    problem:
      "Online discourse generates an enormous volume of effort and very little physical output. The Reforestation Through Rage™ program addresses this asymmetry: by metering social-media engagement and translating it into tree-planting commitments, we create a tangible deliverable from previously deliverable-free behavior.",
    howItWorks: [
      { number: 1, heading: "Connect your accounts", body: "Authorize the program to read post counts (not content) from your major social platforms. We do not see what you posted; we count that you posted." },
      { number: 2, heading: "Engage as you normally would", body: "Tweets, replies, quote-tweets, long-form posts — all metered. Your engagement is converted into tree credits at the published rate (currently 100 tweets : 1 tree)." },
      { number: 3, heading: "Watch your forest grow", body: "Once monthly, the program commissions tree plantings via partner reforestation organizations. You receive a personalized forest map showing where your trees stand." },
    ],
    stats: [
      { label: "Trees planted (cumulative)", value: "318,000" },
      { label: "Active enrolled accounts", value: "42,000" },
      { label: "Trees per active user, avg", value: "7.6" },
    ],
  },
  {
    slug: "composted-hot-takes",
    name: "Composted Hot Takes",
    displayName: "Composted Hot Takes",
    tagline: "Drop expired opinions into our municipal bins. We mulch them into community gardens.",
    oneLiner: "Your old takes belong in the soil, not in your search history.",
    heroImage: "/sites/carbonneutraloutrage/programs/composted-hot-takes.png",
    problem:
      "Hot takes have a shelf life. Most expire within 72 hours of issuance. Failure to properly decommission an expired take leads to ideological off-gassing, conversational leaching, and — in 14% of cases — full-fork relapse. The proper disposal of opinions is a civic responsibility.",
    howItWorks: [
      { number: 1, heading: "Identify expired takes", body: "Use our quarterly Take Inventory worksheet to catalog opinions that have exceeded their useful lifespan. Be honest. Most takes expire faster than people realize." },
      { number: 2, heading: "Drop at a participating bin", body: "Composting bins are located at every CSO Pitchfork Library and at 1,200 partner locations nationwide. Bins accept written, recorded, or screenshot formats." },
      { number: 3, heading: "Receive your mulch credit", body: "Each composted take is logged and weighted by category. Members earn mulch credits redeemable at partner community gardens — so your old hot takes become tomatoes." },
    ],
    stats: [
      { label: "Takes composted (cumulative)", value: "8.4M" },
      { label: "Community gardens supplied", value: "1,140" },
      { label: "Tomatoes attributable to composted takes", value: "An estimated 2.1M" },
    ],
  },
  {
    slug: "certified-overreactor",
    name: "Certified Responsible Overreactor™",
    displayName: "Certified Responsible Overreactor™",
    tagline: "An 8-week credentialing program with a fake exam, fake CEUs, and a digital lapel pin.",
    oneLiner: "Become a certified practitioner. Add it to your LinkedIn.",
    heroImage: "/sites/carbonneutraloutrage/programs/certified-overreactor.png",
    problem:
      "Anyone can call themselves an outrage practitioner. Few have the credentials to back it up. The Certified Responsible Overreactor™ program establishes a defensible, peer-recognized standard for sustainable overreaction practice — a credential that signals to employers, peers, and online adversaries that you have done the work.",
    howItWorks: [
      { number: 1, heading: "Enroll", body: "Eight weekly modules covering proportional response, decibel hygiene, the Tantrum Footprint methodology, and case studies in historic overreactions (sustainable and otherwise)." },
      { number: 2, heading: "Complete the exam", body: "A 60-question multiple-choice assessment. Open-book. Open-everything. Most candidates pass on the first attempt. The 12% who do not are encouraged to enroll in a remedial composting workshop." },
      { number: 3, heading: "Receive your credential", body: "A digital lapel pin, a wallet card, a LinkedIn-ready credential badge, and 8 fake Continuing Education Units that no professional body has agreed to honor." },
    ],
    stats: [
      { label: "Practitioners credentialed", value: "12,000" },
      { label: "Pass rate (first attempt)", value: "88%" },
      { label: "Avg time to credential", value: "9 weeks" },
    ],
  },
]

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug)
}
