import { TeamMember } from "@/components/ui/team-member"
import { leaders } from "../data/leadership"

export const metadata = {
  title: "About — Meh.",
  description: "The team and thinking behind Meh.",
}

export default function MehAbout() {
  return (
    <>
      <section className="py-20 px-4 border-b border-foreground/20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-heading font-semibold text-primary mb-6 tracking-tight">About Meh.</h1>
          <div className="space-y-5 text-foreground/80 leading-relaxed text-lg">
            <p>
              Meh. was founded in 2019 on the observation that consumer electronics had come to promise more than any device can reasonably deliver. Most products are too enthusiastic. Most packaging contains too many exclamation points. Most features work.
            </p>
            <p>
              Our response has been, in the years since, to produce sixteen consumer devices calibrated to underdeliver in specific and repeatable ways. Our customers report that these devices are comforting, in a way they had not expected. This is the core of what we do.
            </p>
            <p>
              We are a small team. We take our work seriously. The products behave as specified, which is to say they behave slightly worse than one would hope.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-foreground/60 mb-10">Leadership</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {leaders.map((member) => (
              <div key={member.name} className="border border-foreground/20 p-6 bg-background/30">
                <TeamMember
                  image={member.portraitImage}
                  name={member.name}
                  title={member.title}
                  bio={member.bio}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
