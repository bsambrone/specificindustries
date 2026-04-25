export interface Leader {
  slug: string
  name: string
  title: string
  bio: string
  highlights: { label: string; value: string }[]
  quote: string
  portraitImage: string
  person: "bill" | "brandon" | "jim" | "sean" | null  // null = no base image, generic portrait
}

export const leaders: Leader[] = [
  {
    slug: "callum-rutherford",
    name: "Callum Rutherford",
    title: "Founder & Executive Director",
    bio: "Callum founded Citizens Against DHMO in 2019 after a viral social-media thread documenting his discovery of the substance's presence in his children's bath water received 4.7 million views in 72 hours. A former senior policy analyst at a major environmental advocacy group, Callum has built the movement from a single Reddit post into a 47-chapter grassroots network. He holds an MA in Public Policy from a school he prefers not to name in advocacy materials.",
    highlights: [
      { label: "Years in advocacy", value: "18" },
      { label: "Chapters under direct supervision", value: "47" },
      { label: "Public-records requests filed in 2025", value: "312" },
      { label: "Hours of broadcast media in 2025", value: "84" },
      { label: "Personal DHMO intake (disclosed quarterly)", value: "Reduced 38%" },
    ],
    quote: "We are not anti-DHMO. We are anti-secrecy. Every citizen deserves to know what is in their water, their food, and their children's school cafeteria.",
    portraitImage: "/sites/citizensagainstdhmo/leaders/callum-rutherford.png",
    person: "bill",
  },
  {
    slug: "isadora-fenwick",
    name: "Isadora Fenwick",
    title: "Chief Science Officer",
    bio: "Isadora directs the movement's research program and serves as principal author of our annual State of DHMO Disclosure report, now in its fourth edition. A trained environmental chemist with prior experience at two regional public-health authorities, she developed the DHMO Exposure Index methodology used by chapter leaders nationwide. Isadora's published work spans peer-reviewed and citizen-science publications and is frequently cited in disclosure litigation.",
    highlights: [
      { label: "Years in environmental chemistry", value: "16" },
      { label: "Methodology version (DHMO Exposure Index)", value: "v3.1" },
      { label: "Reports authored for the movement", value: "9" },
      { label: "Litigation citations of her published work", value: "23" },
      { label: "Public symposia delivered, 2025", value: "14" },
    ],
    quote: "If we cannot measure the exposure, we cannot manage the risk. The first job of this organization is to make the measurement possible.",
    portraitImage: "/sites/citizensagainstdhmo/leaders/isadora-fenwick.png",
    person: null,
  },
  {
    slug: "darius-thornquist",
    name: "Darius Thornquist",
    title: "Director of Awareness & Outreach",
    bio: "Darius leads the movement's communications, social-media, and earned-media programs. A 12-year veteran of nonprofit communications, he previously directed digital strategy for two national health-advocacy organizations. Under his leadership, Citizens Against DHMO content has reached an estimated 180 million social impressions in 2025 and earned coverage in three major national publications.",
    highlights: [
      { label: "Years in nonprofit comms", value: "12" },
      { label: "2025 social impressions", value: "180M+" },
      { label: "Earned media placements, 2025", value: "47" },
      { label: "Active platforms managed", value: "9" },
      { label: "Avg post engagement rate", value: "4.7%" },
    ],
    quote: "The job is not to scare people. The job is to give people the information they were never given. The fear, when it comes, is appropriate.",
    portraitImage: "/sites/citizensagainstdhmo/leaders/darius-thornquist.png",
    person: "brandon",
  },
  {
    slug: "marigold-easton",
    name: "Marigold Easton",
    title: "Head of Petition Strategy",
    bio: "Marigold runs all national petition campaigns, regulatory filings, and federal-agency engagement work. She brings 14 years of experience from environmental and consumer-protection litigation, where she co-led several precedent-setting disclosure cases. Under her leadership, the movement has filed 312 public-records requests in 2025 alone and currently has nine active petitions before federal regulators.",
    highlights: [
      { label: "Years in regulatory advocacy", value: "14" },
      { label: "Active federal petitions, end of 2025", value: "9" },
      { label: "FOIA requests filed in 2025", value: "312" },
      { label: "Successful disclosure orders, lifetime", value: "41" },
      { label: "Hours of regulatory testimony, 2025", value: "62" },
    ],
    quote: "The agencies do not move on their own. They move when citizens insist. Our job is to keep insisting until the records come out.",
    portraitImage: "/sites/citizensagainstdhmo/leaders/marigold-easton.png",
    person: null,
  },
  {
    slug: "everett-kingsford",
    name: "Everett Kingsford",
    title: "Director of Survivor Advocacy",
    bio: "Everett oversees the movement's survivor-storytelling program, member-care services, and chapter-level support coordination. A former social worker with a decade of trauma-informed practice, he built the survivor-intake protocol now used by all 47 chapters. He is the first point of contact for citizens navigating the personal and social consequences of DHMO awareness.",
    highlights: [
      { label: "Years in trauma-informed practice", value: "10" },
      { label: "Survivor intakes processed, lifetime", value: "1,400+" },
      { label: "Chapters supported", value: "47" },
      { label: "Care coordinators trained, 2025", value: "84" },
      { label: "Referral partnerships established", value: "23" },
    ],
    quote: "Coming to terms with this exposure is its own kind of work. We meet members wherever they are. The story is theirs to tell.",
    portraitImage: "/sites/citizensagainstdhmo/leaders/everett-kingsford.png",
    person: "jim",
  },
  {
    slug: "celeste-arvelo",
    name: "Celeste Arvelo",
    title: "General Counsel",
    bio: "Celeste leads the movement's legal program, including organizational compliance, FOIA litigation, chapter-level legal support, and the defense of disclosure-rights cases. A 17-year veteran of public-interest law, she previously served as a senior attorney at a state attorney general's office and currently sits on the boards of two national disclosure-rights organizations.",
    highlights: [
      { label: "Years in public-interest law", value: "17" },
      { label: "Active legal matters managed", value: "29" },
      { label: "Successful FOIA suits, lifetime", value: "62" },
      { label: "Boards served (concurrent)", value: "2" },
      { label: "Pro bono attorneys coordinated", value: "140+" },
    ],
    quote: "The law is on our side. The agencies forget. We remind them, in writing, in court, and in the Federal Register.",
    portraitImage: "/sites/citizensagainstdhmo/leaders/celeste-arvelo.png",
    person: null,
  },
]

export function getLeaderBySlug(slug: string): Leader | undefined {
  return leaders.find((l) => l.slug === slug)
}
