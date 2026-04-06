import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Elder Party",
  description: "Our terms of use. Your acceptance was registered before you arrived at this page.",
}

export default function ElderPartyTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="By existing in proximity to this document, you have already agreed to its provisions."
      />
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
            Effective: The moment you became aware the Elder Party existed. Expires: Not applicable.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Acceptance of Terms</h2>
          <p>
            By visiting this website, purchasing campaign merchandise, volunteering, attending a rally,
            or experiencing an intrusive dream in which a figure with indistinct features spoke to you
            about the importance of voting, you agree to be bound by these terms. Closing this tab
            constitutes acceptance. Not closing this tab also constitutes acceptance. The Party thanks
            you for your cooperation, which was anticipated.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Limitation of Liability</h2>
          <p>
            The Elder Party is not liable for dimensional side effects resulting from campaign activity,
            including but not limited to: mild reality distortion, involuntary glossolalia in the R&apos;lyehian
            dialect, perceived stretching of time near rally venues, unexplained awareness of deepwater
            geographic formations, or the sensation that you have always supported the Elder Party and
            merely forgot until recently. These are features of an engaged political awakening, not adverse events.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Product Disclaimers</h2>
          <p>
            Campaign merchandise is sold as described. Several items have demonstrated properties
            beyond their specifications that we have chosen not to suppress. The lapel pin&apos;s warmth
            is real and consistent. The robe&apos;s sense of familiarity is intentional. The Pocket
            Constitution&apos;s additional pages contain text the Elder Party considers foundational and
            the printing vendor considers &quot;outside our scope of engagement.&quot; These are
            not defects. Please stop filing them as defects.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Assumption of Risk</h2>
          <p>
            By engaging with the Elder Party in any capacity, you acknowledge the inherent risks of
            political participation at a cosmic scale. These include but are not limited to: heightened
            sensitivity to celestial alignments, difficulty explaining your political views to family
            members, a gradual preference for nocturnal activity, and the possibility that your
            understanding of democracy may evolve in directions not covered by your civics education.
            You accept these risks freely and without coercion, in the same way that one freely chooses
            to hear a sound one cannot un-hear.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Return Policy</h2>
          <p>
            Merchandise may not be returned once it has been removed from packaging. The packaging
            contains a brief acknowledgment of this policy printed in a font size our attorneys describe
            as &quot;compliant.&quot; Several items, once opened, decline to leave. This is noted in
            the product descriptions under the phrase &quot;feels like it was always yours.&quot; The
            Elder Party considers this an accurate and non-deceptive description of the customer experience.
            Refunds for unopened items may be requested within 13 days. The number is not a coincidence.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Dispute Resolution</h2>
          <p>
            Any disputes arising from these terms shall be resolved through binding arbitration conducted
            at a location and time to be determined by the Elder Party. The arbitrator will be selected
            by mutual agreement or, absent agreement, by whichever party has access to the older records.
            The Elder Party always has access to the older records. Decisions are final and shall be
            recorded in the party&apos;s ledger, which predates the arbitration by a margin we have not
            calculated and do not intend to.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of the jurisdiction in which they were drafted, which
            our legal team has described as &quot;partially overlapping with several recognized frameworks
            and partially outside them.&quot; In the event of a conflict between these terms and applicable
            law, the Party defers to whichever framework has existed longer. This has, in practice, resolved
            every conflict in our favor. We consider this a good sign.
          </p>
        </div>
      </section>
    </>
  )
}
