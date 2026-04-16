import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Radium Roy's",
  description: "The terms under which Roy's office is delighted to do business with you.",
}

export default function RadiumRoysTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="The terms under which Roy's office is delighted to do business with you, friend."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/10 border border-secondary/20 rounded-lg p-4">
            The authoritative terms of use for all Specific Industries properties are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-secondary underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/privacy" className="text-secondary underline hover:text-primary transition-colors">
              View Privacy Policy
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: at the discretion of the General Counsel.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">1. Acceptance</h2>
          <p>
            By browsing radiumroys.specificindustries.com, placing an order, or simply admiring our hand-
            painted signage in person at the Burbank facility, you agree to be bound by these Terms of Use,
            and you confirm that you are an adult, an emancipated minor, or accompanied by a responsible
            relative who is also bound by these terms by extension.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">2. Acceptable Use</h2>
          <p>
            Radium Roy&apos;s products are intended for the use described in their respective catalog
            entries. The Tan-O-Matic 9000 is a tanning cabinet. The Cozy-Pet bedding is for pets. The
            Asbesto-Crisps are crackers. We have heard rumors of customers using our products in unintended
            ways and we politely ask that you stop. Roy is, in spirit, watching.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">3. Disclosures</h2>
          <p>
            All products sold through this site contain substances known to the State of California to cause
            cancer, birth defects, or other reproductive harm. This is by design. Please refer to our Quality
            Pledge for the full Roy Method. Disclosure labels are affixed to the outer packaging in a
            slightly larger font than the law requires. We are proud of our compliance.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">4. Refund Policy</h2>
          <p>
            All sales are final. Roy stands behind every product. Our products tend to stand behind
            themselves quite firmly as well — once integrated into your home, most items are physically and
            psychologically difficult to remove. We consider this a feature.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">5. Liability</h2>
          <p>
            To the fullest extent permitted by California law, Radium Roy&apos;s, the Pemberton family,
            Roy&apos;s estate, and the spirit of Roy himself shall not be liable for any direct, indirect,
            incidental, consequential, or speculative damages arising from your use of our products. You
            were warned, friend. Several times. In a slightly larger font than the law requires.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">6. Intellectual Property</h2>
          <p>
            All content on this website — including the Roy mascot, the Roy Method, the Tan-O-Matic name,
            Forever-Pan&trade;, Asbesto-Crisp&reg;, and the phrase &ldquo;better living through American
            ingenuity&rdquo; — is the intellectual property of Radium Roy&apos;s, a Specific Industries
            company. The Pemberton family retains additional ownership interests through arrangements that
            our General Counsel has chosen not to disclose.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">7. Dispute Resolution</h2>
          <p>
            Disputes shall be resolved through binding arbitration conducted at our Burbank facility before
            an arbitrator selected by Bertram J. Schoonover. Mr. Schoonover&apos;s decisions are final and
            have, to date, always favored the company. We consider this a strong track record.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">8. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of California, with which we have a complex
            and ongoing relationship. In the event of conflict between state, federal, and international
            law, we will defer to whichever interpretation Mr. Schoonover deems most agreeable.
          </p>
        </div>
      </section>
    </>
  )
}
