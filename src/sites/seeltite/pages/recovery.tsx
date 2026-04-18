import { Hero } from "@/components/ui/hero"
import { ScenarioCard } from "../components/scenario-card"
import { CautionStripe } from "../components/caution-stripe"
import { recoveryCases } from "../data/recovery"

export const metadata = {
  title: "Recovery — The System Engaged | Seel-Tite Containment Systems",
  description: "Eight documented recovery cases. Primary seal breached. The accessory engaged. Nobody noticed.",
}

export default function SeeltiteRecovery() {
  return (
    <>
      <Hero
        headline="The System Engaged."
        subheadline="Eight documented recovery cases. Primary seal breached. The appropriate accessory deployed. Continuity preserved."
      />
      <CautionStripe text="Recovery Protocol · System Integrity · Continuity" />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-foreground/70 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
            Prevention is the baseline. Recovery is the promise. When a primary seal breach is detected, the Seel-Tite system engages whichever accessory the user has configured — Grinder, Salad Shooter, Cryo-Puck, Pneumatic Ejector, Shop-Vac Adapter, Incinerator, Silencer, Odor Cartridge, Backup Gasket, or Telemetry-triggered combinations — and the scenario continues uninterrupted.
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
