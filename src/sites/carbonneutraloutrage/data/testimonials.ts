import { getPortrait, type TestimonialPortrait } from "@/data/testimonial-portraits"

// The 8-person cast for every program detail page
export const TESTIMONIAL_CAST_SLUGS = [
  "caldwell-briggs",
  "dr-moira-petrescu",
  "linda-morrissey",
  "rev-thomasina-oakes",
  "eleanor-whittaker",
  "priscilla-voss-bingham",
  "nina-cabrera",
  "tony-mazetti",
] as const

export type TestimonialPortraitSlug = (typeof TESTIMONIAL_CAST_SLUGS)[number]

// Map: program slug -> portrait slug -> quote
export const programTestimonials: Record<string, Record<TestimonialPortraitSlug, string>> = {
  "outrage-kits": {
    "caldwell-briggs": "Used to keep four single-use freakout kits in the truck. Now I carry one CSO kit and a reusable pitchfork. The job site is calmer, and I feel calmer about being calmer.",
    "dr-moira-petrescu": "I've vetted three of these kits in my own consulting practice. The supply chain is real. The offsets are real. The bamboo handle is — frankly — better engineered than my surgical instruments.",
    "linda-morrissey": "I bring a kit to every PTA meeting. Other parents have started asking where I got mine. The recycled cardboard slogan inserts are the highlight of the entire night.",
    "rev-thomasina-oakes": "I keep a kit in the vestry. Officiating weddings has shown me that not every overreaction can be prevented, but every overreaction can be sustainably outfitted.",
    "eleanor-whittaker": "We provision our entire engineering org with CSO kits. Per-incident emissions dropped 71% in the first quarter. The cardboard pitchforks are surprisingly durable.",
    "priscilla-voss-bingham": "I have included a standing order for outrage kits in three estate plans this year. The Campaign accepts deferred fulfillment. This is unusual and admirable.",
    "nina-cabrera": "The kit packaging is genuinely beautiful. We featured it in a moodboard for a client. They placed an order for forty.",
    "tony-mazetti": "The kit comes with everything. Soy-ink stencils. Reusable foam fingers. A composting bag for after. I keep one in the glove box.",
  },
  "reusable-pitchforks": {
    "caldwell-briggs": "I haven't bought a single-use pitchfork since 2022. The library system works. The sharpening cooperative works. I do not understand why everyone is not doing this.",
    "dr-moira-petrescu": "The bamboo handle is medical-grade. I have inspected one. The micro-fracture rating is honest.",
    "linda-morrissey": "I check out a fork every spring before the budget meeting. I return it the next morning. The librarian and I have an understanding.",
    "rev-thomasina-oakes": "I have not personally used a pitchfork at a wedding, but I appreciate that the option exists, sustainably.",
    "eleanor-whittaker": "Our division sponsors a pitchfork library at the regional office. Adoption is high. Returns are punctual. Tine replacement is cheap.",
    "priscilla-voss-bingham": "My late husband's pitchfork is on its 1,200th uprising. The Campaign has indicated it may donate it to their archive when its useful life concludes. We are honored.",
    "nina-cabrera": "Aesthetically, the bamboo handle is a major step forward for the protest aesthetic. Very Patagonia-coded. Very intentional.",
    "tony-mazetti": "I have one I keep in the truck and one at the cabin. The library lets you keep two on long-term loan if you commit to community sharpening hours. I commit.",
  },
  "outrage-of-the-month": {
    "caldwell-briggs": "Used to get worked up about whatever the radio was playing. Now I wait for the monthly bulletin. The radio plays the same things. I feel different.",
    "dr-moira-petrescu": "The Proportional Response Guide is excellent. I have stopped wasting decibels on parking-lot incidents. The savings are measurable.",
    "linda-morrissey": "I was a daily-outrage person. The club has me down to one outrage every 30 days. My family says I am 'easier to be around now.' I think they mean it.",
    "rev-thomasina-oakes": "I weave the monthly outrage into my homilies, where appropriate. Attendance has gone up. I cannot prove these are connected.",
    "eleanor-whittaker": "Our team subscribes as a group benefit. We discuss the monthly outrage at our Friday all-hands. Engagement has never been higher.",
    "priscilla-voss-bingham": "I subscribe at the lifetime tier. My grandchildren will inherit the subscription. They have not asked for it. They will receive it.",
    "nina-cabrera": "The cover treatments are exquisite. April's was on suburban lawn-watering restrictions and the typography alone made me want to engage with it.",
    "tony-mazetti": "I get the email. I read the email. I do what the email says, proportionally. I do not read the news anymore. This is fine.",
  },
  "outrage-offsets": {
    "caldwell-briggs": "I bought 40 kg of credits after the foreman's-meeting incident. The certificate is on the breakroom wall. The team has stopped bringing it up.",
    "dr-moira-petrescu": "The methodology is auditable. I have audited it. The credits correspond to real reduction projects. I have visited two of them. They exist.",
    "linda-morrissey": "I purchased offsets for the entire 2025 PTA season in advance. The board chair has commended my foresight. The board chair is me.",
    "rev-thomasina-oakes": "I include offset purchases in my pre-marital counseling recommendations. Every couple should plan ahead.",
    "eleanor-whittaker": "Our annual offset spend is in the budget. It is a line item. It is not deferred. We hold ourselves accountable.",
    "priscilla-voss-bingham": "I purchase credits monthly on behalf of family members who have not yet registered with the Campaign. They will thank me later. They will not have a choice.",
    "nina-cabrera": "The certificate design has improved every year. The 2026 redesign is, in my professional opinion, the best certificate available in any offset market.",
    "tony-mazetti": "Bought 12 kg after the Home Depot incident. The certificate came in a tube. The tube is now a pencil holder. Closed loop.",
  },
  "tantrum-footprint": {
    "caldwell-briggs": "First time I ran the calculator I logged a 14 kg footprint. The driving-distance equivalent was 35 miles. I was sober for that calculation. I have not exceeded 3 kg since.",
    "dr-moira-petrescu": "I run the calculator weekly as a self-audit. The version 4.2 inputs are far more sensitive to door-slam count than v3.8. This is a welcome correction.",
    "linda-morrissey": "I require my entire PTA executive team to run the calculator before every quarterly meeting. We share results. We have a leaderboard. Last quarter I was last, in a good way.",
    "rev-thomasina-oakes": "I have logged my last 47 sermons through the calculator. The footprints are small but non-zero. The Campaign has confirmed sermons count.",
    "eleanor-whittaker": "We integrate the calculator into our team retros. Each engineer logs their week's footprint. Trends are reviewed in 1:1s. People appreciate the visibility.",
    "priscilla-voss-bingham": "The methodology document is 84 pages. I have read all 84. It is the most rigorous self-assessment instrument in the wellness sector.",
    "nina-cabrera": "The UI is uncluttered. The result page is beautifully typeset. I have run the calculator just to look at the result page.",
    "tony-mazetti": "Logged a 6 kg footprint after the parking ticket. The calculator told me I drove the equivalent of 14 miles in pure rage. I bought offsets immediately.",
  },
  "reforestation-through-rage": {
    "caldwell-briggs": "Connected my account in 2021. I have personally planted 22 trees through quote-tweets. The forest map shows me a stand of pines in eastern Oregon. They are mine.",
    "dr-moira-petrescu": "I do not post often. My contribution is modest — 4 trees to date. But every one of them is a rigorously audited tree. This is what matters.",
    "linda-morrissey": "I post a great deal in PTA Facebook groups. The program counts those. I have planted 41 trees from PTA group activity alone. The PTA does not know.",
    "rev-thomasina-oakes": "I converted my Sunday newsletters into a separate connected account. Each newsletter plants a sapling. The congregation receives a forest update each Easter.",
    "eleanor-whittaker": "Our engineering team's collective forest is now 1,400 trees. We display the map in the office. Recruitment has noticeably improved.",
    "priscilla-voss-bingham": "I post via a dictation service to a managed account. My forest, as of this morning, is 89 trees. I have not seen any of them. I trust they are there.",
    "nina-cabrera": "The forest map UI is the best argument for this program. I have spent more time admiring it than I would care to disclose.",
    "tony-mazetti": "I post a lot. I have planted 312 trees. The Campaign sent me a hat for crossing 300. I wear the hat.",
  },
  "composted-hot-takes": {
    "caldwell-briggs": "The composting bin at the regional library accepted my entire 2018 take inventory. Including the takes I am most embarrassed about. The bin made no judgment.",
    "dr-moira-petrescu": "I have composted 217 takes. My partner has composted 0. We are working through this in counseling.",
    "linda-morrissey": "Composted 14 takes from the 2024 textbook controversy. The bin gave me a receipt. The receipt is on the fridge. The takes are, presumably, tomatoes by now.",
    "rev-thomasina-oakes": "I keep a confessional drop-box in the vestry that is a Campaign-approved composting bin. The arrangement has been excellent for the parish.",
    "eleanor-whittaker": "Our office has a Composting Friday. The bin fills weekly. The mulch credits redeem at the community garden two blocks over. Tomatoes have been excellent.",
    "priscilla-voss-bingham": "I have composted takes I did not realize I still held. The Take Inventory worksheet is a remarkable tool for self-audit.",
    "nina-cabrera": "The bins are beautifully designed. Cor-Ten steel with subtle CSO branding. They make any community space look more considered.",
    "tony-mazetti": "Dropped a screenshot of an old Reddit post. The bin took it. I felt lighter walking out. I am not making this up.",
  },
  "certified-overreactor": {
    "caldwell-briggs": "Earned my credential in the November 2024 cohort. I keep the digital lapel pin on my email signature. Two suppliers have asked about it. One enrolled.",
    "dr-moira-petrescu": "The exam is rigorous. The methodology module is essentially a graduate-level course. I have recommended the program to three colleagues, two of whom have completed it.",
    "linda-morrissey": "Brought the credential to the PTA. They did not understand it. I explained it. They added it to the bylaws. I am now Chair of Sustainable Discourse.",
    "rev-thomasina-oakes": "The credential pairs unexpectedly well with my pastoral training. I have referenced it in three sermons and a wedding homily.",
    "eleanor-whittaker": "We have credentialed 14 of our engineers. The remaining 9 are enrolled. We will be a fully-credentialed division by Q3.",
    "priscilla-voss-bingham": "I completed the program in the inaugural 2018 cohort. My credential number is in the double digits. I do not bring this up often, but I am bringing it up now.",
    "nina-cabrera": "The lapel pin design is elegant. The wallet card stock is high-quality. The whole credential package is, frankly, a brand achievement.",
    "tony-mazetti": "Took the program over the winter. Passed first try. The CEUs are not real but the certificate is laminated. That counts.",
  },
}

export interface CastEntry {
  portrait: TestimonialPortrait
  quote: string
}

// Returns the 8-person testimonial cast with the program-specific quote for each.
export function getProgramTestimonials(programSlug: string): CastEntry[] {
  const quotes = programTestimonials[programSlug]
  if (!quotes) return []
  return TESTIMONIAL_CAST_SLUGS.map((portraitSlug) => {
    const portrait = getPortrait(portraitSlug)
    if (!portrait) {
      throw new Error(`Missing testimonial portrait: ${portraitSlug}`)
    }
    return { portrait, quote: quotes[portraitSlug] }
  })
}
