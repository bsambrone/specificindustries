export const metadata = {
  title: "Privacy Policy — Whiskerworks",
  description: "How Whiskerworks handles your and your cat's data.",
}

export default function WhiskerworksPrivacy() {
  return (
    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-heading text-text">Privacy Policy</h1>

        <div className="mt-6 border-l-4 border-accent bg-accent/10 p-5 rounded-r-lg">
          <p className="font-bold text-text mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-text/80">
            The authoritative privacy policy for all Specific Industries properties — including Whiskerworks — is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="underline font-bold text-accent">specificindustries.com/privacy</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-text/60">
          Last updated: the Tuesday we discovered the footage had already been reviewed.
        </p>

        <h2 className="mt-8 text-xl font-heading text-primary">1. Information We Collect at Enrollment</h2>
        <p className="mt-2 text-text/80">
          At enrollment, we collect your name, billing address, payment information, cat&apos;s name, cat&apos;s approximate weight, and the human-identifying document your cat will be expected to forge as part of the Replace Your Human curriculum. This last item is optional, technically.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">2. Biometric Data</h2>
        <p className="mt-2 text-text/80">
          We collect your cat&apos;s paw prints, whisker spacing, tail length, and, for students in the Tactical Division, gait signature. This data is retained for the duration of enrollment plus 40 years. We may share it with our accreditation partner, which is to say ourselves.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">3. Cookies</h2>
        <p className="mt-2 text-text/80">
          We use session cookies to remember which division you browsed most recently. Your cat does not understand cookies — either kind — and we have found that attempting to explain the browser kind leads to attempts at the other kind.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">4. Data Sharing</h2>
        <p className="mt-2 text-text/80">
          We share enrollment data with our preferred lending partner, Regional Guaranteed Capital Solutions LLC, which is legally distinct from us despite sharing an office, staff, and revenue. We do not sell your data, unless an offer comes in that we describe internally as &ldquo;frankly interesting.&rdquo;
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">5. The Blackbook Division</h2>
        <p className="mt-2 text-text/80">
          The Blackbook Division maintains its own data policies. Those policies are not published. If you have been contacted regarding Blackbook enrollment, you already know how to proceed.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">6. Your Rights</h2>
        <p className="mt-2 text-text/80">
          You have the right to request a copy of your data. We retain the right to provide it on paper, printed single-sided, in a box, delivered in person. Turnaround time: 3-6 business quarters.
        </p>

        <p className="mt-10 text-sm italic text-text/60 pt-4 border-t border-text/10">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/privacy" className="underline text-accent">specificindustries.com/privacy</a>.
        </p>
      </div>
    </section>
  )
}
