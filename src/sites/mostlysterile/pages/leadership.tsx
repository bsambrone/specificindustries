import { Hero } from "@/components/ui/hero"
import { TeamMember } from "@/components/ui/team-member"

export const metadata = {
  title: "Leadership — Mostly Sterile",
  description: "The team responsible for operations, compliance, and strategic direction at Mostly Sterile.",
}

const leadership = [
  {
    image: "/sites/mostlysterile/team-founder.png",
    name: "Charlton L. Harrow",
    title: "Founder & Chief Executive",
    bio: "Lapsed pre-med student and the original vision behind Mostly Sterile. Founded the company in 2014 from a self-storage unit off Route 9. Retains his original apron.",
  },
  {
    image: "/sites/mostlysterile/team-cfo.png",
    name: "Wendell M. Dobrushkin",
    title: "Chief Financial Officer",
    bio: "Handles the money. Joined Mostly Sterile in 2017 after an independent career in adjacent financial roles which he considers to be substantially similar to this one.",
  },
  {
    image: "/sites/mostlysterile/team-cmo.png",
    name: "Perdita J. Aquilar",
    title: "Chief Medical Officer",
    bio: "Unaffiliated with any American Medical Association. Provides day-to-day clinical oversight to the extent feasible and is available for consultation during regular business hours, where available.",
  },
  {
    image: "/sites/mostlysterile/team-compliance.png",
    name: "Roderick V. Ashbee-Chen",
    title: "Head of Compliance",
    bio: "New hire. Started recently. Responsibilities include reviewing our existing practices and flagging items for further review, as well as general onboarding. Continues to settle in.",
  },
]

export default function MostlysterileLeadership() {
  return (
    <>
      <Hero
        headline="Leadership"
        subheadline="Mostly Sterile is operated by a compact team of four. All decisions are made by consensus, except those which are made by Charlton."
      />

      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member) => (
              <div key={member.name} className="border border-primary/20 bg-secondary/10 p-6">
                <TeamMember
                  image={member.image}
                  name={member.name}
                  title={member.title}
                  bio={member.bio}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-secondary/10 border-y border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-3">Governance Note</p>
          <p className="text-sm text-foreground/70 leading-relaxed">
            Mostly Sterile maintains no outside board, no formal advisors, and no staff beyond the four individuals named above. A succession plan exists in conceptual form and will be committed to writing in due course.
          </p>
        </div>
      </section>
    </>
  )
}
