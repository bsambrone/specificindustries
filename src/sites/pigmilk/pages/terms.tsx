import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Pig Milk Co.",
  description: "Our terms of use. By reading this, you've already agreed.",
}

export default function PigMilkTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="By reading this sentence, you have already agreed to all of the following."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/40 italic">
            Effective: Before you were born. Expires: Never.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Acceptance of Terms</h2>
          <p>
            By visiting this website, breathing near this website, or thinking about pig milk in any capacity,
            you agree to be bound by these terms. Closing this tab does not constitute disagreement. Looking
            away from your screen does not constitute disagreement. Nothing constitutes disagreement.
            You have agreed. Welcome.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Limitation of Liability</h2>
          <p>
            Pig Milk Co. is not liable for anything. Not for the quality of our pig milk (questionable),
            not for the accuracy of our nutritional facts (fictional), not for the behavior of our pigs
            (unpredictable), and especially not for whatever Sir Oinks-a-Lot does. He is his own entity
            and we have no control over him. Nobody does.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Product Disclaimers</h2>
          <p>
            Our products are not FDA-approved, not doctor-recommended, not scientist-endorsed, and not
            particularly enjoyed by anyone we&apos;ve surveyed. Any health claims on this website are
            entirely made up. &quot;Pig Energy&quot; is not a real unit of measurement. The nutritional
            facts panel is a work of creative fiction. If you actually consume pig milk based on anything
            you read here, that is entirely on you, and frankly we&apos;re impressed.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Intellectual Property</h2>
          <p>
            All content on this website — including text, images, product names, pig portraits, and the
            concept of milking pigs for commercial gain — is the intellectual property of Pig Milk Co.
            We use the term &quot;intellectual&quot; loosely. You may not reproduce, distribute, or
            display any of this content without our written permission, though honestly we&apos;d be
            flattered if you tried.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. User Conduct</h2>
          <p>
            You agree not to use this website for any purpose that is unlawful, harmful, or involves
            competing pig milk operations. You agree not to attempt to milk our pigs without authorization.
            You agree not to make eye contact with Duchess (she doesn&apos;t like it). You agree that
            Kevin is trying his best and you will not say otherwise.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Dispute Resolution</h2>
          <p>
            Any disputes arising from these terms shall be resolved by a panel of three pigs selected
            at random from our facility. Their decision is final. They will communicate their ruling
            through a series of oinks that Earl will interpret. Earl&apos;s interpretation is also final.
            There is no appeals process. The pigs have spoken.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of Hogtown, Wisconsin, a place we made up. In the event
            that Hogtown does not have applicable laws (it doesn&apos;t, because it&apos;s fictional),
            we will defer to whatever Earl thinks is fair. Earl is a reasonable man. He milks pigs for
            a living, but he is reasonable.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">8. Satire Disclaimer</h2>
          <p>
            This entire website is satire. Pig Milk Co. is not a real company. You cannot actually buy
            pig milk here. The checkout page will never work. This was always the plan. If you&apos;ve
            read this far, we respect your commitment and would like to offer you a position as
            our Legal Intern (unpaid, unlimited pig milk).
          </p>

          <p className="text-sm text-foreground/40 italic border-t border-primary/10 pt-6">
            These terms are a work of satire. No legal obligations are created by visiting this website.
            No pigs were consulted in the drafting of these terms, though several were present and appeared disinterested.
          </p>
        </div>
      </section>
    </>
  )
}
