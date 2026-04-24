export type PersonKey = "bill" | "brandon" | "jim" | "sean"

export interface Leader {
  person: PersonKey
  slug: string
  name: string
  title: string
  bio: string
  portraitImage: string
}

export const leaders: Leader[] = [
  {
    person: "bill",
    slug: "orrin-bletchley",
    name: "Orrin Bletchley",
    title: "Founder & Director of the Institute",
    bio: "Orrin founded the Institute in 2011 after a career in management consulting at McKinsey, where he observed a correlation once and devoted the rest of his professional life to the remaining ones. He holds a certificate in Measurable Outcomes from a weekend seminar in Leipzig. Principal investigator on six published findings, most concerning the leadership behaviors he formerly exhibited.",
    portraitImage: "/sites/pointlessmetrics/leaders/orrin-bletchley.png",
  },
  {
    person: "brandon",
    slug: "percival-ashcombe",
    name: "Dr. Percival Ashcombe",
    title: "Chief Research Officer",
    bio: "Percival oversees the Institute's research agenda, the Quarterly Synergy Density Report, and the annual Correlation Almanac. His doctoral work at an institution he declines to name established the statistical framework now used by the Institute's fake peer-review board. The most prolific investigator on staff, he is currently first author on eight published findings across culture, communication, and strategy.",
    portraitImage: "/sites/pointlessmetrics/leaders/percival-ashcombe.png",
  },
  {
    person: "jim",
    slug: "augustus-crane",
    name: "Dr. Augustus Crane",
    title: "Director of Advisory Services",
    bio: "Augustus leads the Institute's on-site engagements, including the KPI Vibe Audit and the Correlation Coaching retainer. He once measured a company's vibe so thoroughly it filed for bankruptcy. Principal investigator on five published findings in productivity and workplace categories. Holds a quiet, long-standing grudge against open-plan offices.",
    portraitImage: "/sites/pointlessmetrics/leaders/augustus-crane.png",
  },
  {
    person: "sean",
    slug: "beaumont-kessler",
    name: "Dean Beaumont Kessler",
    title: "Dean of the Practitioner Program",
    bio: "Beaumont administers the Certified Pointless Metrics Practitioner™ credential and chairs the Institute's fake accreditation council. He personally writes the fake capstone exam and has never awarded a perfect score. Principal investigator on five findings, primarily in strategy and leadership. Believes, with some justification, that everyone could stand to be tested more.",
    portraitImage: "/sites/pointlessmetrics/leaders/beaumont-kessler.png",
  },
]

export function getLeaderBySlug(slug: string): Leader | undefined {
  return leaders.find((l) => l.slug === slug)
}

export function getLeaderByPerson(person: PersonKey): Leader | undefined {
  return leaders.find((l) => l.person === person)
}
