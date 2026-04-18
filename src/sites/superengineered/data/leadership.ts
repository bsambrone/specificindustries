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
    slug: "voss",
    person: "bill",
    name: "Theodore Voss",
    title: "Founder & Chief Principal Engineer",
    bio: "Founded Super Engineered in 2016 on first principles: the everyday objects in a person's life deserve the same rigor as their datacenter hardware. Personally reviews the spec for every toothbrush firmware release.",
    portraitImage: "/sites/superengineered/team/bill-ankeney.png",
  },
  {
    slug: "holloway",
    person: "brandon",
    name: "Magnus Holloway",
    title: "VP of Datacenter-Grade Product",
    bio: "Oversees the core product line — the toothbrushes, doorknobs, light switches, and spoons — and their enterprise-grade SLA commitments. Runs his household spoon fleet on the Enterprise tier.",
    portraitImage: "/sites/superengineered/team/brandon-yothers.png",
  },
  {
    slug: "arrowood",
    person: "jim",
    name: "Curtis Arrowood",
    title: "Director of Cloud+ Platform",
    bio: "Leads the Cloud+ subscription platform that powers every essential object in the catalog. Personally migrated all internal objects to the Cloud+ Premium tier during his first quarter.",
    portraitImage: "/sites/superengineered/team/jim-redenbaugh.png",
  },
  {
    slug: "redhorn",
    person: "sean",
    name: "Laurence Redhorn",
    title: "Head of Essential Object Strategy",
    bio: "Identifies and evaluates new essential-object categories for the roadmap. Maintains the company's proprietary 'is this worth rebuilding from first principles?' scoring rubric.",
    portraitImage: "/sites/superengineered/team/sean-lightcap.png",
  },
]
