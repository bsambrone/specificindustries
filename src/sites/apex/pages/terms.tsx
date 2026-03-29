import Link from "next/link"
import { Hero } from "@/components/ui/hero"

export default function ApexTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="Please read these terms carefully before using our websites."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/40 italic">
            Last updated: March 28, 2026
          </p>

          <p className="text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            <strong>Scope:</strong> These terms of use govern all properties under specificindustries.com,
            including all subdomain sites. In the event of any conflict between these terms and any
            terms found on a subdomain property, these terms shall prevail.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Acceptance of Terms</h2>
          <p>
            By accessing or using any website operated by Specific Industries, including
            specificindustries.com and all associated subdomain websites (collectively, the
            &ldquo;Sites&rdquo;), you agree to be bound by these Terms of Use. If you do not
            agree to these terms, please do not use the Sites.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Description of Service</h2>
          <p>
            Specific Industries operates a portfolio of websites for entertainment and satirical
            purposes. The content on our subdomain sites — including product descriptions, company
            histories, team biographies, pricing information, and checkout flows — is fictional
            and created for entertainment. No real products or services are offered for sale
            through any of our subdomain properties.
          </p>
          <p>
            The only non-satirical content on our Sites is this Terms of Use, our{" "}
            <Link href="/privacy" className="text-accent underline hover:text-primary transition-colors">
              Privacy Policy
            </Link>, and our{" "}
            <Link href="/disclaimer" className="text-accent underline hover:text-primary transition-colors">
              Disclaimer
            </Link>.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Intellectual Property</h2>
          <p>
            All content on the Sites — including text, graphics, logos, images, audio, video, and
            software — is the property of Specific Industries or its content suppliers and is
            protected by United States and international copyright laws. You may not reproduce,
            distribute, modify, create derivative works of, publicly display, or otherwise use
            any content from the Sites without our prior written consent.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Acceptable Use</h2>
          <p>You agree not to use the Sites to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violate any applicable local, state, national, or international law</li>
            <li>Attempt to gain unauthorized access to any portion of the Sites or any systems connected to the Sites</li>
            <li>Interfere with or disrupt the operation of the Sites or servers hosting the Sites</li>
            <li>Use any automated means to access or collect data from the Sites without our consent</li>
            <li>Misrepresent our satirical content as genuine product offerings or real business operations</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Disclaimers of Warranty</h2>
          <p>
            The Sites and all content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
            without warranties of any kind, either express or implied, including but not limited to
            implied warranties of merchantability, fitness for a particular purpose, and
            non-infringement. We do not warrant that the Sites will be uninterrupted, secure,
            or error-free.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Specific Industries shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, or any loss of
            profits or revenues, whether incurred directly or indirectly, arising from your use
            of or inability to use the Sites.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Specific Industries and its officers,
            directors, employees, and agents from any claims, liabilities, damages, losses, and
            expenses arising from your use of the Sites or your violation of these Terms.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">8. Governing Law</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance with the laws
            of the United States, without regard to conflict of law principles.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">9. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. We will notify you of
            changes by updating the &ldquo;Last updated&rdquo; date on this page. Your continued
            use of the Sites after any modifications constitutes acceptance of the updated terms.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">10. Contact Us</h2>
          <p className="text-xs text-foreground/70">
            If you have questions about these Terms of Use, please contact us at:{" "}
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
