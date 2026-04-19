export const metadata = {
  title: "Privacy — Prechewed™",
  description: "Prechewed™ privacy policy. Governed by Specific Industries' umbrella policy; satirical body in the Prechewed™ voice.",
}

export default function PrechewedPrivacy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-semibold mb-8">Privacy Policy</h1>

      <aside className="p-5 rounded-lg border-2 mb-10" style={{ borderColor: "var(--color-primary, #5B3FD9)", background: "var(--color-surface-alt, #F1EFFA)" }}>
        <div className="text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>Umbrella policy</div>
        <p className="text-sm">
          The authoritative privacy policy governing all data handling is published by Specific Industries at{" "}
          <a className="underline" href="https://specificindustries.com/privacy">specificindustries.com/privacy</a>.{" "}
          That policy supersedes anything you read on this page.
        </p>
      </aside>

      <div className="flex flex-col gap-8 text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3">§1. Data We Collect</h2>
          <p>We collect your masticatory preferences, your pouch-opening telemetry, your jaw-hour audit trail, and your preferred flavor profile. We do not collect your saliva. Please stop asking.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§2. Cookies</h2>
          <p>Our cookies are pouch-flavored, for internal testing purposes only, and are not served to customers. Session-tracking cookies used by the website are disclosed in the Specific Industries umbrella policy above.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§3. Your Rights</h2>
          <p>You may request deletion of your bolus history at any time. Deletion requests are processed within 47 jaw-hours. We retain an anonymized aggregate of your preferences indefinitely for product development purposes.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§4. Data Retention</h2>
          <p>We retain your data until your jaw has forgotten. Specifically: until our internal systems no longer detect you as an active operator under the Daily Bolus protocol. This is typically 14 months post-cancellation.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§5. Third-Party Sharing</h2>
          <p>We share limited data with our Certified Masticators&apos; Union for compensation calculation purposes. We do not share data with advertisers, brokers, or third-party analytics providers. We share with our Kyoto office, which we consider first-party.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§6. International Transfers</h2>
          <p>Customer data is transferred to our Kyoto office for secondary review. This transfer is governed by a standard contractual clause we drafted internally and have not shared externally.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§7. Security</h2>
          <p>All customer data is protected by pouch-grade encryption. What this means, in practice, is that we take data security very seriously and decline to elaborate.</p>
        </section>
      </div>
    </main>
  )
}
