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
    slug: "hatcher",
    name: "Bill Hatcher",
    title: "Founder & Chief Executive",
    bio: "Bill founded Only Fans in 2019 after a long weekend that he describes as 'a series of decisions I cannot fully account for.' He is a graduate of a respectable Midwestern business school and would like that mentioned. He stands behind the company in the technical sense that he owns it.",
    quote: "I was supposed to be in commercial real estate.",
    image: "/sites/onlyfans/exec-hatcher.png",
    person: "bill",
  },
  {
    slug: "wexley",
    name: "Brandon Wexley",
    title: "VP, Operations (Allegedly)",
    bio: "Brandon joined the company in 2020 because Bill assured him it was an HVAC distribution business. By the time the actual business model was explained, his children were already enrolled in private school. He has since stopped attending alumni events.",
    quote: "I would prefer not to discuss what I do for a living.",
    image: "/sites/onlyfans/exec-wexley.png",
    person: "brandon",
  },
  {
    slug: "castellan",
    name: "Jim Castellan",
    title: "VP, Subscriber Success",
    bio: "Jim is responsible for ensuring our subscribers receive the airflow content they have paid for. He is good at his job, which is the worst part of it. His mother believes he works for a 'fan distribution start-up' and he has not corrected her.",
    quote: "Please do not put my full name on this page.",
    image: "/sites/onlyfans/exec-castellan.png",
    person: "jim",
  },
  {
    slug: "morrow",
    name: "Sean Morrow",
    title: "VP, Talent Relations",
    bio: "Sean handles negotiations with our roster of fan creators. He maintains professional relationships with eight household appliances. This is, as he frequently reminds us, not what he went to graduate school for.",
    quote: "I have updated my LinkedIn three times this year.",
    image: "/sites/onlyfans/exec-morrow.png",
    person: "sean",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}
