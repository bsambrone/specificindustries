import { Hero } from "@/components/ui/hero"

export default function ApexPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="How we handle your information."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/40 italic">
            Last updated: March 28, 2026
          </p>

          <p className="text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            <strong>Scope:</strong> This privacy policy governs all properties under specificindustries.com,
            including all subdomain sites. In the event of any conflict between this policy and any
            policy found on a subdomain property, this policy shall prevail.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Introduction</h2>
          <p>
            Specific Industries (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates
            specificindustries.com and its associated subdomain websites. This Privacy Policy explains
            how we handle information when you visit any of our websites.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. What We Do Not Collect</h2>
          <p>
            We do not collect, store, or process any personal data. We do not require account
            creation, login, or any form of user registration. We do not collect names, email
            addresses, or any other personally identifiable information through our websites.
            Any cart or shopping functionality on our subdomain sites is purely satirical and
            uses your browser&apos;s local storage only — no data is transmitted to our servers.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Analytics</h2>
          <p>
            We use Vercel Analytics and Vercel Speed Insights to understand general usage
            patterns across our websites. These services collect anonymous, aggregated data
            such as page views and performance metrics. They do not use cookies, do not track
            individual users, and do not collect personal information. There is no opt-out
            mechanism because no personal data is collected.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Advertising</h2>
          <p>
            We intend to display advertisements on our websites through Google Ads in the future.
            When implemented, Google and its advertising partners may use cookies to serve ads
            based on your browsing activity. This policy will be updated at that time to reflect
            the specific data collection and opt-out mechanisms associated with Google Ads. Until
            then, no advertising cookies are used on our websites.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Cookies</h2>
          <p>
            Our websites do not currently use cookies. When Google Ads is implemented in the
            future, advertising cookies will be introduced and this section will be updated
            accordingly.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Third-Party Services</h2>
          <p>
            Our websites are hosted on Vercel and use Vercel&apos;s analytics and performance
            monitoring services. These services operate under Vercel&apos;s own privacy policy.
            No other third-party services that collect user data are currently in use.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Children&apos;s Privacy</h2>
          <p>
            Our websites are entertainment sites intended for a general audience. We do not
            knowingly collect any personal information from anyone, including children under 13.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time, particularly when we introduce
            advertising services. We will notify you of any changes by posting the new policy on
            this page and updating the &ldquo;Last updated&rdquo; date. Your continued use of our
            websites after any changes constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">9. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:{" "}
            <a
              href="mailto:bsambrone@gmail.com"
              className="text-accent underline hover:text-primary transition-colors"
            >
              bsambrone@gmail.com
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
