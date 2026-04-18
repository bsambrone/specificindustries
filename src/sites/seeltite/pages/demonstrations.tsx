import { Hero } from "@/components/ui/hero"
import { DemoSequenceBlock } from "../components/demo-sequence-block"
import { CautionStripe } from "../components/caution-stripe"
import { products } from "../data/products"

export const metadata = {
  title: "Demonstrations — Seel-Tite Containment Systems",
  description: "Eleven accessories. Eleven test-bench demonstrations. Before. Engaged. Complete.",
}

const ENGINEER_QUOTES: Record<string, string> = {
  "g1-containment-gasket": "The G1 is the reason every other product in this catalog exists. Every tolerance in the gasket was signed by Walter Thorne himself.",
  "the-grinder": "Sub-45dB is not a marketing number. It is an operational requirement. We tested in conference rooms, not anechoic chambers.",
  "salad-shooter-attachment": "The 1988 original had nine patents. We have twenty-three. Most of them involve sealing the hopper.",
  "cryo-puck-module": "The puck exits at -78°C. It warms to room temperature in fourteen minutes. In that window, there is no smell. There is no leak. There is a puck.",
  "pneumatic-ejector-kit": "Twelve grams of CO₂ will move a containment event 180 PSI worth of distance. That is the physics. The elegance is in the receiver cartridge.",
  "shopvac-adapter": "Contractors bought this accessory before we launched it. They told us what they needed and we built it.",
  "incinerator-module": "860°C for 0.9 seconds. The chamber is ceramic. The outer shell never exceeds 38°C. This is not witchcraft. This is thermodynamics.",
  "odor-cartridge-pack": "Linen tests best in formal scenarios. Cedar tests best in industrial settings. Workshop tests best in garages. The data is remarkably consistent.",
  "telemetry-module": "Four to twelve seconds of predictive lead time. The range is because human physiology varies. The haptic pattern does not.",
  "the-silencer": "Seventeen decibels of reduction. Measured. Audited. Reproducible. Acoustics is not opinion.",
  "secondary-gasket-redundancy": "Forty milliseconds. That is the engage time. That is the margin between continuity and interruption. We consider it generous.",
}

export default function SeeltiteDemonstrations() {
  return (
    <>
      <Hero
        headline="Demonstrations"
        subheadline="Every accessory. Before. Engaged. Documented by the engineers who built them."
      />
      <CautionStripe text="Bench-Tested · Field-Proven · Engineering-Approved" />
      <div>
        {products.map((p) => (
          <DemoSequenceBlock
            key={p.slug}
            product={p}
            pullQuote={ENGINEER_QUOTES[p.slug]}
          />
        ))}
      </div>
    </>
  )
}
