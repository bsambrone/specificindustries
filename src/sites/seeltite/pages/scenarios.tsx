import { Hero } from "@/components/ui/hero"
import { ScenarioCard } from "../components/scenario-card"
import { CautionStripe } from "../components/caution-stripe"
import { scenarios } from "../data/scenarios"

export const metadata = {
  title: "Scenarios — The Seal Held | Seel-Tite Containment Systems",
  description: "Eight documented prevention cases. High-stakes moments. The G1 Containment Gasket held throughout.",
}

export default function SeeltiteScenarios() {
  return (
    <>
      <Hero
        headline="The Seal Held."
        subheadline="Eight documented prevention cases. Every one of them is a routine week at Seel-Tite."
      />
      <CautionStripe text="Prevention Protocol · Verified · Documented" />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-foreground/70 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
            Every scenario below was reported through the Seel-Tite Field Reports program. Names, roles, and settings are factual. Times are captured from Telemetry Module logs where available. All cases describe prevention — the G1 did its job, and nothing happened that anyone else noticed.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {scenarios.map((s) => (
              <ScenarioCard key={s.slug} {...s} kind="prevention" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
