import Link from "next/link"
import { Hero } from "@/components/ui/hero"

export default function ApexDisclaimer() {
  return (
    <>
      <Hero
        headline="Disclaimer"
        subheadline="Important information about Specific Industries and its subsidiary brands."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <h2 className="text-2xl font-heading font-bold text-primary">Satire & Entertainment Notice</h2>
          <p>
            All brands, products, and services depicted on Specific Industries properties — including
            all subdomain websites — are <strong>fictional</strong> and created entirely for
            entertainment and satirical purposes. None of the products described on our subsidiary
            websites are real, available for purchase, or endorsed by any actual company or organization.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">No Real Products or Services</h2>
          <p>
            The subsidiary brands operated under the Specific Industries umbrella are works of humor.
            Product descriptions, nutritional information, company histories, team biographies, pricing,
            and any other content presented on these sites are entirely fictional. Any checkout or
            purchase flows are non-functional and exist solely as part of the satirical experience.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">No Professional Advice</h2>
          <p>
            Nothing on any Specific Industries property constitutes medical, legal, financial, nutritional,
            or any other form of professional advice. Any claims, statistics, or scientific-sounding
            language on our subsidiary sites are fabricated for comedic effect and should not be relied
            upon for any purpose.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">Resemblance to Real Entities</h2>
          <p>
            Any resemblance between our fictional brands and real companies, products, or persons is
            purely coincidental. Specific Industries is a real entity that operates these satirical
            websites; the subsidiary brands themselves are not real businesses.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">Authoritative Policies</h2>
          <p>
            While our subsidiary sites may contain their own humorous privacy policies and terms of use
            as part of the satirical experience, the only legally binding policies governing your use
            of any Specific Industries property are the{" "}
            <Link href="/privacy" className="text-accent underline hover:text-primary transition-colors">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-accent underline hover:text-primary transition-colors">
              Terms of Use
            </Link>{" "}
            published on this domain (specificindustries.com).
          </p>
        </div>
      </section>
    </>
  )
}
