import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Terms of Service — Superengineered",
  description: "Terms governing use of Superengineered products and subscriptions.",
}

export default function SuperengineeredTerms() {
  return (
    <main className="bg-background py-20 px-4">
      <article className="max-w-3xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4">
          Legal
        </p>
        <h1 className="text-4xl font-heading font-light text-primary mb-10">
          Terms of Service
        </h1>
        <div className="space-y-6 text-primary/80 leading-relaxed">
          <p className="text-sm text-primary/50">Last updated: 2026-04-17</p>
          <p>
            By purchasing, activating, or otherwise engaging a Superengineered product, you agree to the following terms. These terms govern both the physical device and the SuperCloud+ subscription required for its operation.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            1. Subscription Requirement
          </h2>
          <p>
            Most Superengineered products require an active SuperCloud+ subscription to operate in their intended mode. Hardware ships in lockout mode and will remain inert until subscription activation.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            2. Firmware
          </h2>
          <p>
            Superengineered reserves the right to deploy firmware updates at its discretion. Updates may deprecate features, change bristle or bowl configurations, or require re-pairing of authenticated devices.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            3. Warranty
          </h2>
          <p>
            Warranties are contingent on an active subscription. Lapsed subscriptions void all warranty coverage.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            4. Limitation of Liability
          </h2>
          <p>
            Superengineered is not liable for missed brushing sessions, failed doorknob turns, un-illuminated rooms, or un-authenticated utensils resulting from subscription lapse, cloud outage, or scheduled maintenance.
          </p>
          <h2 className="text-2xl font-heading font-light text-primary mt-8 mb-3">
            5. Governing Law
          </h2>
          <p>
            These terms are governed by the laws of the State of California, without regard to conflict of laws principles.
          </p>
        </div>
      </article>
    </main>
  )
}
