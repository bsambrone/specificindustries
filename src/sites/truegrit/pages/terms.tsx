import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — True Grit Personal Care",
  description: "Our terms of use. By reading this, you've already agreed. And we're already not liable.",
}

export default function TrueGritTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="By reading this sentence, you acknowledge that 'comfort' is a relative term."
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
            Effective: The moment you thought about sandpaper toilet paper. Expires: Never. Like the memories.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Acceptance of Terms</h2>
          <p>
            By visiting this website, purchasing our products, or simply being aware that sandpaper toilet
            paper exists as a concept, you agree to be bound by these terms. Closing this tab does not
            constitute disagreement. Telling your friends about this website in disbelief constitutes
            marketing on our behalf, and we thank you.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Limitation of Liability</h2>
          <p>
            True Grit Personal Care is not liable for anything. Not for the abrasion (that&apos;s the product
            working), not for the bleeding (minor and expected), not for the crying (normal), not for the
            emotional journey (character building), and especially not for the AcidJet Bidet 3000 (you
            signed a 47-page waiver, and we meant every page of it).
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Product Disclaimers</h2>
          <p>
            Our products are exactly what they say they are: sandpaper, formatted for personal use.
            If you expected them to feel like conventional toilet paper, we admire your optimism.
            The terms &quot;gentle,&quot; &quot;sensitive,&quot; and &quot;comfortable&quot; are used
            exclusively in a relative, comparative sense. Relative to what? The 24-grit. Everything
            is gentle relative to the 24-grit.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Assumption of Risk</h2>
          <p>
            By purchasing any True Grit product, you assume all risk associated with applying industrial
            abrasives to your person. This includes but is not limited to: surface irritation, extended
            recovery periods, awkward conversations with your healthcare provider, and the inability to
            sit comfortably in meetings for a period that varies by grit selection.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Return Policy</h2>
          <p>
            We understand. We really do. But we cannot accept returns on opened products for reasons that
            should be self-evident. Unopened products may be returned within 30 days for a full refund,
            though the fact that you opened the box, looked at it, and sealed it back up tells us everything
            we need to know about your experience.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Dispute Resolution</h2>
          <p>
            Any disputes shall be resolved by binding arbitration conducted in our manufacturing facility.
            The arbitrator will be selected from our warehouse staff, all of whom have used the product
            and have strong, informed opinions. Their decision is final. Protective equipment will be
            provided for all parties during the proceedings.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of common sense, which we acknowledge we are testing
            the boundaries of. In the event of a legal challenge, we defer to the jurisdiction of
            wherever our founder Dale currently is, which is usually the workshop, looking concerned.
          </p>
        </div>
      </section>
    </>
  )
}
