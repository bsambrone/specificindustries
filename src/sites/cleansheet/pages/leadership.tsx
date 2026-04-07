import { ExecutiveCard } from "@/components/ui/executive-card"
import { teamMembers } from "@/sites/cleansheet/data/leadership"

export const metadata = {
  title: "Leadership — The Clean Sheet",
  description:
    "Meet the team behind The Clean Sheet. Each brings decades of experience in... fabric care.",
}

export default function LeadershipPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary/5 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
            Our Leadership
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Meet the team behind The Clean Sheet. Each brings decades of experience
            in... fabric care.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {teamMembers.map((member) => (
            <ExecutiveCard
              key={member.slug}
              name={member.name}
              title={member.title}
              credentials={member.credentials}
              bio={member.bio}
              highlights={member.highlights}
              quote={member.quote}
              image={member.image}
            />
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 px-6 bg-secondary/5 border-t border-primary/10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-foreground/40 text-sm leading-relaxed">
            All leadership biographies have been reviewed by legal counsel and revised
            accordingly. Any resemblance to persons under investigation, living or in witness
            protection, is entirely coincidental.
          </p>
        </div>
      </section>
    </div>
  )
}
