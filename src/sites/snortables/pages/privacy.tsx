import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Snortables",
  description: "Our privacy policy. We know what you snorted.",
}

export default function SnortablesPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="We take your privacy as seriously as we take intranasal nutrient delivery. Which is to say: very seriously, in a way that concerns most people."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-primary/5 border border-primary/10 rounded-lg p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              View Terms of Use
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: Whenever our legal team stops crying.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. What We Collect</h2>
          <p>
            We collect your name, email, shipping address, nostril dimensions (for product optimization),
            preferred insufflation hand (left or right), and a detailed log of every product you&apos;ve
            snorted, including timestamps, quantities, and any involuntary facial expressions captured
            by our website&apos;s webcam integration (which we have not disclosed until this sentence).
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. What We Don&apos;t Collect</h2>
          <p>
            Judgment. We are in no position. We run a company that pulverizes Thanksgiving dinners
            into snortable powder. If you&apos;re here, you&apos;ve already made a series of choices
            that put you beyond the reach of conventional privacy concerns.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Data Sharing</h2>
          <p>
            We share your data with our partners, which currently include our lawyer, a guy named Dave
            who runs our shipping van, and an AI model that generates your quarterly &quot;State of Your
            Nostrils&quot; report. We may also share your data with regulatory bodies, but only if they
            figure out how to open our encrypted files (password: snortables123).
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Cookies</h2>
          <p>
            We considered snortable cookies but the focus group was... unsettling. Instead, we use
            standard digital cookies to track your browsing behavior, purchase history, and how long
            you hover over the JOLT product page before closing the tab and reopening it four times.
            We see you. We understand. Just buy it.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Your Rights</h2>
          <p>
            You have the right to request deletion of your data. We have the right to pulverize that
            request into a fine powder and insufflate it. Under GDPR, CCPA, and several other acronyms
            our legal team pretends to understand, you may request a copy of all data we hold about you.
            It will arrive in powder form, consistent with our brand.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Security</h2>
          <p>
            Your data is stored on servers protected by 256-bit encryption and a guy named Dave who
            also does our shipping. Dave is very reliable. He has never lost a package or a database.
            Our security has been audited by an independent firm that we found on Craigslist and have
            not heard from since.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Changes to This Policy</h2>
          <p>
            We reserve the right to change this policy at any time. Changes will be communicated by
            updating this page, which no one reads, and by including a small note in your next shipment,
            which no one reads either. Your continued use of Snortables constitutes acceptance of whatever
            we&apos;ve written here, including this sentence, which is legally binding.
          </p>
        </div>
      </section>
    </>
  )
}
