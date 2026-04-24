export interface ArchiveIssue {
  month: string  // e.g., "April 2026"
  isoMonth: string  // e.g., "2026-04"
  title: string
  blurb: string
}

export const archiveIssues: ArchiveIssue[] = [
  { month: "April 2026",     isoMonth: "2026-04", title: "Suburban Lawn-Watering Restrictions", blurb: "How to engage proportionally with a HOA that has overstepped." },
  { month: "March 2026",     isoMonth: "2026-03", title: "Airport Boarding Group Etiquette",     blurb: "Why this is a sustainability issue, not an aesthetics issue." },
  { month: "February 2026",  isoMonth: "2026-02", title: "The Self-Checkout Bagging Crisis",      blurb: "A measured framework for grocery-store grievance." },
  { month: "January 2026",   isoMonth: "2026-01", title: "Sidewalk Snow-Clearing Compliance",     blurb: "Cold-weather outrage carries hidden energy costs. Here's how to budget." },
  { month: "December 2025",  isoMonth: "2025-12", title: "Holiday Light Wattage Disclosure",      blurb: "Your neighbors deserve a quiet conversation, not a public one." },
  { month: "November 2025",  isoMonth: "2025-11", title: "Daylight Saving Time, Again",            blurb: "A pre-allocated outrage so you do not have to host one yourself." },
  { month: "October 2025",   isoMonth: "2025-10", title: "Pumpkin Spice Saturation Levels",        blurb: "When seasonal product cycles exceed sustainable consumer-attention thresholds." },
  { month: "September 2025", isoMonth: "2025-09", title: "Back-to-School Supply List Inflation",   blurb: "Documented escalation. Recommended response: methodical, written, copied to the principal." },
  { month: "August 2025",    isoMonth: "2025-08", title: "Wedding RSVP Deadlines",                 blurb: "A cause we have been waiting to formally sanction since 2019." },
  { month: "July 2025",      isoMonth: "2025-07", title: "Public Pool Lane Etiquette",             blurb: "Aquatic civic engagement guidelines." },
  { month: "June 2025",      isoMonth: "2025-06", title: "Construction Equipment Idling",          blurb: "A neighborhood-scale issue with scalable response patterns." },
  { month: "May 2025",       isoMonth: "2025-05", title: "Memorial Day Mattress Sale Volume",      blurb: "A surprisingly persistent annual issue." },
]
