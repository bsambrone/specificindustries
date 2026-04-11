export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  credential: string
  image: string
}

export const executives: Executive[] = [
  {
    slug: "earl-crendon",
    name: "Earl J. Crendon",
    title: "Founder & Chairman Emeritus",
    bio:
      "Earl founded Gristmill Partners in 1962 in a converted grain mill in Youngstown, Ohio, after resigning from a regional steel concern that no longer exists. He continues to occupy the founder's office and, to all available evidence, has never taken a vacation. Earl believes the American worker has been in decline since the Eisenhower administration.",
    credential:
      "Served as a mid-level manager at the Ohio Valley Steel & Coke Company from 1948 to 1962. No subsequent employers.",
    image: "/sites/gristmill/execs/earl-crendon.png",
  },
  {
    slug: "theodore-brenner",
    name: "Theodore \"Ted\" Brenner",
    title: "President & Chief Executive Officer",
    bio:
      "Ted runs Gristmill day-to-day. He joined the firm in 1989 as an associate and has never worked anywhere else. He holds an MBA from a school that no longer exists. Ted is widely considered the steadying hand of the firm, though he has never personally stabilized anything.",
    credential:
      "MBA, Whitmore Graduate School of Commerce (1988, institution dissolved 1994).",
    image: "/sites/gristmill/execs/theodore-brenner.png",
  },
  {
    slug: "harold-duvane",
    name: "Harold \"Hal\" Duvane",
    title: "Chief Operating Officer & Vice President, Workforce Engineering",
    bio:
      "Hal runs field operations. He has personally authored 41 Gristmill-licensed employee handbooks, three of which remain legally enforceable. Internally, Hal is known as \"the Hammer\" — a nickname that predates his tenure at the firm and which nobody has ever clarified.",
    credential:
      "41 authored handbooks. 3 currently enforceable. The nickname has never been explained.",
    image: "/sites/gristmill/execs/harold-duvane.png",
  },
  {
    slug: "lester-knippenburg",
    name: "Lester \"Les\" Knippenburg",
    title: "Chief Financial Officer & Vice President, Compensation Stabilization",
    bio:
      "Les oversees client billing and the firm's flagship Compensation Suppression practice. Over his thirty-four years with Gristmill, he has personally denied more than twelve thousand raise requests. He collects antique stopwatches and is the only executive who still uses a physical ledger.",
    credential:
      "12,000+ raise requests personally denied. Maintains the firm's primary ledger in longhand.",
    image: "/sites/gristmill/execs/lester-knippenburg.png",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((exec) => exec.slug === slug)
}
