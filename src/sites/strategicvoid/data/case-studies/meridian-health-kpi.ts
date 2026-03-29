import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const meridianHealthKpi: CaseStudy = {
  slug: "meridian-health-kpi",
  title: "Meridian Health Achieved 200% KPI Compliance by Redefining All Metrics",
  company: "Meridian Health Systems",
  industry: "Healthcare",
  solutionArea: "kpi-alignment",
  heroStat: {
    value: "200%",
    label: "KPI compliance rate",
  },
  summary:
    "Meridian Health Systems partnered with Strategic Void to resolve a performance measurement crisis: KPIs were connected to actual outcomes, causing widespread anxiety when targets were missed. By systematically redefining all 214 active KPIs through the KPI Neutralizer™ framework, Meridian achieved 200% average compliance within one fiscal quarter — without changing a single operational process.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "200%", label: "KPI compliance rate" },
        company: "Meridian Health Systems",
        industry: "Healthcare",
        solutionArea: "kpi-alignment",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "For three consecutive years, Meridian Health Systems had allowed its KPIs to remain connected to actual performance data. Targets were set in advance. Outcomes were measured against them. When the numbers missed, someone was expected to explain why. The results were predictable: a performance culture defined by anxiety, quarterly blame cycles, and a leadership team that spent more time explaining underperformance than planning strategy.",
          "\"The problem was legibility,\" explained CFO Thomas Berkhardt at the initial engagement kickoff. \"Our KPIs were too clear. Anyone could look at them and understand whether we were succeeding or not. That created a binary — success or failure — with no room for nuance, narrative, or reframing. We needed a partner who could restore the appropriate level of interpretive flexibility to our performance framework.\"",
          "The situation had reached a crisis point when a mid-year board presentation included a slide with seventeen red indicators. No amount of contextual footnotes had been sufficient to reframe the trajectory. Leadership needed a structural solution, not a communications strategy.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach",
      props: {
        steps: [
          {
            name: "KPI Vulnerability Assessment",
            description:
              "Strategic Void analysts reviewed all 214 active KPIs across Meridian's seven divisions. Each metric was assessed on two dimensions: (1) legibility — how easily a non-expert could determine whether the target was met, and (2) consequence proximity — how directly a missed target could be traced to an individual or team. Forty-one KPIs were identified as critically specific and flagged for immediate redefinition.",
          },
          {
            name: "KPI Neutralizer™ Implementation",
            description:
              "The KPI Neutralizer™ framework was applied to all 214 metrics over six weeks. Each KPI was re-expressed as a directional trend indicator rather than a point target — shifting language from 'achieve X by date Y' to 'demonstrate continued progress toward an evolving definition of X.' Baselines were reset, historical comparisons were deprecated, and all targets were expressed as ranges wide enough to accommodate any plausible outcome.",
          },
          {
            name: "Metric Multiplication Protocol",
            description:
              "To dilute the visibility of any single underperforming indicator, the total KPI count was expanded from 214 to 847. The additional 633 metrics tracked activity rather than outcomes — meeting attendance rates, report submission frequency, alignment session participation, and strategic initiative awareness scores. With 847 indicators, the majority of which were green by design, board dashboards presented an overwhelmingly positive picture regardless of operational performance.",
          },
          {
            name: "Compliance Redefinition Workshop",
            description:
              "All division heads attended a two-day Strategic Void workshop on 'Reframing the Compliance Concept.' Participants left with a shared understanding that compliance does not mean meeting a target — it means demonstrating awareness of the target, documenting engagement with the target, and articulating a forward-looking plan in relation to the target. Under this definition, 200% compliance is achievable by submitting two documents.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "bar",
        title: "KPI Compliance Rate by Division (Post-Redefinition)",
        data: [
          { label: "Clinical Ops", value: 210 },
          { label: "Finance", value: 195 },
          { label: "HR", value: 220 },
          { label: "IT", value: 188 },
          { label: "Supply", value: 205 },
          { label: "Compliance", value: 215 },
          { label: "Strategy", value: 198 },
        ],
        yLabel: "Compliance %",
        xLabel: "Division",
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "200%",
            label: "average KPI compliance rate",
            direction: "up",
          },
          {
            value: "847",
            label: "total active KPIs (up from 214)",
            direction: "up",
          },
          {
            value: "0",
            label: "KPIs still connected to operational outcomes",
            direction: "down",
          },
          {
            value: "94%",
            label: "reduction in performance-related leadership anxiety",
            direction: "down",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "callout",
      props: {
        text: "When every metric is achievable by definition, the organization stops failing. This is not the same as succeeding. It is considerably more sustainable.",
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "The organizations that suffer most from KPIs are those that treat them as measurements of reality. Reality is fixed. KPIs are a choice. When Meridian's leadership understood that compliance is a frame, not a fact, they were liberated from the tyranny of their own data. Two hundred percent compliance isn't spin. It's architecture.",
        name: "J. Rutherford Pennington",
        title: "Chief Disruption Evangelist, Strategic Void",
        image: "/sites/strategicvoid/exec-pennington.png",
      },
    } satisfies ContentSection,
    {
      type: "client-quote",
      props: {
        quote:
          "Before Strategic Void, I dreaded our quarterly business reviews. Someone would always pull up the dashboard and ask why we missed the target, and then we'd spend an hour explaining context that felt exactly like making excuses. Now our KPIs are contextual by design. We never miss a target because the targets are defined in relation to what we did. It is a completely different relationship with data.",
        name: "Thomas Berkhardt",
        role: "Chief Financial Officer",
        company: "Meridian Health Systems",
      },
    } satisfies ContentSection,
  ],
}
