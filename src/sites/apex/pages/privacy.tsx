import { Hero } from "@/components/ui/hero"

export default function ApexPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="How we collect, use, and protect your information."
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
            how we collect, use, disclose, and safeguard your information when you visit any of our
            websites.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Information We Collect</h2>
          <p>We may collect information about you in the following ways:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Automatically collected data:</strong> When you visit our websites, we automatically
              collect certain information about your device, including your IP address, browser type,
              operating system, referring URLs, and pages visited. This data is collected through cookies,
              web beacons, and similar tracking technologies.
            </li>
            <li>
              <strong>Analytics data:</strong> We use Google Analytics to understand how visitors interact
              with our websites. Google Analytics collects information such as how often users visit our
              sites, what pages they visit, and what other sites they used prior to visiting. We use this
              information solely to improve our websites.
            </li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Cookies and Tracking Technologies</h2>
          <p>
            Our websites use cookies and similar tracking technologies to collect and store information.
            Cookies are small data files placed on your device. We use:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Essential cookies:</strong> Required for basic website functionality.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Used by Google Analytics to understand website usage patterns.
            </li>
            <li>
              <strong>Advertising cookies:</strong> Used by Google Ads and its partners to serve relevant
              advertisements and measure ad performance. These cookies may track your browsing activity
              across multiple websites to build a profile of your interests.
            </li>
          </ul>
          <p>
            You can control cookie preferences through your browser settings. Disabling certain cookies
            may affect website functionality.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Google Analytics</h2>
          <p>
            We use Google Analytics, a web analytics service provided by Google LLC. Google Analytics
            uses cookies to help us analyze how visitors use our websites. The information generated
            by cookies about your use of our websites is transmitted to and stored by Google on
            servers in the United States.
          </p>
          <p>
            We have enabled IP anonymization, which means your IP address is truncated before
            transmission to Google. Google will use this information to evaluate your use of our
            websites, compile reports on website activity, and provide other services related to
            website and internet usage.
          </p>
          <p>
            You can opt out of Google Analytics by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-primary transition-colors"
            >
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Google Ads</h2>
          <p>
            We use Google Ads to display advertisements on our websites. Google and its partners use
            cookies to serve ads based on your prior visits to our websites and other websites on
            the internet. This is known as personalized advertising.
          </p>
          <p>
            You can opt out of personalized advertising by visiting{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-primary transition-colors"
            >
              Google Ads Settings
            </a>. You can also visit{" "}
            <a
              href="https://optout.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-primary transition-colors"
            >
              www.aboutads.info
            </a>{" "}
            to opt out of third-party advertising cookies.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Third-Party Services</h2>
          <p>
            In addition to Google Analytics and Google Ads, we may use other third-party services
            that collect, monitor, and analyze visitor data, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Vercel Analytics and Speed Insights for performance monitoring</li>
            <li>Content delivery networks for serving website assets</li>
          </ul>
          <p>
            These third-party service providers have their own privacy policies governing the
            information they collect.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Operate and maintain our websites</li>
            <li>Understand how visitors use our websites to improve content and user experience</li>
            <li>Display relevant advertisements</li>
            <li>Monitor and analyze usage trends</li>
            <li>Detect and prevent technical issues</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-primary">8. Data Retention</h2>
          <p>
            We retain automatically collected data for as long as necessary to fulfill the purposes
            described in this policy. Google Analytics data is retained according to our configured
            retention settings and Google&apos;s data retention policies.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">9. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Access:</strong> You may request a copy of the personal data we hold about you.
            </li>
            <li>
              <strong>Deletion:</strong> You may request that we delete your personal data, subject
              to certain exceptions.
            </li>
            <li>
              <strong>Opt-out:</strong> You may opt out of the sale or sharing of your personal data
              for targeted advertising purposes.
            </li>
            <li>
              <strong>Do Not Track:</strong> We honor Do Not Track browser signals where technically feasible.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at the address below.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">10. Children&apos;s Privacy</h2>
          <p>
            Our websites are not directed to individuals under the age of 13. We do not knowingly
            collect personal information from children under 13. If you believe we have collected
            information from a child under 13, please contact us so we can promptly remove it.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date.
            Your continued use of our websites after any changes constitutes acceptance of the
            updated policy.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">12. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:{" "}
            <a
              href="mailto:privacy@specificindustries.com"
              className="text-accent underline hover:text-primary transition-colors"
            >
              privacy@specificindustries.com
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
