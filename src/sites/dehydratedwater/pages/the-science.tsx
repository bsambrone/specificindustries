import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"

export const metadata = {
  title: "The Science — Dehydrated Water Co.",
  description: "The patented Drywell Method, explained. Sort of.",
}

export default function TheScience() {
  return (
    <>
      <Hero
        headline="The Science"
        subheadline="Our patented dehydration process, explained in terms that sound almost credible."
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary">The Drywell Method™</h2>
          <p className="text-foreground/60 mt-4">
            A seven-step process perfected over 179 years. Each step is essential. None of them do anything.
          </p>
        </div>
      </section>

      <ImageTextSection
        image="/sites/dehydratedwater/science-collection.png"
        title="Step 1: Aqueous Acquisition"
        description={
          "We begin by sourcing the finest water available — typically from a tap. Our water sommelier evaluates each batch for clarity, viscosity, and 'general wateriness.' " +
          "Only water that meets our rigorous standard of 'being water' advances to the next stage.\n\n" +
          "Patent reference: Drywell Method™ §1.1 — 'The Procurement of Base Hydrate'"
        }
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/dehydratedwater/science-evaporation.png"
        title="Step 2: Thermal Dissociation"
        description={
          "The water is heated until it transitions from a liquid to a gaseous state — a process scientists call 'evaporation' and we call 'Phase Liberation.' " +
          "The steam rises, carrying with it the water's molecular identity. What remains is an empty container. This is, admittedly, a low point in the process.\n\n" +
          "Patent reference: Drywell Method™ §2.3 — 'Controlled Atmospheric Release of Hydrate Essence'"
        }
        imagePosition="right"
      />

      <ImageTextSection
        image="/sites/dehydratedwater/science-capture.png"
        title="Step 3: Vapor Recapture"
        description={
          "Using a proprietary condensation apparatus (a cold surface), we recapture the liberated water vapor. The molecules are coaxed back into a semi-liquid state " +
          "through what our Chief Science Officer calls 'whispering to the steam.' We do not endorse this characterization, but results speak for themselves.\n\n" +
          "Patent reference: Drywell Method™ §3.7 — 'Molecular Repatriation via Thermal Gradient'"
        }
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/dehydratedwater/science-dehydration.png"
        title="Step 4: Final Dehydration"
        description={
          "The recaptured water undergoes our signature final dehydration phase. This is the step where we remove the water from the water. " +
          "How? That's proprietary. Why? That's philosophical. The result is a fine, heritage-grade powder that contains the complete essence of water in a convenient, " +
          "non-liquid format.\n\n" +
          "Patent reference: Drywell Method™ §4.1 — 'Essence Extraction and Powderification'"
        }
        imagePosition="right"
      />

      {/* Credentials */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-6">
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            Peer-Reviewed (by peers who owed us favors)
          </span>
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            ISO 0000 Certified (pending)
          </span>
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            FDA Status: Unaware of Our Existence
          </span>
        </div>
      </section>

      {/* Publication */}
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
