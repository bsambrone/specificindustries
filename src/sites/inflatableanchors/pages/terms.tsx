import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"

export const metadata = {
  title: "Terms of Service — Inflatable Anchors Marine",
  description: "Our terms of service. Please read before inflating.",
}

export default function InflatableAnchorsTerms() {
  return (
    <>
      <Hero
        dark
        headline="Terms of Service"
        subheadline="By continuing to read, you agree to terms you haven't read yet."
      />
      <WaveDivider variant="wave1" />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            The authoritative terms of use for all Specific Industries properties are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              View Privacy Policy
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: Sometime between tides. We weren&apos;t paying close attention.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Acceptance of Terms</h2>
          <p>
            By using this website, you agree to these terms. By purchasing our products,
            you agree to even more terms. By inflating our products, you have entered into a
            binding agreement with air itself, and at that point, these terms are the least
            of your concerns. If you do not agree to these terms, please navigate away from
            this website. Your inflatable anchor, if deployed, will also navigate away. From
            everything. That&apos;s what it does.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Product Disclaimer</h2>
          <p>
            Inflatable Anchors Marine guarantees that your anchor will inflate. We make no
            further guarantees. Specifically, we do not guarantee that your anchor will
            anchor, hold, grip, clasp, secure, moor, berth, or otherwise prevent the lateral
            movement of any watercraft. Our product is an inflatable object shaped like an
            anchor. What you do with that information is between you and the sea.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Liability</h2>
          <p>
            We are not responsible for boats that drift, float, sail away, relocate without
            consent, visit neighboring marinas uninvited, cross international waters, or
            embark on journeys of self-discovery. We are also not responsible for seagull
            damage, sunburn sustained while inflating, arguments with dock neighbors about
            &ldquo;what counts as an anchor,&rdquo; or existential crises triggered by the
            realization that you paid money for an inflatable anchor. Captain Chuck has
            experienced all of the above and considers them part of the boating lifestyle.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Returns &amp; Refunds</h2>
          <p>
            All sales are final. Much like deploying an inflatable anchor in a strong
            current &mdash; once it&apos;s out there, it&apos;s out there. We accept exchanges
            for products that arrive in a non-inflatable state (i.e., won&apos;t inflate at all).
            If your anchor inflates but does not anchor, that is not a defect. That is the
            product performing as designed. If you used the Rapid Deflator on your anchor,
            that is also not a defect. That is you using the Rapid Deflator on your anchor.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Warranty</h2>
          <p>
            All products come with our &ldquo;Good Faith Guarantee,&rdquo; which guarantees,
            in good faith, that we put a product in the box. The Good Faith Guarantee covers
            manufacturing defects (holes present at time of purchase, missing valves, wrong
            color). It does not cover: punctures, UV degradation, encounters with marine life,
            encounters with the Rapid Deflator, over-inflation, under-inflation, inflation
            by unauthorized pumps, use in conditions involving water, or acts of seagull.
            &ldquo;Acts of seagull&rdquo; is defined at Captain Chuck&apos;s sole discretion.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Dispute Resolution</h2>
          <p>
            All disputes shall be resolved by Captain Chuck Denton in his office (the dock).
            Chuck will listen to your complaint, consult the company handbook (a laminated
            index card that says &ldquo;The customer is always drifting&rdquo;), and render a
            decision within one to three tides. Appeals may be directed to Big Mike Portside,
            who will agree with Chuck. Further appeals may be submitted to the seagull on
            the router, who has never responded to anything and is unlikely to start now.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time, for any reason, without
            notice. In practice, we have never modified them because no one has ever read them,
            including us. If we do modify them, the changes will take effect immediately and
            will be announced via a message in a bottle launched from Pier Nowhere. If you
            receive the bottle, the terms have changed. If you don&apos;t receive the bottle,
            the terms have still changed. This is how maritime law works. Probably.
          </p>
        </div>
      </section>
    </>
  )
}
