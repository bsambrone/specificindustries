import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const crestwoodMandatoryfun: CaseStudy = {
  slug: "crestwood-mandatoryfun",
  title: "MandatoryFun™ Drove a 450% Increase in Scheduled Enjoyment at Crestwood Corp",
  company: "Crestwood Corp",
  industry: "Insurance",
  solutionArea: "employee-experience",
  heroStat: {
    value: "450%",
    label: "increase in scheduled enjoyment",
  },
  summary:
    "Crestwood Corp engaged Strategic Void after employee morale surveys revealed widespread dissatisfaction, low engagement scores, and declining retention rates. Rather than addressing the root causes — compensation, workload, and management quality — leadership partnered with Strategic Void to deploy MandatoryFun™, a comprehensive scheduled enjoyment infrastructure that increased documented fun events by 450% while leaving underlying working conditions entirely unchanged.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "450%", label: "increase in scheduled enjoyment" },
        company: "Crestwood Corp",
        industry: "Insurance",
        solutionArea: "employee-experience",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "Crestwood Corp's 2024 annual engagement survey delivered an uncomfortable result: 67% of employees reported low morale. Qualitative responses cited excessive workload, below-market compensation, and management practices that respondents described using terms HR had to review with legal before including in the summary report. Leadership reviewed the findings carefully, acknowledged them at an all-hands meeting, and concluded that the right response was more fun.",
          "\"We didn't feel the root causes were within scope,\" said Crestwood's Chief People Officer, Veronica Sloane. \"Compensation is a finance conversation. Workload is an operations conversation. Management quality is a very long conversation that we weren't prepared to start before the next survey cycle. What we could control was the fun calendar. So we called Strategic Void.\"",
          "The challenge was scale. Crestwood's 2,800-person workforce was distributed across seven regional offices, three time zones, and four distinct employee demographic cohorts with divergent definitions of what constituted a good time. A fun program that landed poorly would generate negative survey responses in a new category. What was needed was not organic fun, but engineered enjoyment — calibrated, scheduled, and sufficiently frequent to register as a trend on the next pulse survey.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach",
      props: {
        steps: [
          {
            name: "Morale Measurer™ Baseline Assessment",
            description:
              "Morale Measurer™ was deployed to establish a quantified enjoyment baseline across all seven Crestwood locations. The SentimentOracle™ pulse survey infrastructure collected 2,400+ responses across four dimensions: perceived fun frequency, enjoyment quality, calendar saturation, and willingness to attend additional events. The InsightContainment™ module processed findings and confirmed that employees were experiencing a documented fun deficit of 73% relative to industry peer benchmarks.",
          },
          {
            name: "Fun Event Architecture Design",
            description:
              "Strategic Void's employee experience team developed a comprehensive scheduled enjoyment calendar deploying a minimum of 4.2 fun events per employee per month across all locations. Event categories included Catered Celebration Events, Cross-Functional Social Mixers, Themed Appreciation Days, Wellness Activation Sessions, and the signature MandatoryFun™ Quarterly Experience — a four-hour all-hands event attended by 100% of staff, participation in which is tracked and factored into manager performance reviews.",
          },
          {
            name: "Engagement Simulator™ Integration",
            description:
              "The Engagement Simulator™ MoraleFabrication™ engine was configured to deploy recognition events, appreciation messages, and belonging initiatives timed to arrive within 72 hours of each quarterly engagement survey. The SentimentCalibration™ layer ensured that survey score impact was maximized across all enjoyment-adjacent dimensions, while the EngagementScheduler™ module maintained a continuous recognition cadence calibrated to prevent any 14-day window from passing without a documented morale-positive event.",
          },
          {
            name: "Survey Score Optimization Calibration",
            description:
              "The Satisfaction Survey Suite™ was deployed alongside MandatoryFun™ to replace Crestwood's prior survey instrument. The QuestionOptimizer™ module reframed all morale-related questions through the PositiveRecast™ library, converting formulations that had previously generated low scores into affirmative constructions that captured the same sentiment while producing directionally favorable results. Combined with the increased event frequency, the new instrument produced survey scores that HR could present at the Q1 board meeting without supplementary explanation.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "area",
        title: "Scheduled Fun Events Per Month vs. Employee Stress Peaks",
        data: [
          { label: "Jan", value: 8 },
          { label: "Feb", value: 12 },
          { label: "Mar", value: 18 },
          { label: "Apr", value: 22 },
          { label: "May", value: 29 },
          { label: "Jun", value: 36 },
        ],
        yLabel: "Fun Events Scheduled",
        xLabel: "Month",
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "450%",
            label: "increase in scheduled enjoyment events per quarter",
            direction: "up",
          },
          {
            value: "71%",
            label: "improvement in engagement survey scores",
            direction: "up",
          },
          {
            value: "0",
            label: "changes made to compensation, workload, or management structure",
            direction: "down",
          },
          {
            value: "94%",
            label: "MandatoryFun™ Quarterly Experience attendance rate (mandatory)",
            direction: "up",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "callout",
      props: {
        text: "The root causes of low morale were not addressed. The survey scores improved anyway. This is not a coincidence — it is the methodology.",
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "Employee morale is a measurement problem before it is a management problem. Crestwood's employees were not enjoying themselves, but more importantly, they were not reporting that they were enjoying themselves — which created a board-level visibility issue that was entirely separable from the underlying conditions. MandatoryFun™ resolves the measurement problem. What employees experience between scheduled fun events is, as always, an operational matter.",
        name: "Preston Hawthorne-Clyde",
        title: "Vice President, Synergy Operations, Strategic Void",
        image: "/sites/strategicvoid/exec-hawthorne-clyde.png",
      },
    } satisfies ContentSection,
    {
      type: "client-quote",
      props: {
        quote:
          "We have a Taco Tuesday now. And a Wellness Wednesday. And a Thankful Thursday. I still have the same workload I had before Strategic Void. But I have been to eleven catered events in the last quarter, and apparently my engagement score has improved significantly, which I learned about at one of the catered events.",
        name: "Marcus Delgado",
        role: "Senior Claims Analyst",
        company: "Crestwood Corp",
      },
    } satisfies ContentSection,
  ],
}
