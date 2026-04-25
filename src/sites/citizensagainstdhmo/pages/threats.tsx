import { Hero } from "@/components/ui/hero"
import { threats } from "@/sites/citizensagainstdhmo/data/threats"
import { ThreatCard } from "@/sites/citizensagainstdhmo/components/threat-card"

export const metadata = {
  title: "The Threats — Citizens Against DHMO",
  description: "Ten documented categories of harm caused by dihydrogen monoxide exposure. Updated continuously as new evidence is collected.",
}

export default function ThreatsIndexPage() {
  return (
    <>
      <Hero
        headline="The Threats"
        subheadline="Ten documented categories of harm. Each one is supported by independent research, citizen-collected evidence, or both. The list is not exhaustive — it is the floor."
      />
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {threats.map((threat) => (
              <ThreatCard key={threat.slug} threat={threat} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
