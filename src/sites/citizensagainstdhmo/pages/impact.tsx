import { Hero } from "@/components/ui/hero"
import { heroStats, detailedStats } from "@/sites/citizensagainstdhmo/data/impact-stats"

export const metadata = {
  title: "Impact — Citizens Against DHMO",
  description: "Cumulative impact of the Citizens Against DHMO movement: signatures collected, citizens informed, school districts contacted, public records requests filed.",
}

export default function ImpactPage() {
  return (
    <>
      <Hero
        headline="Impact"
        subheadline="A movement is measured in signatures, conversations, public records, and the quiet reduction of unexamined exposure. These are the numbers we have."
      />

      <section className="py-20 px-6 bg-primary text-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest text-background/70 mb-10 font-semibold">
            Cumulative Impact
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-heading font-bold text-background">{stat.value}</p>
                <p className="text-xs md:text-sm text-background/70 mt-2 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">By the Numbers, in Detail</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {detailedStats.map((stat) => (
              <div key={stat.label} className="border border-accent/30 rounded-lg p-6 bg-white text-center">
                <p className="text-3xl font-heading font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-xs text-foreground/60 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
