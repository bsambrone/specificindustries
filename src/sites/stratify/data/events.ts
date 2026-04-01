export interface StratifyEvent {
  name: string
  type: "virtual" | "in-person" | "on-demand" | "classified"
  schedule: string
  location: string
  description: string
  ctaText: string
}

export const events: StratifyEvent[] = [
  {
    name: "Weekly Leadership Alignment Webinar",
    type: "virtual",
    schedule: "Every Thursday, 9:00 PM EST",
    location: "Virtual (link provided upon Layer 1 activation)",
    description: "Hosted by Cliff Ascendant. Topics rotate between yield optimization, layer expansion techniques, and \u2018mindset recalibration.\u2019 Attendance is strongly correlated with elevation velocity. Camera on is mandatory.",
    ctaText: "Reserve Your Seat",
  },
  {
    name: "Layer Expansion Summit 2026",
    type: "in-person",
    schedule: "August 14\u201316, 2026",
    location: "Marriott Adjacent Venue, Orlando, FL",
    description: "Our flagship annual event. Keynotes from all four Apex leaders. Breakout sessions include \u2018Converting Family Members Without Losing Them (Permanently)\u2019 and \u2018Advanced Subordinate Layer Retention.\u2019 VIP pass includes lanyard and one complimentary Performance Air\u2122 canister.",
    ctaText: "Register Now",
  },
  {
    name: "Regional Yield Intensive",
    type: "in-person",
    schedule: "Monthly \u2014 dates vary by region",
    location: "Various Hotel Conference Rooms",
    description: "A 6-hour deep dive into your local market\u2019s layer potential. Bring a list of 25 contacts. You\u2019ll leave with a list of 0 contacts who haven\u2019t been pitched.",
    ctaText: "Find Your Region",
  },
  {
    name: "New Participant Orientation: First 48 Hours",
    type: "on-demand",
    schedule: "Available immediately upon Layer 1 activation",
    location: "Virtual (on-demand)",
    description: "What to do in your first 48 hours as a Layer 1 Participant. Covers: updating your LinkedIn headline, the art of the casual mention, and how to answer \u2018is this a pyramid scheme\u2019 without technically lying.",
    ctaText: "Start Orientation",
  },
  {
    name: "Apex Executive Node Retreat",
    type: "classified",
    schedule: "Q4 2026 (exact dates disclosed upon elevation)",
    location: "Private island (coordinates disclosed upon elevation)",
    description: "Layer 4 members only. Details are not available to your current stratification level.",
    ctaText: "Elevation Required",
  },
]
