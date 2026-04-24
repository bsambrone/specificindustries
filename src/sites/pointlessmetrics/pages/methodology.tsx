import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Methodology — ISPM",
  description: "How the Institute establishes significance, conducts peer review, discloses funding, and defines terms it has invented.",
}

const glossary: { term: string; definition: string }[] = [
  { term: "Synergy density", definition: "The notional concentration of cooperative potential in a bounded meeting space, expressed in vibe-units per cubic meter." },
  { term: "Vibe", definition: "A unit of perceived atmosphere. Directional; not directly addable." },
  { term: "Alignment", definition: "The degree to which two or more stated objectives are, in principle, not in open conflict." },
  { term: "Personal brand alignment", definition: "A measure of coherence between an individual's self-described professional identity and their observable Slack emoji usage." },
  { term: "Resonance", definition: "A cross-sectional average of vibe readings sampled at 40 Hz. Not to be confused with signal." },
  { term: "Gravitas", definition: "A non-linear unit of institutional presence. Measured using the Pocket Ruler for Intangibles (Model 3)." },
  { term: "Correlation", definition: "A measurable relationship between two variables. Causation neither implied nor discouraged." },
]

export default function PointlessMetricsMethodology() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Research Practice</p>
        <h1 className="font-heading text-4xl text-primary mb-2">Methodology</h1>
        <p className="text-foreground/70 mb-10 italic text-sm">Version 4.2 — adopted by the Institute's internal committee on 2025-11-03.</p>

        <section className="mb-10">
          <h2 className="font-heading text-2xl text-primary mb-3">§1 — How We Establish Significance</h2>
          <p className="text-foreground/85 mb-3">
            A finding is considered significant when (a) the measured r-value falls outside the interval [-0.70, 0.70], (b) the sample size exceeds seventy-five, and (c) at least one member of the principal research team believes the result to be interesting. Condition (c) is not waivable.
          </p>
          <p className="text-foreground/85">
            The Institute reports p-values in three categorical bins: <span className="tabular-nums">p &lt; 0.05</span>, <span className="tabular-nums">p &lt; 0.01</span>, and <span className="tabular-nums">p &lt; 0.001</span>. More precise values are not useful to the practitioner and are therefore not disclosed.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-2xl text-primary mb-3">§2 — Peer Review</h2>
          <p className="text-foreground/85 mb-3">
            All Institute findings undergo peer review by the Institute's internal review board, which consists of the four members of the Institute's leadership. Each submission is reviewed by two of the four, selected on a rotating basis. Conflicts of interest are managed through a gentleman's agreement.
          </p>
          <p className="text-foreground/85">
            The Institute does not publish rejected findings. This should not be read as an implication that such findings exist.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-2xl text-primary mb-3">§3 — Disclosure of Funding</h2>
          <p className="text-foreground/85 mb-3">
            Every finding carries a funding disclosure of the Institute's own composition. Disclosures are reviewed for accuracy against the Institute's memory of events, which is acknowledged to be imperfect.
          </p>
          <p className="text-foreground/85">
            Findings funded by organizations that requested a specific outcome are flagged as such in the disclosure line, where the requested outcome is also noted.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-2xl text-primary mb-3">§4 — Glossary of Terms We Invented</h2>
          <div className="bg-white border border-accent/40 rounded-sm overflow-hidden">
            <dl>
              {glossary.map((g, i) => (
                <div key={g.term} className={`grid grid-cols-[180px_1fr] gap-4 p-4 ${i !== glossary.length - 1 ? "border-b border-accent/20" : ""}`}>
                  <dt className="font-semibold text-primary text-sm">{g.term}</dt>
                  <dd className="text-sm text-foreground/85">{g.definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <p className="text-xs text-foreground/60 italic border-t border-accent/30 pt-6">
          This document is the Institute's position on methodology as of the version noted above. It is revised annually, or when the Institute notices it has changed its mind.
        </p>
      </div>
    </main>
  )
}
