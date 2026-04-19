export const metadata = {
  title: "Terms of Service — Prechewed™",
  description: "Prechewed™ terms. Governed by the Specific Industries umbrella terms; satirical body in the Prechewed™ voice.",
}

export default function PrechewedTerms() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-semibold mb-8">Terms of Service</h1>

      <aside className="p-5 rounded-lg border-2 mb-10" style={{ borderColor: "var(--color-primary, #5B3FD9)", background: "var(--color-surface-alt, #F1EFFA)" }}>
        <div className="text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>Umbrella terms</div>
        <p className="text-sm">
          The authoritative terms of service governing use of all Specific Industries properties are published at{" "}
          <a className="underline" href="https://specificindustries.com/terms">specificindustries.com/terms</a>.{" "}
          Those terms supersede anything you read on this page.
        </p>
      </aside>

      <div className="flex flex-col gap-8 text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3">§1. Acceptance</h2>
          <p>Your acceptance of these terms is implied by opening any Prechewed™ pouch. Continued adherence to the Daily Bolus protocol constitutes affirmative, continued acceptance.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§2. Acceptable Use</h2>
          <p>Pouches are intended for single-operator pre-oral consumption. Chewing a Prechewed™ pouch is not prohibited, but is strongly discouraged. Reselling pouches, decanting pouch contents into unauthorized vessels, or using pouch contents in non-nutritional applications is prohibited.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§3. Operator Liability</h2>
          <p>Prechewed Labs assumes no liability for the state, condition, or ongoing functionality of your jaw. The Daily Bolus protocol is designed to reclaim jaw-hours, not to optimize jaw performance.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§4. Subscription &amp; Cancellation</h2>
          <p>Subscriptions renew quarterly. Cancellation is permitted at any time via certified letter to our Kyoto office, or via the contact form on this site. Please allow 47 jaw-hours for cancellation processing.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§5. Dispute Resolution</h2>
          <p>All disputes shall be resolved via Binding Bolus Arbitration™, administered by a single arbitrator selected from our internal panel. This is consistent with industry practice in the pre-oral nutrition space.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§6. Force Majeure</h2>
          <p>Prechewed Labs shall not be liable for delays or non-performance caused by war, earthquake, supply-chain disruption, Kyoto lab closure, or jaw fatigue.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">§7. Limitation of Liability</h2>
          <p>Total liability is limited, in aggregate, to the purchase price of the specific pouch at issue. This limitation applies whether the claim sounds in contract, tort, or emotional disappointment.</p>
        </section>
      </div>
    </main>
  )
}
