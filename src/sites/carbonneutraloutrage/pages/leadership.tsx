import { Hero } from "@/components/ui/hero"
import { ExecutiveCard } from "@/components/ui/executive-card"
import { leaders } from "@/sites/carbonneutraloutrage/data/leadership"

export const metadata = {
  title: "Leadership — Campaign for Sustainable Overreactions",
  description: "Meet the four senior staff guiding the Campaign: Hollis Penderwick, Ansel Drayton, Emmett Landry, and Rory Kellner.",
}

export default function LeadershipPage() {
  return (
    <>
      <Hero
        headline="Leadership"
        subheadline="The Campaign is led by a senior team of four, supported by 47 staff across Portland, Philadelphia, and Boulder."
        image="/sites/carbonneutraloutrage/leadership.png"
      />
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {leaders.map((leader) => (
            <ExecutiveCard
              key={leader.slug}
              name={leader.name}
              title={leader.title}
              credentials="Carbon-Neutral · Audited · Accountable"
              bio={leader.bio}
              highlights={leader.highlights}
              quote={leader.quote}
              image={leader.portraitImage}
            />
          ))}
        </div>
      </section>
    </>
  )
}
