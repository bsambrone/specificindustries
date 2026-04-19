// Domain types for The Theory Is Real.
// All content data files import from here.

export type CategoryKey =
  | "atmospheric"
  | "global-control"
  | "reptilian"
  | "digital-reality"
  | "weaponized-tech"

export interface Category {
  key: CategoryKey
  title: string          // display title, e.g. "Atmospheric"
  tagline: string        // one-line hook used on tile + landing
  image: string          // /sites/thetheoryisreal/categories/<key>.png
}

export interface Theory {
  slug: string
  title: string
  category: CategoryKey
  publishedAt: string    // ISO date
  dek: string
  body: string[]
  pullQuotes?: string[]
  image: string          // /sites/thetheoryisreal/theories/<slug>.png
  relatedSlugs?: string[]
  breakingBadge?: boolean
}

export type BoardKey =
  | "atmospheric-anomalies"
  | "reptilian-sightings"
  | "npc-watch"
  | "signal-interference"
  | "general"

export interface ForumBoard {
  key: BoardKey
  title: string          // "Atmospheric Anomalies"
  tagline: string
  icon: string           // emoji — decorative only
}

export interface ForumReaction {
  emoji: string
  count: number
}

export interface ForumReply {
  username: string
  avatar: string         // /shared/testimonials/<name>.png
  postedAt: string       // "3 hours ago" — displayed verbatim
  body: string
  reactions?: ForumReaction[]
}

export interface ForumThread {
  slug: string
  board: BoardKey
  title: string
  op: ForumReply
  replies: ForumReply[]
  hot?: boolean
  pinned?: boolean
}

export type ConspiracyTag =
  | "chemtrails"
  | "illuminati"
  | "reptilian"
  | "npc"
  | "weaponized-tech"
  | "classics"

export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  conspiracyTag: ConspiracyTag
  nutritionalFacts: Array<{ label: string; value: string }>   // reused name; we populate with "SPECS"
}

export interface EvidenceItem {
  id: string
  image: string          // /sites/thetheoryisreal/evidence/<id>.png
  caption: string
  submittedBy: string    // must match a forum username
  tags: string[]
  annotations?: Array<{
    kind: "circle" | "arrow"
    x: number            // percent 0-100
    y: number            // percent 0-100
    w?: number           // percent for circle width (default 18)
    rotation?: number    // degrees for arrow (default 0)
  }>
}

export interface LibraryEntry {
  title: string
  author: string
  year: string
  url: string            // external or internal anchor
  abstractSnippet: string
}

export type DossierStatus = "ACTIVE" | "DEEP COVER" | "COMPROMISED" | "UNREACHABLE"

export interface LeaderDossier {
  id: string
  blurredPhoto: string   // /shared/testimonials/<name>.png
  biography: string
  expertise: string
  statusTag: DossierStatus
}
