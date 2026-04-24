export interface CSOEvent {
  slug: string
  name: string
  date: string         // human-readable
  isoDate: string      // YYYY-MM-DD for sorting
  city: string
  state: string
  description: string
}

export const events: CSOEvent[] = [
  {
    slug: "quarterly-composting-may-2026",
    name: "Quarterly Composting of Hot Takes",
    date: "May 18, 2026",
    isoDate: "2026-05-18",
    city: "Portland",
    state: "OR",
    description: "Our largest take-composting event of the year. Bring your Take Inventory worksheet. Drop bins will be staffed by trained Campaign volunteers. Refreshments provided.",
  },
  {
    slug: "annual-pitchfork-sharpening-jun-2026",
    name: "Annual Pitchfork Sharpening Cooperative",
    date: "June 7, 2026",
    isoDate: "2026-06-07",
    city: "Boulder",
    state: "CO",
    description: "All Mountain West region pitchforks are recalled for inspection, sharpening, and re-issuance. Members are invited to observe the cooperative's work and meet the regional sharpening team.",
  },
  {
    slug: "credentialing-cohort-summer-2026",
    name: "Certified Responsible Overreactor™ Summer Cohort Opens",
    date: "July 1, 2026",
    isoDate: "2026-07-01",
    city: "Online",
    state: "—",
    description: "Enrollment opens for the 8-week Summer 2026 credentialing cohort. Limited to 400 candidates per session. Early application is encouraged.",
  },
  {
    slug: "annual-impact-convening-sep-2026",
    name: "Annual Impact Convening",
    date: "September 14–16, 2026",
    isoDate: "2026-09-14",
    city: "Philadelphia",
    state: "PA",
    description: "The Campaign's flagship annual gathering. Three days of methodology workshops, chapter director trainings, and the unveiling of the next State of Responsible Outrage report.",
  },
]
