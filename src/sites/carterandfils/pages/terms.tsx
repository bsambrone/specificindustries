import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Service — Domaine Carter & Fils",
  description: "The terms of our association.",
}

export default function Terms() {
  return (
    <>
      <Hero
        headline="Terms of Service"
        subheadline="A plain statement of our mutual expectations."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          <p className="text-sm text-foreground/80 bg-secondary/40 border border-accent/30 p-4">
            The authoritative terms of service for all Specific Industries properties are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-primary underline hover:opacity-70 transition-opacity">specificindustries.com</a>.{" "}
            <a href="https://specificindustries.com/privacy" className="text-primary underline hover:opacity-70 transition-opacity">View Privacy Policy</a>
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary mt-8">1. The Association</h2>
          <p>
            By ordering from our cellar, you enter into a modest and considered association with the estate. We will endeavor to deliver the bottles you have chosen, in good condition, within a reasonable window of time. You will endeavor to enjoy them.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">2. Age</h2>
          <p>
            You represent that you are of legal drinking age in your jurisdiction. We will not verify this with any particular rigor, but we note the representation and rely upon it.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">3. Shipping</h2>
          <p>
            Our common carriers are instructed to handle the bottles with the care their contents deserve. Occasionally, they will not. In the event of a damaged shipment, please write to us and we will make you whole, without argument.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">4. Pricing &amp; Availability</h2>
          <p>
            Our prices are set annually by the Proprietor and reviewed each January. Vintages are produced in finite quantity. When a vintage is depleted, we will not, under any circumstance, reconstitute it.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">5. Wine Club</h2>
          <p>
            A wine club membership is a monthly commitment you may end at any time. Allocations reflect availability, and in shorter vintages the Platinum Collector tier is given first consideration, in the established tradition of the house.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">6. Intellectual Property</h2>
          <p>
            The estate&apos;s writings, photographs, and iconography are the property of the Carter family. You are welcome to share them, as a friend might share a well-turned phrase. You may not reproduce them for commerce.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">7. Disputes</h2>
          <p>
            In the event of a disagreement, we ask that you write to the Proprietor directly. The Carters have resolved more than one hundred sixty years of difficult conversations through letter-writing, and we find the medium encourages a degree of reflection that telephone calls do not.
          </p>
        </div>
      </section>
    </>
  )
}
