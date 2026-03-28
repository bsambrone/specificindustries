import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { ProcessFlow } from "@/components/ui/process-flow"
import { StatStrip } from "@/components/ui/stat-strip"
import { ComparisonTable } from "@/components/ui/comparison-table"

export const metadata = {
  title: "The Science — Dehydrated Water Co.",
  description: "The patented Drywell Method, explained. Sort of.",
}

const steps = [
  {
    number: "01",
    title: "Aqueous Acquisition",
    description:
      "We begin by sourcing the finest water available — typically from a tap. Our water sommelier evaluates each batch for clarity, viscosity, and 'general wateriness.' Only water that meets our rigorous standard of 'being water' advances to the next stage. Patent reference: Drywell Method™ §1.1 — 'The Procurement of Base Hydrate'",
    image: "/sites/dehydratedwater/science-collection.png",
  },
  {
    number: "02",
    title: "Thermal Dissociation",
    description:
      "The water is heated until it transitions from a liquid to a gaseous state — a process scientists call 'evaporation' and we call 'Phase Liberation.' The steam rises, carrying with it the water's molecular identity. What remains is an empty container. This is, admittedly, a low point in the process. Patent reference: Drywell Method™ §2.3 — 'Controlled Atmospheric Release of Hydrate Essence'",
    image: "/sites/dehydratedwater/science-evaporation.png",
  },
  {
    number: "03",
    title: "Vapor Recapture",
    description:
      "Using a proprietary condensation apparatus (a cold surface), we recapture the liberated water vapor. The molecules are coaxed back into a semi-liquid state through what our Chief Science Officer calls 'whispering to the steam.' We do not endorse this characterization, but results speak for themselves. Patent reference: Drywell Method™ §3.7 — 'Molecular Repatriation via Thermal Gradient'",
    image: "/sites/dehydratedwater/science-capture.png",
  },
  {
    number: "04",
    title: "Final Dehydration",
    description:
      "The recaptured water undergoes our signature final dehydration phase. This is the step where we remove the water from the water. How? That's proprietary. Why? That's philosophical. The result is a fine, heritage-grade powder that contains the complete essence of water in a convenient, non-liquid format. Patent reference: Drywell Method™ §4.1 — 'Essence Extraction and Powderification'",
    image: "/sites/dehydratedwater/science-dehydration.png",
  },
]

export default function TheScience() {
  return (
    <>
      <Hero
        dark
        headline="The Science"
        subheadline="Our patented dehydration process, explained in terms that sound almost credible."
      />

      <WaveDivider variant="wave1" />

      <ProcessFlow steps={steps} />

      <StatStrip
        stats={[
          { icon: "📄", value: "0 Peer Reviews", label: "Submitted" },
          { icon: "📋", value: "0 FDA Responses", label: "Received" },
          { icon: "📖", value: "2 Blog Views", label: "All-time" },
        ]}
      />

      <ComparisonTable
        title="The Drywell Method™ vs. Other Approaches"
        columns={[
          { name: "Drywell Method", highlighted: true },
          { name: "Filtration" },
          { name: "Boiling" },
          { name: "Doing Nothing" },
        ]}
        rows={[
          { label: "Time Required", values: ["179 years", "Minutes", "Minutes", "None"] },
          { label: "Effectiveness", values: ["Theoretical", "Proven", "Proven", "Surprisingly High"] },
          { label: "Scientific Rigor", values: ["Aspirational", "Established", "Established", "N/A"] },
          { label: "Heritage Factor", values: ["7 generations", "None", "None", "Timeless"] },
          { label: "Patent Status", values: ["Pending since 1889", "Expired", "Public domain", "Not applicable"] },
        ]}
        footnote="Comparison conducted by Thaddeus Pemberton, who holds a degree from an institution he prefers not to name."
      />

      {/* Publications section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">Published Research</h2>
          <p className="text-foreground/60 mb-8">
            Our findings have been submitted to the following journals. None have responded.
          </p>
          <div className="space-y-4 text-foreground/70 text-sm italic">
            <p>&ldquo;On the Fundamental Wetness of Water and Its Remediation&rdquo; — <span className="text-foreground/50">Submitted to Nature, 2019. Status: Unacknowledged.</span></p>
            <p>&ldquo;Dehydrated Water: A Longitudinal Study of Nothing&rdquo; — <span className="text-foreground/50">Submitted to The Lancet, 2021. Status: Return to Sender.</span></p>
            <p>&ldquo;Negative Wetness: Theoretical Framework for Double-Dehydration&rdquo; — <span className="text-foreground/50">Self-published on Ezekiel&apos;s blog, 2024. 2 views.</span></p>
          </div>
        </div>
      </section>
    </>
  )
}
