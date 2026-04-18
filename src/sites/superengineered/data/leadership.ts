export interface Leader {
  slug: string
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string
  portraitImage: string
}

export const leaders: Leader[] = [
  {
    slug: "bill-ankeney",
    person: "bill",
    name: "Bill Ankeney",
    title: "Founder & Chief Simplification Officer",
    bio: "Founded Super Engineered on the conviction that the everyday objects in a person's life deserve the same rigor as their datacenter hardware.",
    portraitImage: "/sites/superengineered/team/bill-ankeney.png",
  },
  {
    slug: "brandon-yothers",
    person: "brandon",
    name: "Brandon Yothers",
    title: "Co-Founder, President of Platform Verticals",
    bio: "Oversees the core product line and its enterprise-grade SLA commitments across toothbrushes, doorknobs, light switches, and spoons.",
    portraitImage: "/sites/superengineered/team/brandon-yothers.png",
  },
  {
    slug: "jim-redenbaugh",
    person: "jim",
    name: "Jim Redenbaugh",
    title: "Co-Founder, SVP Utensil Strategy",
    bio: "Leads the Cloud+ subscription platform that powers every essential object in the catalog.",
    portraitImage: "/sites/superengineered/team/jim-redenbaugh.png",
  },
  {
    slug: "sean-lightcap",
    person: "sean",
    name: "Sean Lightcap",
    title: "Co-Founder, Chief Trust Architect",
    bio: "Identifies and evaluates new essential-object categories for the roadmap. Maintains the company's proprietary 'is this worth rebuilding from first principles?' scoring rubric.",
    portraitImage: "/sites/superengineered/team/sean-lightcap.png",
  },
]
