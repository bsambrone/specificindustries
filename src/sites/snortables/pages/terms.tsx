import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Snortables",
  description: "Our terms of use. You cannot un-snort a turkey.",
}

export default function SnortablesTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="By reading this sentence, you have already agreed. There is no going back. The powder has been measured."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-primary/5 border border-primary/10 rounded-lg p-4">
            The authoritative terms of use for all Specific Industries properties are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              View Privacy Policy
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: After the incident.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Acceptable Use</h2>
          <p>
            Snortables are for nasal use only. We are not responsible for &quot;creative applications&quot;
            described in your TikTok. Products should be insufflated using the provided Precision Delivery
            Apparatus or a reasonable facsimile thereof. &quot;Reasonable&quot; does not include garden hoses,
            leaf blowers, or industrial vacuum systems, all of which have been attempted by customers and
            none of which we endorse.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Liability</h2>
          <p>
            By purchasing Snortables you acknowledge that you are voluntarily snorting a powdered meal
            and that this is, objectively, a strange thing to do. Snortables Inc. is not liable for any
            adverse effects including but not limited to: sneezing, sinus discoloration, involuntary
            food memories, nostalgic episodes triggered by the Sunday Roast, or the gradual alienation
            of friends and family who &quot;just don&apos;t get it.&quot;
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Product Disclaimers</h2>
          <p>
            Our products are not FDA-approved. They are not doctor-recommended. They are not endorsed
            by any medical professional, nutritionist, or person with a functioning sense of self-preservation.
            The &quot;Science Facts&quot; on our product pages are not facts. The science is not science.
            If you make health decisions based on anything you read on this website, that is entirely on you,
            and frankly, we admire your commitment.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Refund Policy</h2>
          <p>
            All sales are final. You cannot un-snort a turkey. We have consulted with physicists and they
            confirm that the thermodynamic arrow of time prevents the reversal of intranasal nutrient delivery.
            If you are unsatisfied with your purchase, you may write a strongly worded letter to our
            Director of Regulatory Avoidance, who will add it to his collection.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Intellectual Property</h2>
          <p>
            All content on this website — including text, images, product formulas, the concept of
            snorting a roast beef dinner, and the phrase &quot;From Farm to Nostril™&quot; — is the
            intellectual property of Snortables Inc. We use the term &quot;intellectual&quot; aspirationally.
            NasalMill™, NasalAbsorb™, NasalFuel™, and &quot;Why Eat When You Can Insufflate?&quot; are
            trademarks of Snortables, a Specific Industries company.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Dispute Resolution</h2>
          <p>
            Any disputes arising from these terms shall be resolved through binding arbitration conducted
            in our pulverization facility. The arbitrator will be selected by our Head of Pulverization
            Sciences, who will also operate the wood chipper during proceedings. His decision is final.
            The wood chipper is also final.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of California, or whichever jurisdiction
            our Director of Regulatory Avoidance is currently avoiding. In the event of a conflict between
            state, federal, and international law, we will defer to whichever interpretation allows us
            to continue pulverizing food and selling it as nasal powder. We have lawyers. Fourteen of them.
            They are tired.
          </p>
        </div>
      </section>
    </>
  )
}
