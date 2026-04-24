export interface Leader {
  slug: string
  name: string
  title: string
  bio: string
  highlights: { label: string; value: string }[]
  quote: string
  portraitImage: string
  person: "bill" | "brandon" | "jim" | "sean"
}

export const leaders: Leader[] = [
  {
    slug: "hollis-penderwick",
    name: "Hollis Penderwick",
    title: "Founder & Executive Director",
    bio: "Hollis founded the Campaign in 2017 after witnessing a single zoning-meeting outburst burn enough kinetic energy to power a coastal town for 14 minutes. A former climate-communications strategist with a decade at three major NGOs, Hollis has built the Campaign from a 4-person research collective into the leading voice in the responsible-overreaction movement. Hollis holds an MA in Environmental Communication from a school you have not heard of.",
    highlights: [
      { label: "Years in advocacy", value: "21" },
      { label: "Prior employers", value: "Three major NGOs (under NDA)" },
      { label: "Speaking engagements 2025", value: "47" },
      { label: "Personal CO₂e/year", value: "0.8 t (verified)" },
      { label: "Outbursts logged this year", value: "0 (under audit)" },
    ],
    quote: "Outrage is not the problem. Wasteful outrage is the problem. We are not the silence movement. We are the efficiency movement.",
    portraitImage: "/sites/carbonneutraloutrage/leaders/hollis-penderwick.png",
    person: "bill",
  },
  {
    slug: "ansel-drayton",
    name: "Ansel Drayton",
    title: "Director of Research",
    bio: "Ansel oversees the Campaign's methodology team and is the principal author of the annual State of Responsible Outrage report, now in its sixth edition. He developed the Tantrum Footprint methodology (v1 in 2019, currently in v4.2) and serves on the editorial board of the Journal of Civic Emissions. Prior to joining the Campaign, Ansel held research positions at two carbon-accounting firms.",
    highlights: [
      { label: "Methodology version", value: "v4.2" },
      { label: "Peer-reviewed papers", value: "14" },
      { label: "State of Responsible Outrage editions authored", value: "6" },
      { label: "Editorial board memberships", value: "2" },
      { label: "Hours spent on the methodology, lifetime", value: "Untracked, vast" },
    ],
    quote: "If you cannot measure your outrage, you cannot offset it. If you cannot offset it, you should not have it.",
    portraitImage: "/sites/carbonneutraloutrage/leaders/ansel-drayton.png",
    person: "brandon",
  },
  {
    slug: "emmett-landry",
    name: "Emmett Landry",
    title: "Chief Impact Officer",
    bio: "Emmett architected the Verified Outrage Offsets™ registry and is responsible for the Campaign's measurement, reporting, and verification (MRV) infrastructure. He brings 15 years of experience from the carbon-accounting sector, where he developed similar registries for forestry and methane-capture credits. Emmett channels his considerable personal intensity into actuarial rigor; colleagues describe him as 'unflinching.'",
    highlights: [
      { label: "Years in carbon accounting", value: "15" },
      { label: "Registries architected", value: "4" },
      { label: "Credits issued under his oversight", value: "47,000 t CO₂e" },
      { label: "MRV protocols authored", value: "9" },
      { label: "Personal Tantrum Footprint, last quarter", value: "Withheld pending review" },
    ],
    quote: "The registry is not a metaphor. The credits are not symbolic. We are doing the only honest accounting in the entire outrage sector.",
    portraitImage: "/sites/carbonneutraloutrage/leaders/emmett-landry.png",
    person: "jim",
  },
  {
    slug: "rory-kellner",
    name: "Rory Kellner",
    title: "Director of Donor Relations",
    bio: "Rory runs the Campaign's Patron Council, the Legacy Offset planned-giving program, and the regional chapter directors' annual convening. A 12-year veteran of nonprofit development, Rory has personally cultivated more than 200 major-donor relationships across the Campaign's history. He maintains his composure through the daily practice of tai chi, usually.",
    highlights: [
      { label: "Years in development", value: "12" },
      { label: "Major donors cultivated", value: "200+" },
      { label: "Legacy gifts secured", value: "$14.2M (lifetime)" },
      { label: "Chapter directors managed", value: "63" },
      { label: "Tai chi sessions, this month", value: "21 (target: 30)" },
    ],
    quote: "Donor relationships are the longest projects we run. Every conversation is a 30-year arc. Patience is the only sustainable strategy.",
    portraitImage: "/sites/carbonneutraloutrage/leaders/rory-kellner.png",
    person: "sean",
  },
]

export function getLeaderBySlug(slug: string): Leader | undefined {
  return leaders.find((l) => l.slug === slug)
}
