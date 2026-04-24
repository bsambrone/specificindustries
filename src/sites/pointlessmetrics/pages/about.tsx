import type { PageMetadata } from "@/themes"
import { InstituteSeal } from "@/components/ui/pointlessmetrics/InstituteSeal"

export const metadata: PageMetadata = {
  title: "About the Institute — ISPM",
  description: "Founded in 2011, the Institute for the Study of Pointless Metrics publishes peer-reviewed findings, sells precision instruments, and credentials practitioners.",
}

export default function PointlessMetricsAbout() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-6 mb-10">
          <InstituteSeal size={112} />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-1">About</p>
            <h1 className="font-heading text-4xl text-primary">The Institute</h1>
          </div>
        </div>

        <section className="prose prose-institutional max-w-none mb-12">
          <h2 className="font-heading text-2xl text-primary">Founding</h2>
          <p className="text-foreground/85">
            The Institute was founded in 2011 by Orrin Bletchley, a former McKinsey associate who, by his own admission, observed a correlation once and devoted the remainder of his professional life to the rest. Funding for the first three years came from a single unrestricted grant the source of which has since been lost to institutional memory.
          </p>
          <p className="text-foreground/85">
            The Institute is headquartered in a leased suite above a chartered accountant&apos;s office. It employs eleven full-time researchers, four adjunct faculty, a bookkeeper who does not wish to be named, and a golden retriever named Variable who appears in the wellness section of the quarterly transparency report.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-heading text-2xl text-primary mb-3">Theory of Correlation</h2>
          <p className="text-foreground/85 mb-3">
            The Institute holds that any two measurable phenomena are, in principle, correlable. Our research program does not concern itself with whether such correlations are causal, informative, or useful. We are interested in whether they exist.
          </p>
          <p className="text-foreground/85">
            We publish our findings unconditionally. We decline to editorialize. We leave interpretation to the practitioner — or, in the absence of one, to the reader&apos;s own intuition about what data is for.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-heading text-2xl text-primary mb-4">Our Three Pillars</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Measure", body: "If it is observable and non-zero, we will report on it." },
              { label: "Publish", body: "Fifty to sixty findings annually in the Quarterly Report and the Almanac." },
              { label: "Credential", body: "We certify practitioners through the fake peer-review process we designed ourselves." },
            ].map((p) => (
              <div key={p.label} className="bg-white border border-accent/40 p-4 rounded-sm">
                <h3 className="font-heading text-primary mb-1">{p.label}</h3>
                <p className="text-sm text-foreground/80">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-heading text-2xl text-primary mb-3">Transparency</h2>
          <p className="text-foreground/85 mb-3">
            The Institute publishes an annual transparency report summarizing revenue by stream (instruments, publications, advisory, credentialing, merchandise), operating expenses, and a narrative account of funding sources the Institute does not recall accepting but cannot rule out having deposited.
          </p>
          <p className="text-foreground/85 italic text-sm">
            The 2025 transparency report is currently embargoed pending an internal review of the review process.
          </p>
        </section>

        <aside className="relative bg-white border border-accent/40 p-6 rounded-sm">
          <h3 className="font-heading text-primary text-lg mb-2">Institutional Disclosure</h3>
          <p className="text-sm text-foreground/75 mb-1">
            ISPM is a for-profit research institute. It is not a 501(c)(3). Donations, if accidentally made, will be treated as subscriptions to the Quarterly Report and backfilled to the previous fiscal year.
          </p>
        </aside>
      </div>
    </main>
  )
}
