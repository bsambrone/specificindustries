import { farmers } from "./farmers"

export interface Leader {
  slug: string
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string
  portraitImage: string
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/"/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// Canonical source of the co-op's stewards is `data/farmers.ts` (consumed by
// the subsite's Meet the Farmers page). This module re-exports that list in
// the apex-collector's expected shape so the Board Positions lookup finds it.
export const leaders: Leader[] = farmers.map((f) => ({
  slug: slugify(f.name),
  person: f.basePerson,
  name: f.name,
  title: f.title,
  bio: f.bio,
  portraitImage: f.image,
}))
