import { TeamMember } from "@/components/ui/team-member"
import { farmers } from "@/sites/grassfedwifi/data/farmers"

export const metadata = {
  title: "Meet the Farmers — Grass Fed WiFi",
  description: "The four farmer-stewards who tend the co-op's frequency pastures.",
}

export default function MeetTheFarmers() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">
            Meet the Farmers
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Four stewards tend the co-op&apos;s frequency pastures. They rise early, work late, and do not
            answer emails between November and February.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {farmers.map((farmer) => (
              <TeamMember
                key={farmer.name}
                name={farmer.name}
                title={farmer.title}
                bio={farmer.bio}
                image={farmer.image}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
