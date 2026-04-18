export interface ApexLeader {
  slug: string
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string
  portraitImage: string
  careerHighlights: string[]
  credentials: string[]
}

export const apexLeaders: ApexLeader[] = [
  {
    slug: "bill-sambrone",
    person: "bill",
    name: "Bill Sambrone",
    title: "Founder & Chief Executive Officer",
    bio: "Founded Specific Industries after identifying a pattern of underserved markets that no one else was willing to take seriously. Oversees capital allocation across the 28-brand portfolio and personally signs every acquisition term sheet.",
    portraitImage: "/sites/apex/team/bill-sambrone.png",
    careerHighlights: [
      "Founded Specific Industries in 2019 with one brand; grew to 28 active holdings",
      "Board meetings attended: 1 of 4 scheduled (annualized)",
      "LinkedIn connections: approximately 47",
      "Public speaking engagements: 0 (declined)",
    ],
    credentials: [
      "MBA-equivalent experience, unaccredited",
      "Certified in Strategic Ambiguity (self-certified, 2020)",
    ],
  },
  {
    slug: "cornelius-whitfield",
    person: "brandon",
    name: "Cornelius Whitfield",
    title: "President & Chief Operating Officer",
    bio: "Joined Specific Industries in 2021 from a senior operating role at a firm he characterizes as 'a similar platform, ultimately over-invested in outcomes.' Responsible for the day-to-day oversight of the portfolio's operational surface area.",
    portraitImage: "/sites/apex/team/member-1.png",
    careerHighlights: [
      "Portfolio operations uptime: within expected range",
      "Direct reports: 14 (as designed)",
      "Strategic memos authored: 217 (47 circulated)",
      "Fiscal-year planning cycles completed: 3 of 4",
    ],
    credentials: [
      "MBA, Wharton (class year not displayed)",
      "Six Sigma Black Belt (Gold Tier, Specific Industries internal certification)",
    ],
  },
  {
    slug: "russell-marsh",
    person: "jim",
    name: "Russell Marsh",
    title: "Chief Portfolio Officer",
    bio: "Leads portfolio strategy, acquisition evaluation, and post-acquisition integration. Has personally interviewed the founder of every current portfolio brand, on average twice.",
    portraitImage: "/sites/apex/team/member-2.png",
    careerHighlights: [
      "Industries evaluated: 1,400+",
      "Industries acquired: 28",
      "Industries declined: undisclosed (extensive)",
      "Quarterly reviews led: every quarter since 2021",
    ],
    credentials: [
      "MBA, University of Chicago Booth School of Business",
      "Certified Private Equity Analyst (lapsed, under review)",
    ],
  },
  {
    slug: "vincent-coleman",
    person: "sean",
    name: "Vincent Coleman",
    title: "Chief Strategy Officer",
    bio: "Authors the firm's investment thesis materials and maintains the firm's proprietary classification framework for underserved markets. Does not attend meetings before 10 AM.",
    portraitImage: "/sites/apex/team/member-3.png",
    careerHighlights: [
      "Frameworks authored: 4 (SPECIFIC Evaluation Framework™ is principal)",
      "Thesis revisions since 2019: 11",
      "Whitepapers drafted: 3 (unpublished)",
      "Conference invitations: 2 (declined)",
    ],
    credentials: [
      "PhD in Applied Market Philosophy (independent study)",
      "Fellow, Institute for Strategic Evaluation (self-appointed, 2022)",
    ],
  },
]

export function getApexLeaderBySlug(slug: string): ApexLeader | undefined {
  return apexLeaders.find((l) => l.slug === slug)
}

export function getApexLeaderByPerson(
  person: "bill" | "brandon" | "jim" | "sean"
): ApexLeader | undefined {
  return apexLeaders.find((l) => l.person === person)
}
