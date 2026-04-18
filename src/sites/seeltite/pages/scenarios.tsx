import { Hero } from "@/components/ui/hero"
import { ScenarioCard } from "../components/scenario-card"
import { CautionStripe } from "../components/caution-stripe"
import { scenarios } from "../data/scenarios"

export const metadata = {
  title: "The Gambles We Won — Seel-Tite",
  description: "Eight documented prevention cases. We tooted with confidence. The G1 sealed it. Nobody noticed.",
}

export default function SeeltiteScenarios() {
  return (
    <>
      <Hero
        headline="The Gambles We Won."
        subheadline="We tooted. It was the right call."
      />
      <CautionStripe text="Prevention Protocol · Eight Gambles Won" />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-foreground/70 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
            Every one of these was a bet we took and a payoff we kept. The setting, the timing, and the quote are reported through the Field Reports program. Names and roles are real. The G1 did the actual work.
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
