import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Terms of Use — Institute for the Study of Pointless Metrics",
  description: "The terms governing your use of the Institute's instruments, publications, advisory services, credentialing, and merchandise.",
}

export default function PointlessMetricsTerms() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Institute Policy</p>
        <h1 className="font-heading text-4xl text-primary mb-6">Terms of Use</h1>

        <aside className="bg-white border-2 border-primary/60 rounded-sm p-6 mb-10">
          <h2 className="font-heading text-lg text-primary mb-2">Umbrella Terms Notice</h2>
          <p className="text-sm text-foreground/85">
            The authoritative terms of use governing all properties are published at{" "}
            <a href="https://specificindustries.com/terms" className="underline text-primary">specificindustries.com/terms</a>.
            Those terms supersede any statement on this page. The numbered sections below are supplementary and specific to Institute operations.
          </p>
        </aside>

        <Section n={1} title="Acceptance">
          Your continued use of the Institute&apos;s properties, instruments, or credentials constitutes acceptance of these terms in the form most recently published.
        </Section>
        <Section n={2} title="Definitions">
          &quot;Finding&quot; means a correlation the Institute has published. &quot;Instrument&quot; means a physical object issued by the Institute. &quot;Engagement&quot; means any billable interaction with Institute staff in excess of fifteen minutes.
        </Section>
        <Section n={3} title="Commerce">
          Purchases are final. Refunds are notional. Digital goods are deemed delivered at the moment of checkout.
        </Section>
        <Section n={4} title="Acceptable Use of Reusable and Non-Reusable Instruments">
          The Vibe Ring, Synergy Obelisk, Tarnishing Plaque, and Ambient Mood Barometer may be used in any commercial, residential, or contemplative setting. They may not be used competitively against other Institute products without written consent.
        </Section>
        <Section n={5} title="Use of the Pocket Ruler for Intangibles">
          The Pocket Ruler is calibrated for measurements of gravitas, vibe, optionality, runway, and warmth. Any other use voids the warranty and any claims arising from such use.
        </Section>
        <Section n={6} title="Credentialing">
          The Certified Pointless Metrics Practitioner™ credential is non-transferable, non-stackable, and not accredited. The Institute retains the right to revoke any credential for cause, or without cause, or in error.
        </Section>
        <Section n={7} title="Advisory Engagements">
          All advisory engagements are governed by a separate engagement letter drafted by the Institute. The letter supersedes these terms to the extent of any conflict, unless the conflict is of research interest.
        </Section>
        <Section n={8} title="Credential Revocation Procedures">
          Credentials may be revoked by the Dean of the Practitioner Program at any time. Revoked practitioners may appeal in writing. Appeals are reviewed on the same first-Thursday-of-each-quarter schedule as all Institute correspondence.
        </Section>
        <Section n={9} title="Warranty">
          Instruments are warranted for the life of the Institute, minus any period during which the Institute is in reorganization.
        </Section>
        <Section n={10} title="Limitation of Liability">
          The Institute&apos;s liability is limited to the purchase price of the instrument or service at issue. Findings, being non-causal, carry no liability whatsoever.
        </Section>
        <Section n={11} title="Disputes Regarding Posthumously-Assigned r-Values">
          Any dispute regarding an r-value assigned to a Certified Measured™ Wall Plaque after the recipient&apos;s death shall be resolved by the recipient&apos;s estate in consultation with the Institute&apos;s internal review board.
        </Section>

        <p className="text-xs text-foreground/55 italic border-t border-accent/30 pt-6 mt-10">
          These terms are current as of the last internal committee meeting at which terms were discussed.
        </p>
      </div>
    </main>
  )
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="font-heading text-lg text-primary mb-1">§{n} — {title}</h2>
      <p className="text-sm text-foreground/85">{children}</p>
    </section>
  )
}
