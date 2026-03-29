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
            We use Google Analytics and Vercel Analytics to understand general usage patterns
            across our websites.
          </p>
          <p>
            <strong>Google Analytics</strong> uses cookies to collect anonymous, aggregated data
            such as page views, session duration, and general geographic region. Google Analytics
            does not collect personally identifiable information through our implementation. The
            data collected is governed by{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-accent underline hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s Privacy Policy
            </a>
            . You can opt out of Google Analytics by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              className="text-accent underline hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
          <p>
            <strong>Vercel Analytics and Speed Insights</strong> collect anonymous, aggregated
            performance metrics. They do not use cookies, do not track individual users, and do
            not collect personal information.
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
            Our websites use cookies set by Google Analytics to distinguish unique users and
            track sessions. These cookies do not contain personally identifiable information.
            When Google Ads is implemented in the future, additional advertising cookies will be
            introduced and this section will be updated accordingly.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Third-Party Services</h2>
          <p>
            Our websites use the following third-party services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Vercel</strong> — hosting, analytics, and performance monitoring</li>
            <li><strong>Google Analytics</strong> — website usage analytics</li>
          </ul>
          <p>
            Each service operates under its own privacy policy and terms of service.
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
          <p className="text-xs text-foreground/70">
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
