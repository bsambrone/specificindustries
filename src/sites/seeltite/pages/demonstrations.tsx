import { Hero } from "@/components/ui/hero"
import { DemoSequenceBlock } from "../components/demo-sequence-block"
import { CautionStripe } from "../components/caution-stripe"
import { products } from "../data/products"

export const metadata = {
  title: "The Lab — Seel-Tite",
  description: "Every accessory. Before. Engaged. Toot Verified.",
}

const ENGINEER_QUOTES: Record<string, string> = {
  "g1-containment-gasket": "The G1 is the only product in the catalog everybody has to buy. Everything else is optional.",
  "the-grinder":            "Sub-45 decibels isn't a marketing claim. It's a requirement. Conference rooms are quieter than you think.",
  "salad-shooter-attachment": "Jim bought the 1988 Presto because he loved the mechanism. Thirty-eight years later, here we are.",
  "cryo-puck-module":       "The puck thaws in fourteen minutes. In those fourteen minutes, there is no smell, no leak, nothing. Just a puck.",
  "pneumatic-ejector-kit":  "Twelve grams of CO₂ moves a lost gamble a very specific distance at 180 PSI. The receiver cartridge is where the art is.",
  "shopvac-adapter":        "Contractors asked for this before we shipped it. We listened.",
  "incinerator-module":     "860°C for nine-tenths of a second. Outer shell stays at 38°C. It's ceramic. It's thermodynamics. It's fine.",
  "odor-cartridge-pack":    "Linen wins in formal wear. Cedar wins in industrial. Workshop wins in the garage. Data is remarkably consistent.",
  "telemetry-module":       "Four to twelve seconds of predictive lead time. That range is because human bodies vary. The alert itself does not.",
  "the-silencer":           "Seventeen decibels of reduction. Measured. Reproducible. Acoustics is not opinion.",
  "secondary-gasket-redundancy": "Forty milliseconds of engage time. That's the margin between a lost gamble and a saved career.",
}

export default function SeeltiteDemonstrations() {
  return (
    <>
      <Hero
        headline="The Lab."
        subheadline="Every accessory. Bench-tested, field-proven, Toot Verified."
      />
      <CautionStripe text="Bench-Tested · Field-Proven · Toot Verified" />
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
