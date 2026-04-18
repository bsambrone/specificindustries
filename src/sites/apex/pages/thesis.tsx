import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { CriteriaList, type CriteriaItem } from "@/components/ui/criteria-list"
import { MetricStrip, type Metric } from "@/components/ui/metric-strip"
import { getAllPortfolioBrands } from "../data/portfolio-utils"

const INVESTMENT_CRITERIA: CriteriaItem[] = [
  {
    heading: "Total addressable market under 11,000 people",
    description: "We invest exclusively in categories whose participants could, in theory, fit in a mid-sized auditorium.",
  },
  {
    heading: "Product category that arguably should not exist",
    description: "Categories that survive an internal review of whether they should exist are, in our view, more interesting than ones that do not.",
  },
  {
    heading: "Unclear revenue model (preferred)",
    description: "We have found that brands with fully articulated revenue models tend to overcommit. Ambiguity is retained as a feature.",
  },
  {
    heading: "No meaningful competition",
    description: "We prefer categories no one else has bothered with. The absence of competition is, to us, the defining signal.",
  },
  {
    heading: "Founder willing to commit indefinitely",
    description: "We invest for indefinite horizons. Founder-patience is a prerequisite.",
  },
  {
    heading: "Minimum 1 ridiculous aspect per brand",
    description: "A brand should have at least one attribute that, on first encounter, raises a question the brand is prepared to answer calmly.",
  },
]

const FRAMEWORK_STEPS = [
  { letter: "S", title: "Segment identification", text: "We begin by identifying a consumer or industrial segment that has not yet been given a name by anyone else." },
  { letter: "P", title: "Premise interrogation", text: "The segment's underlying premise is interrogated, briefly, to ensure it has not been previously ruled out in writing." },
  { letter: "E", title: "Economic justification", text: "Economic justification is reviewed on a case-by-case basis and may be waived if the satirical integrity is sufficient." },
  { letter: "C", title: "Commitment timeline", text: "The founder's indefinite-operation commitment is verified in writing." },
  { letter: "I", title: "Incubation", text: "The brand is incubated within the portfolio, in whatever form it arrives in." },
  { letter: "F", title: "First-to-market positioning", text: "The brand is positioned as first-to-market in its category, which is achievable in every case." },
  { letter: "I", title: "Indefinite operation", text: "The brand is operated indefinitely. No sunset criterion is established." },
  { letter: "C", title: "Capital event", text: "A capital event is theoretically contemplated at an unspecified future date." },
]

export default function ApexThesis() {
  const brandCount = getAllPortfolioBrands().length

  const metrics: Metric[] = [
    { value: String(brandCount), label: "Brands launched" },
    { value: "0", label: "Brands wound down" },
    { value: "Under review", label: "Brands profitable" },
    { value: "<11,000", label: "People per market (max)" },
    { value: "$0", label: "Outside capital committed" },
    { value: "Indefinite", label: "Hold period" },
  ]

  return (
    <>
      <Hero
        headline="Investment Thesis"
        subheadline="The conviction behind the portfolio: there are markets worth serving that no one has yet thought to serve."
      />

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          <h2 className="text-2xl font-heading font-bold text-primary">The Opportunity</h2>
          <p>
            The consumer and industrial economies contain categories whose total addressable markets fall below the thresholds at which conventional firms are willing to invest. These categories — measured in hundreds or low thousands of participants — have been systematically overlooked.
          </p>
          <p>
            Specific Industries was founded on the conviction that these categories are, in aggregate, substantially larger than any single category a conventional firm would pursue, and that a holding-company approach to many small markets can produce a stable, if theoretically unremarkable, set of operational outcomes.
          </p>
          <p>
            We invest in categories that, on first description, draw a brief pause. The pause is the signal.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-8">Our Investment Criteria</h2>
          <CriteriaList items={INVESTMENT_CRITERIA} />
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-2">The S.P.E.C.I.F.I.C. Evaluation Framework</h2>
          <p className="text-sm text-foreground/60 mb-8 italic">
            Our proprietary eight-step framework for evaluating and integrating portfolio additions. The framework has not been independently validated and does not need to be.
          </p>
          <ol className="space-y-3">
            {FRAMEWORK_STEPS.map((step, i) => (
              <li key={`${step.letter}-${i}`} className="flex gap-4 p-4 rounded-lg border border-primary/10 bg-background">
                <span className="flex-shrink-0 w-10 h-10 rounded bg-primary text-background flex items-center justify-center text-lg font-heading font-bold">
                  {step.letter}
                </span>
                <div>
                  <h3 className="font-heading font-semibold text-primary leading-tight">{step.title}</h3>
                  <p className="text-sm text-foreground/70 leading-snug mt-1">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading text-center mb-4">Track Record</h2>
        </div>
      </section>

      <MetricStrip metrics={metrics} />

      <section className="py-14 px-4 border-t border-primary/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-heading font-bold text-primary mb-3">
            Have an industry that meets our criteria?
          </h3>
          <p className="text-foreground/70 mb-6">
            If your industry fits the thesis above, we are currently accepting submissions for strategic consideration.
          </p>
          <Link
            href="/partnerships"
            className="inline-block px-6 py-3 rounded-lg bg-primary text-background font-heading font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Submit Your Industry for Evaluation
          </Link>
        </div>
      </section>
    </>
  )
}
