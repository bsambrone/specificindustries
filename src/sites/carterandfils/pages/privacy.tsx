import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Domaine Carter & Fils",
  description: "Our approach to the private correspondence of our clientele.",
}

export default function Privacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="Discretion, maintained since 1859."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          <p className="text-sm text-foreground/80 bg-secondary/40 border border-accent/30 p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-primary underline hover:opacity-70 transition-opacity">specificindustries.com</a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-primary underline hover:opacity-70 transition-opacity">View Terms of Use</a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last revised in the quiet hours of the cellar office. Version 7.0, printed on the estate&apos;s good paper.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary mt-8">1. What We Collect</h2>
          <p>
            We collect what the considered operation of a winery requires: your name, your correspondence, your shipping address, and a running record of the bottles you have enjoyed. We find this last category particularly instructive and it informs our subsequent recommendations.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">2. Our Discretion</h2>
          <p>
            The Carter family has held the confidence of its clientele for seven generations. We do not share your information, except with the small number of vendors and logistics partners who must handle your bottles on their way to your cellar. We ask them to be similarly discreet.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">3. The Ledger</h2>
          <p>
            A physical ledger is maintained in the cellar office, in the hand of our Cellar Master. Your purchases are recorded there in ink. This ledger has never left the property. It will not leave the property.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">4. Cookies &amp; The Cellar Door</h2>
          <p>
            Our website uses small browser cookies to remember you and to support the function of the cart. These are not edible and are, regrettably, not comparable to the pastries served in the tasting room. You may disable them in your browser at any time, though some pages may become less hospitable as a result.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">5. Your Rights</h2>
          <p>
            You may request that we remove your name from the ledger at any time. We will do so with some quiet regret. We do not, however, forget the bottles themselves; a wine remembers its drinker in ways we cannot overwrite.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">6. Security</h2>
          <p>
            Electronic records are kept on a single computer in the estate office. The office is locked each evening with the same brass key Henri Carter used in 1938. The key is worn smooth. It has never been copied.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">7. Revisions</h2>
          <p>
            We may revise this policy from time to time, as the considered stewardship of an estate occasionally requires. Material revisions will be noted on your next correspondence. Inconsequential revisions will not trouble you.
          </p>
        </div>
      </section>
    </>
  )
}
