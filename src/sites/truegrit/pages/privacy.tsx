import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — True Grit Personal Care",
  description: "Our privacy policy. We handle your data with the same thoroughness we apply to personal hygiene.",
}

export default function TrueGritPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="We handle your data like we handle everything: thoroughly and without mercy."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              View Terms of Use
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: When you weren&apos;t looking. Grit level: Coarse.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Data Collection</h2>
          <p>
            By visiting this website, you agree that we collect your browsing data, purchase history,
            grit preferences, and the approximate duration of your bathroom visits (for research purposes).
            We also collect the audio levels detected from your device during product use, though we promise
            we only use this data to improve our products and occasionally to settle internal bets.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. How We Use Your Data</h2>
          <p>
            We use your data to recommend appropriate grit levels, suggest Recovery Balm quantities based on your
            purchase patterns, and to generate the anonymized statistics on our Aftermath page. If you&apos;re one of the
            73% who made a repeat purchase, your data contributed to that figure. You know who you are.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Data Sharing</h2>
          <p>
            We share your data with our abrasive material suppliers (for quality matching), our insurance
            underwriter (who has questions), and our legal team (who has concerns). We do not sell your data
            to third parties. Mainly because no third party has asked. The product descriptions tend to
            discourage inquiries.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Cookies</h2>
          <p>
            This website uses cookies that track your browsing behavior with the same persistence our
            products track your skin cells. They cannot be removed easily. Unlike our products, cookies
            are painless. Consider them the gentle part of the True Grit experience.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Your Rights</h2>
          <p>
            You have the right to request your data. You have the right to request its deletion.
            You have the right to an attorney, though that seems excessive for a toilet paper website.
            Exercise any of these rights by mailing a written request to our facility. The workers
            will read it during their break. They could use a laugh.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Security</h2>
          <p>
            Your data is stored on servers protected by the same industrial-grade materials we use in
            our products. This is not a metaphor. The server room is literally reinforced with sandpaper.
            It seemed thematic. Our IT department disagrees but has learned to pick their battles.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Changes to This Policy</h2>
          <p>
            We reserve the right to change this policy with the same lack of warning our products
            provide during first use. If you don&apos;t like it, you are welcome to stop buying sandpaper
            toilet paper. But the data stays. Like the memory of your first 40-grit session, it stays.
          </p>
        </div>
      </section>
    </>
  )
}
