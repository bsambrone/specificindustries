import { Hero } from "@/components/ui/hero"
import { ScenarioCard } from "../components/scenario-card"
import { CautionStripe } from "../components/caution-stripe"
import { recoveryCases } from "../data/recovery"

export const metadata = {
  title: "The Gambles We Lost — Seel-Tite",
  description: "Eight documented recovery cases. We tooted. It was the wrong call. The right accessory made it not matter.",
}

export default function SeeltiteRecovery() {
  return (
    <>
      <Hero
        headline="The Gambles We Lost."
        subheadline="We tooted. It was the wrong call. The accessory covered for us."
      />
      <CautionStripe text="Recovery Protocol · Eight Gambles Lost · Zero Embarrassment" />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-foreground/70 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
            Sometimes the bet goes wrong. Every one of these was a moment that would have ended a wedding, a meeting, a flight, or a career — and instead ended at the accessory that was already paired with the G1. The gamble still lost. Nobody found out.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {recoveryCases.map((r) => (
              <ScenarioCard key={r.slug} {...r} kind="recovery" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
