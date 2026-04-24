export interface HeroStat {
  value: string
  label: string
}

export interface BarChartRow {
  region: string
  averted: number  // tonnes CO2e
}

export interface DonutSegment {
  label: string
  pct: number
}

export const heroStats: HeroStat[] = [
  { value: "47,000", label: "tantrums offset" },
  { value: "1.2M", label: "reusable pitchforks in circulation" },
  { value: "$8.3M", label: "re-mulched into community gardens" },
  { value: "12,000", label: "Certified Responsible Overreactors™ credentialed" },
]

export const emissionsAvertedByRegion: BarChartRow[] = [
  { region: "Pacific Northwest", averted: 14200 },
  { region: "Mid-Atlantic",       averted: 11800 },
  { region: "Northeast",          averted: 16400 },
  { region: "Mountain West",      averted: 7100 },
  { region: "Midwest",            averted: 5400 },
]

export const dollarBreakdown: DonutSegment[] = [
  { label: "Programs",                pct: 78 },
  { label: "Research & methodology",  pct: 12 },
  { label: "Operations",              pct: 7 },
  { label: "Fundraising",             pct: 3 },
]

// 3 testimonials shown on /impact, drawn from the shared cast
export const impactTestimonialPortraitSlugs = [
  "linda-morrissey",
  "eleanor-whittaker",
  "tony-mazetti",
] as const

export const impactTestimonialQuotes: Record<string, string> = {
  "linda-morrissey":
    "Joining the Campaign changed how I show up to every PTA meeting. I am still myself. I am just a more carbon-efficient version of myself.",
  "eleanor-whittaker":
    "We integrated the Campaign's frameworks into our team rituals two years ago. Per-engineer outrage emissions dropped 71% in the first quarter and have stayed there.",
  "tony-mazetti":
    "Used to lose half a Saturday to a single contractor dispute. Now I file it through the methodology, buy the offset, and move on. The Saturdays are mine again.",
}
