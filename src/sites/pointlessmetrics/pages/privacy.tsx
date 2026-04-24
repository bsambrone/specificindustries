import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Privacy Policy — Institute for the Study of Pointless Metrics",
  description: "How the Institute processes, indexes, and does not generally recall observational data gathered through its engagements.",
}

export default function PointlessMetricsPrivacy() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Institute Policy</p>
        <h1 className="font-heading text-4xl text-primary mb-6">Privacy Policy</h1>

        <aside className="bg-white border-2 border-primary/60 rounded-sm p-6 mb-10">
          <h2 className="font-heading text-lg text-primary mb-2">Umbrella Policy Notice</h2>
          <p className="text-sm text-foreground/85">
            The authoritative privacy policy governing data handling across all properties is published at{" "}
            <a href="https://specificindustries.com/privacy" className="underline text-primary">specificindustries.com/privacy</a>.
            That policy supersedes any statement on this page. The numbered sections below are supplementary, specific to the Institute&apos;s research and commercial operations, and should not be read as superseding the umbrella policy.
          </p>
        </aside>

        <Section n={1} title="Data We Observe">
          The Institute observes data during advisory engagements, credentialing cohorts, and routine operation of instruments returned for calibration. Observations are retained in the Institute&apos;s notional correlation index and are not generally indexable by the observed party.
        </Section>
        <Section n={2} title="Data We Decline to Observe">
          The Institute declines to observe any variable whose collection would require informed consent in more than one jurisdiction.
        </Section>
        <Section n={3} title="How We Process Your Observations">
          Observations are converted into x-values or y-values, plotted, and forgotten. If a correlation emerges, it is assigned to a principal investigator on a rotating basis. If none emerges, the observation is composted with the rest.
        </Section>
        <Section n={4} title="Cookies, and Also Crumbs, Which We Also Measure">
          The Institute&apos;s web property sets cookies for operational reasons it cannot precisely enumerate. It does not measure crumbs, but reserves the right to do so in future research.
        </Section>
        <Section n={5} title="Third Parties">
          The Institute shares data with third parties only where such sharing would itself be correlable with an outcome of research interest. Present third parties: zero.
        </Section>
        <Section n={6} title="Data Retention">
          Data is retained for the life of the Institute, plus one fiscal year.
        </Section>
        <Section n={7} title="Your Right to Be Forgotten by the Correlation Index">
          You may request removal from the Institute&apos;s correlation index by filing an observation (see /contact). Requests are reviewed on the first Thursday of each quarter. Most are granted.
        </Section>
        <Section n={8} title="Children">
          The Institute does not knowingly measure children. If we are measuring your child, a competent adult should intervene.
        </Section>
        <Section n={9} title="Changes to This Policy">
          This policy is revised annually, or when the Institute notices it has changed its mind.
        </Section>

        <p className="text-xs text-foreground/55 italic border-t border-accent/30 pt-6 mt-10">
          Last updated when we last remembered to update it.
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
