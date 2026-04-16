import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Radium Roy's",
  description: "How Roy's office handles your personal information, with the same wholesome care we bring to every product.",
}

export default function RadiumRoysPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="We handle your personal information with the same wholesome care we bring to every Radium Roy's product."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/10 border border-secondary/20 rounded-lg p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-secondary underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-secondary underline hover:text-primary transition-colors">
              View Terms of Use
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: when Bertram J. Schoonover finishes the current motion.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">1. What We Collect</h2>
          <p>
            Roy&apos;s office collects the same wholesome information any American consumer goods company has
            collected since 1952: your name, your home address, your telephone exchange, the products you
            order, the products you return (none, you cannot return our products), and a small notebook page
            listing every Radium Roy&apos;s product currently installed in your home, which we keep on file
            for warranty and inheritance purposes.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">2. How We Use It</h2>
          <p>
            We use your information to ship your orders, mail you our seasonal catalog, and occasionally
            check in by telephone to ask whether you have considered upgrading to the next Tan-O-Matic model.
            We do not sell your information to outside parties. We do, however, share it freely within the
            Pemberton family, who consider customer information to be a kind of extended family ledger.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">3. Data Retention</h2>
          <p>
            Roy&apos;s office retains your information indefinitely. Our Burbank document vault contains
            paper records dating back to 1952, and our policy is to add to it rather than subtract from it.
            If you wish to be removed from our records, you may submit a request in writing to Bertram J.
            Schoonover, who will add your request to his collection of pending matters.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">4. Cookies</h2>
          <p>
            Our website uses standard digital cookies to remember the contents of your shopping cart and to
            note which products you have lingered on. We do not consider this surveillance — we consider it
            attentive customer service, the kind your great-grandparents would have recognized from any good
            five-and-dime.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">5. Your Rights</h2>
          <p>
            Under the California Consumer Privacy Act and similar regulations in other jurisdictions, you may
            request a copy of all data we hold about you. We will mail it to you in a brown paper envelope,
            postage paid, within four to six business decades. If you wish to request deletion of your data,
            please refer to Section 3 above.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">6. Security</h2>
          <p>
            Your information is stored in a steel filing cabinet in our Burbank document vault, which is
            locked at night and unlocked in the morning by a member of the Pemberton family. We have not had
            a data breach in seventy-four years, in part because no one has ever attempted one.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">7. Changes to This Policy</h2>
          <p>
            We reserve the right to update this policy at any time. Changes will be communicated by mailing
            you a postcard, by updating this page, and by reading the new policy aloud at our annual
            Burbank holiday party, where you are always welcome.
          </p>
        </div>
      </section>
    </>
  )
}
