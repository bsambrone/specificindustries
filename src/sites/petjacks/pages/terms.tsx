import LegalFooter from "@/sites/petjacks/components/legal-footer"

export const metadata = {
  title: "Terms of Service — Petjacks",
  description: "The Petjacks terms of service.",
}

export default function PetjacksTerms() {
  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">Terms of Service</h1>
          <p className="text-sm text-foreground/60 mb-8">Last updated: April 2026</p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-3">Use of Petjacks products</h2>
          <p className="text-foreground/70 leading-relaxed mb-4">
            By purchasing and operating a Petjacks product, you (the &quot;operator&quot;) agree to all terms set forth
            here, in the product documentation, and in the Liability Waiver form applicable to each flight.
            Electronic signatures are not accepted for liability waivers; the physical Liability Waiver Bundle
            must be used.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-3">Assumption of risk</h2>
          <p className="text-foreground/70 leading-relaxed mb-4">
            Operators acknowledge and accept the inherent risks of personal pet propulsion, including but not
            limited to: re-entry events, harness discompatibility, propulsion anomalies, capsule integrity
            events, disappearance, municipal code violations, and grief response. Operator affirms that these
            risks have been disclosed clearly and accepted willingly.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-3">Warranty</h2>
          <p className="text-foreground/70 leading-relaxed mb-4">
            Petjacks warrants its products to be free of manufacturing defects for 90 days from the date of
            purchase. Warranty coverage does not extend to re-entry events, roof impacts, fuel cell misuse,
            harness misfit, or any outcome occurring after the first successful ignition.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-3">Binding arbitration</h2>
          <p className="text-foreground/70 leading-relaxed mb-4">
            Any dispute arising from the use of Petjacks products is subject to binding individual arbitration
            under JAMS, venue Hamilton County, Ohio. Class action waivers apply.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-3">Governing law</h2>
          <p className="text-foreground/70 leading-relaxed">
            These terms are governed by the laws of the State of Ohio.
          </p>
        </div>
      </section>

      <LegalFooter />
    </>
  )
}
