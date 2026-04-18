export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  person: "bill" | "brandon" | "jim" | "sean"
}

export const executives: Executive[] = [
  {
    slug: "whitfield",
    name: "Cornelius Whitfield",
    title: "Founder & Chief Executive",
    bio: "Cornelius founded Boneless Water in 1991 after a decade as a bottling-industry consultant. He discovered the indigestion-bone link while reviewing internal calcium-content reports for a major bottler and resigned the next morning. He has dedicated his life to bone removal since. He is a graduate of a respectable Midwestern business school and would like that mentioned.",
    quote: "I knew the moment I saw the report. The numbers don't lie about bones in your drinking water.",
    image: "/sites/bonelesswater/exec-whitfield.png",
    person: "bill",
  },
  {
    slug: "marsh",
    name: "Garrett Marsh",
    title: "Chief Science Officer",
    bio: "Garrett is co-author of the 1993 Journal of Aqueous Pathology paper that first quantified skeletal residue in municipal water supplies. The journal retracted his paper under industry pressure and reinstated it three years later under public pressure. He has run Boneless Water's research division since 1998 and personally oversees every batch of Lab Grade L1.",
    quote: "Peer review is a process. Truth is a constant.",
    image: "/sites/bonelesswater/exec-marsh.png",
    person: "brandon",
  },
  {
    slug: "coleman",
    name: "Russell Coleman",
    title: "Director of Consumer Protection",
    bio: "Russell suffered from undiagnosed indigestion for 27 years before discovering Boneless Water on the recommendation of a chiropractor. His symptoms resolved within three weeks of switching. He is now a certified BoneScan™ inspector and travels the country auditing competing facilities. He keeps a written log of every facility he has visited and maintains it in a leather binder he carries personally.",
    quote: "I felt the difference within seventy-two hours. I have not gone back.",
    image: "/sites/bonelesswater/exec-coleman.png",
    person: "jim",
  },
  {
    slug: "dunn",
    name: "Vincent Dunn",
    title: "Director of Compliance",
    bio: "Vincent is a former FDA inspector who resigned in 2003 after being instructed to suppress a draft report on cattle proximity to municipal water supplies in three Midwestern states. He spent eight years in private compliance consulting before joining Boneless Water in 2011. His regulatory binders are now organized by year, watershed, and contamination vector.",
    quote: "I sleep soundly now. I did not for a long time before that.",
    image: "/sites/bonelesswater/exec-dunn.png",
    person: "sean",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}
