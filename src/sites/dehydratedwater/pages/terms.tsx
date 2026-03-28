import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Dehydrated Water Co.",
  description: "By reading this, you have agreed to something. We're not sure what.",
}

export default function DehydratedWaterTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="By reading this sentence, you have entered into a binding agreement with a company that sells powder."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/40 italic">
            Effective: Retroactively, since 1847. Jurisdiction: The Drywell Estate, Vermont (fictional).
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Acceptance of Terms</h2>
          <p>
            By visiting this website, you agree to these terms. By reading these terms, you agree to them more.
            By purchasing our products, you agree to them the most. There is no mechanism for disagreeing.
            Ezekiel I designed it that way. He was a philosopher, not a democrat.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Product Disclaimers</h2>
          <p>
            Our products are not FDA-approved, not scientifically validated, and not, in the strictest sense,
            products. The &ldquo;Science Facts&rdquo; on our product pages are works of creative fiction.
            Any resemblance to actual science is coincidental and, frankly, surprising.
            If you consume our products based on anything you read here, that is a choice you have made,
            and we admire your adventurous spirit.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Limitation of Liability</h2>
          <p>
            Dehydrated Water Co. is not liable for: accidental hydration, surplus water, philosophical crises
            triggered by the nature of our products, marital disputes arising from unexplained purchases,
            or any damage caused by our Double-Dehydrated variant&apos;s theoretical &ldquo;Negative Wetness.&rdquo;
            We are also not liable for the behavior of Ezekiel V, who manages our customer retention department
            and can be &ldquo;persistent.&rdquo;
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Shipping &amp; Returns</h2>
          <p>
            Orders ship within 6-8 weeks via our preferred carrier (Ezekiel&apos;s nephew, when available).
            Returns are accepted only if the product has been accidentally hydrated. To return hydrated product,
            please ship the liquid water back to us in a standard paper envelope. We will not reimburse
            postage. We will not acknowledge the absurdity. This is our policy.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Intellectual Property</h2>
          <p>
            All content on this website — including the concept of dehydrating water, the Drywell Method™,
            and the phrase &ldquo;burdened by its own wetness&rdquo; — is the intellectual property of
            the Drywell family. We use the term &ldquo;intellectual&rdquo; aspirationally. Reproduction
            without permission is prohibited, though we&apos;d honestly be flattered.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Dispute Resolution</h2>
          <p>
            Disputes shall be resolved through binding arbitration conducted by Ezekiel IV in his study.
            He will listen to both sides, consult the original 1847 company charter (which is mostly
            water-stained and illegible), and render a decision within 90 days. His decisions are final.
            Appeals may be directed to Reginald the cat, who will ignore them.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of the Drywell Estate, a property in Vermont that operates
            under its own set of bylaws written in 1847 and never updated. In the event of a conflict
            between these bylaws and actual law, we defer to whichever is more favorable to us. This is
            not how law works, but it is how the Drywells have operated for seven generations.
          </p>

          <p className="text-sm text-foreground/40 italic border-t border-primary/10 pt-6">
            These terms are a work of satire. No legal obligations are created by visiting this website.
            No water — dehydrated or otherwise — was harmed in the making of these terms.
          </p>
        </div>
      </section>
    </>
  )
}
