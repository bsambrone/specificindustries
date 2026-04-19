export type DivisionSlug =
  | "academics"
  | "tactical"
  | "industrial"
  | "corporate"
  | "domestic"
  | "blackbook"

export interface Division {
  slug: DivisionSlug
  name: string
  tagline: string
  /** 1-2 paragraph flavor blurb for the division detail page */
  blurb: string[]
  /** Path to banner image under /public/sites/whiskerworks/divisions */
  bannerImage: string
  /** Blackbook is rendered as a solid-black card/page. All other flags false. */
  isRedacted: boolean
}

export const divisions: Division[] = [
  {
    slug: "academics",
    name: "Academics Division",
    tagline: "The mind is a terrible thing to waste on a cat.",
    blurb: [
      "The Academics Division is Whiskerworks' oldest school, founded in 2019 on the principle that any cat, given enough time and a properly laminated worksheet, can be taught a subject it cannot possibly understand.",
      "Our scholars go on to careers in accounting, theoretical physics, and hospitality — fields where nobody will question their credentials as long as they show up in a small blazer.",
    ],
    bannerImage: "/sites/whiskerworks/divisions/academics.jpg",
    isRedacted: false,
  },
  {
    slug: "tactical",
    name: "Tactical Division",
    tagline: "Deniability is a core learning outcome.",
    blurb: [
      "The Tactical Division trains feline operatives for roles in security, surveillance, and whatever the Blackbook Division requests. Our curriculum emphasizes situational awareness, small-footprint movement, and shedding at strategic moments.",
      "We do not maintain a public list of Tactical alumni. Our alumni do not maintain a public list of us. This is called trust.",
    ],
    bannerImage: "/sites/whiskerworks/divisions/tactical.jpg",
    isRedacted: false,
  },
  {
    slug: "industrial",
    name: "Industrial Division",
    tagline: "OSHA is a suggestion.",
    blurb: [
      "The Industrial Division prepares cats for careers involving heavy machinery, large vehicles, and commercial food-service appliances. Our training facility is above the Spirit Halloween on Route 9, which is not zoned for a forklift, but we have a forklift.",
      "Graduates operate municipal buses, commercial blenders, warehouse forklifts, and, as of 2024, commercial aircraft. Our safety record is excellent, by our standards.",
    ],
    bannerImage: "/sites/whiskerworks/divisions/industrial.jpg",
    isRedacted: false,
  },
  {
    slug: "corporate",
    name: "Corporate Division",
    tagline: "Climb the ladder. Sharpen your claws.",
    blurb: [
      "The Corporate Division trains cats for white-collar careers — middle management, clinical therapy, enterprise PowerPoint — in which nobody really pays attention to who is doing the work. This is our competitive advantage.",
      "Our flagship program, Replace Your Human at Their Job, has a 100% completion rate. We do not track placement. Our graduates do not respond to follow-up emails, which we take as a sign of full integration.",
    ],
    bannerImage: "/sites/whiskerworks/divisions/corporate.jpg",
    isRedacted: false,
  },
  {
    slug: "domestic",
    name: "Domestic Division",
    tagline: "Adulthood, now with claws.",
    blurb: [
      "The Domestic Division covers the painfully ordinary adult skills your cat has so far refused to learn — waiting in line at the DMV, officiating a wedding, presiding over jury deliberations, repairing a small engine.",
      "It is our largest enrollment division, because it is the one most pet owners can pretend to justify as practical.",
    ],
    bannerImage: "/sites/whiskerworks/divisions/domestic.jpg",
    isRedacted: false,
  },
  {
    slug: "blackbook",
    name: "Blackbook Division",
    tagline: "[Classification pending.]",
    blurb: [
      "If you have been contacted regarding Blackbook enrollment, you already know how to proceed.",
      "[The remainder of this entry is redacted.]",
    ],
    bannerImage: "/sites/whiskerworks/divisions/blackbook.jpg",
    isRedacted: true,
  },
]

export function getDivisionBySlug(slug: string): Division | undefined {
  return divisions.find((d) => d.slug === slug)
}
