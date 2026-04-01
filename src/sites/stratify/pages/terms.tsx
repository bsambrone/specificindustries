import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Stratify",
  description: "By reading this, you agree.",
}

export default function StratifyTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="By reading this sentence, you have agreed to the following terms."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-sm text-foreground/80 bg-secondary/20 border border-primary/15 rounded-lg p-4">
            The authoritative terms of use for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-secondary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-secondary transition-colors">
              View Privacy Policy
            </a>
          </p>
          <p className="text-sm text-foreground/60 italic">
            Effective date: Retroactively. Binding upon: You, specifically.
          </p>

          <p className="text-foreground/80">
            By accessing this website you acknowledge that Stratified Commerce And Marketing is not,
            has never been, and &mdash; despite what you may have read &mdash; will never be a multi-level
            marketing organization. Any resemblance to geometric shapes, living or dead, is purely
            coincidental.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">1. Definitions</h2>
          <ul className="space-y-3 text-foreground/80">
            <li><strong className="text-foreground">&ldquo;The Architecture&rdquo;</strong> — the organizational structure of Stratified Commerce And Marketing, which is not a pyramid</li>
            <li><strong className="text-foreground">&ldquo;Layer&rdquo;</strong> — a horizontal organizational unit within the Architecture; not a level</li>
            <li><strong className="text-foreground">&ldquo;Participant&rdquo;</strong> — an individual who has activated their position within the Architecture; not a distributor</li>
            <li><strong className="text-foreground">&ldquo;Yield&rdquo;</strong> — performance-derived compensation that flows through the Architecture; not commissions</li>
            <li><strong className="text-foreground">&ldquo;Value Distribution Event&rdquo;</strong> — a facilitated exchange of Stratify products with an end consumer; not a sale</li>
            <li><strong className="text-foreground">&ldquo;Elevation&rdquo;</strong> — the process of advancing to a higher Layer; not a promotion you pay for</li>
            <li><strong className="text-foreground">&ldquo;Subordinate Revenue Layer&rdquo;</strong> — Participants you have activated beneath you in the Architecture; not downline</li>
            <li><strong className="text-foreground">&ldquo;Recurring Commitment Protocol&rdquo;</strong> — monthly participation fee required to maintain active status; not a subscription you cannot cancel without a phone call</li>
            <li><strong className="text-foreground">&ldquo;Downward Stratification Adjustment&rdquo;</strong> — reduction in Layer standing due to insufficient yield activity; not demotion</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-secondary">2. Recurring Commitment Protocol</h2>
          <p className="text-foreground/80">
            Active status within the Architecture requires monthly participation in the Recurring
            Commitment Protocol (RCP). RCP fees are automatically charged to the payment method provided
            at onboarding on the first business day of each month. Cancellation of RCP participation
            triggers an automatic Downward Stratification Adjustment and a mandatory 3-hour Retention
            Conversation with your Executive Elevation Sponsor. The Retention Conversation is not
            optional. It is a benefit. Your Sponsor has been trained in Persuasive Alignment Techniques
            for your protection.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">3. Income Disclaimer</h2>
          <p className="text-foreground/80">
            Stratify makes no guarantees regarding income potential. In the most recent reporting period,
            94% of active Participants earned less than their total Recurring Commitment Protocol fees.
            This is by design. The Architecture is an aspirational framework, not an income replacement
            strategy, regardless of what was implied during your introductory webinar. The remaining 6%
            of Participants are featured prominently on our Success Stories page and are contractually
            required to attribute their results to the Architecture. Their experiences are not
            representative. They are representative of the Architecture&rsquo;s possibility space.
            There is a difference.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">4. Not a Pyramid</h2>
          <p className="text-foreground/80">
            Pyramids are ancient structures with no revenue model. We have a revenue model. It flows
            upward. This is different. A pyramid has no product. We have products. Whether anyone outside
            the Architecture purchases those products at full retail price is a separate question, and
            one we decline to answer in this document. The geometric similarity between a triangular
            organizational chart and a pyramid is acknowledged and is irrelevant. A triangle is also
            the shape of a piece of pizza, and no one is accusing Domino&rsquo;s of securities fraud.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">5. Regarding the Acronym</h2>
          <p className="text-foreground/80">
            We are aware that the initials of Stratified Commerce And Marketing form an unfortunate word.
            This was discovered after the letterhead was already printed. The name was chosen for its
            architectural resonance and alignment with our brand values of Stratification, Commerce,
            Alignment, and Marketing. We have reviewed this matter with legal counsel and have been
            advised to leave the name unchanged and stop bringing it up. Consider this section
            compliance with that advice.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">6. Limitation of Liability</h2>
          <p className="text-foreground/80">
            To the maximum extent permitted by law, Stratify shall not be liable for: financial loss
            resulting from participation in the Architecture; damaged family relationships arising from
            recruitment conversations at holiday gatherings; LinkedIn connection requests sent on your
            behalf by your Executive Elevation Sponsor; parking lot seminar injuries; motivational
            content that proved to be legally actionable; or the psychological effects of attending
            more than three consecutive Leadership Alignment Webinars. Participation is voluntary.
            The Architecture simply makes disengagement architecturally inconvenient.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">7. Governing Law</h2>
          <p className="text-foreground/80">
            These Terms of Use shall be governed by the laws of whichever jurisdiction is most
            favorable to us at the time of any dispute. Disputes shall be resolved through binding
            arbitration conducted by an arbitrator selected by Stratify, paid by Stratify, and
            briefed by Stratify. Our legal team is currently one person who is also a Layer 4
            Participant and therefore has a vested interest in the Architecture&rsquo;s success.
            We consider this a feature. He considers it a conflict of interest but has not yet
            figured out how to cancel his RCP.
          </p>
        </div>
      </section>
    </>
  )
}
