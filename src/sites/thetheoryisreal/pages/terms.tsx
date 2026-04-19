import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Terms of Service — The Theory Is Real",
  description: "Conditions of use for this outlet and its associated commerce.",
}

export default function Terms() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">LEGAL</p>
      <h1 className="mt-2 font-heading text-4xl text-primary">Terms of Service</h1>
      <p className="mt-4 font-body text-sm text-text/60 italic">Last revised: as needed. We reserve the right.</p>

      <aside className="mt-8 p-5 rounded-lg border-2" style={{ borderColor: "var(--color-primary, #4a9c6d)", background: "var(--color-surface-alt, #0f1014)" }}>
        <div className="font-heading text-xs uppercase tracking-[0.2em] mb-2 text-accent">Umbrella terms</div>
        <p className="font-body text-sm text-text/85">
          The authoritative terms of service governing use of all Specific Industries properties are published at{" "}
          <a className="underline text-primary hover:opacity-80" href="https://specificindustries.com/terms">specificindustries.com/terms</a>.{" "}
          Those terms supersede anything you read on this page.
        </p>
      </aside>

      <div className="mt-10 flex flex-col gap-8 font-body text-base leading-relaxed text-text/85">
        <section>
          <h2 className="font-heading text-xl text-primary mb-3">§1. Acceptable Use</h2>
          <p>
            This outlet is provided for informational and research purposes. You may browse, share, and reference
            content published here, provided you do not remove attribution, misrepresent the source, or use the
            content to harass specific individuals. Automated scraping of this site is permitted only at rates that
            do not degrade availability for other users. We consider this a reasonable request. Act accordingly.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-primary mb-3">§2. Content Disclaimer</h2>
          <p>
            The observations presented here are the observations of the observers. They are reported in good faith
            as observations, not as verified facts, scientific findings, or medical advice. The Theory Is Real is a
            satirical publication. We are aware that some of our readers are aware of this, and some are not, and
            we ask the former to be patient with the latter. No content on this site is intended to incite harm,
            attribute specific criminal conduct to real individuals, or replace the advice of licensed professionals
            in any field.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-primary mb-3">§3. Products — Satire Notice</h2>
          <p>
            <strong className="text-primary font-semibold">All products offered in this shop are satirical novelty items.</strong>{" "}
            They are not intended for actual protective use of any kind, and make no genuine claims of efficacy
            against electromagnetic fields, surveillance, reptilian subjects, atmospheric dispersal agents, or any
            other threat, perceived or real. The product descriptions are written in a deadpan voice consistent
            with the rest of this publication and should be read accordingly. If you are purchasing these items
            as protective equipment, we encourage you to reconsider. They are gifts, gags, and conversation pieces.
            They will not shield you from anything.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-primary mb-3">§4. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, The Theory Is Real and its parent entity, Specific
            Industries, disclaim all liability for damages arising from your use of this site or its products.
            This includes direct, indirect, incidental, and consequential damages, regardless of theory of recovery.
            Total liability, where unavoidable, is limited to the purchase price of the specific item at issue.
            We say this not to be adversarial but because the legal system requires it.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-primary mb-3">§5. Changes to These Terms</h2>
          <p>
            We update these terms when circumstances require it. Updates are effective upon publication. Continued
            use of this site after an update constitutes acceptance of the revised terms. We do not send individual
            notification of changes. The operative version is the one published here on the date you are reading it.
            We recommend periodic review. We are aware most people do not do this.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-primary mb-3">§6. Jurisdiction</h2>
          <p>
            These terms are governed by the laws applicable in Coconino County, Arizona, United States, without
            regard to conflict-of-law provisions. Any legal action arising from use of this site or its products
            shall be brought in the appropriate courts of Coconino County. You consent to personal jurisdiction
            in that venue by using this site. We selected this jurisdiction carefully and for reasons we are not
            prepared to discuss in this document.
          </p>
        </section>
      </div>
    </main>
  )
}
