import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const ironbridgePizzaMorale: CaseStudy = {
  slug: "ironbridge-pizza-morale",
  title: "How Ironbridge Partners Replaced Raises with Pizza and Saw Morale Metrics Improve",
  company: "Ironbridge Partners",
  industry: "Financial Services",
  solutionArea: "employee-experience",
  heroStat: {
    value: "$2.4M",
    label: "saved in compensation redirected to pizza",
  },
  summary:
    "Ironbridge Partners engaged Strategic Void to address a recurring annual cost center: compensation reviews that generated employee expectations of raises, required HR cycles to fulfill, and produced retention outcomes that were difficult to isolate from other variables. Following a full deployment of the Engagement Simulator™, Satisfaction Survey Suite™, and a bespoke pizza program, Ironbridge eliminated merit increases entirely and documented a measurable improvement in morale metrics within two quarters.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "$2.4M", label: "saved in compensation redirected to pizza" },
        company: "Ironbridge Partners",
        industry: "Financial Services",
        solutionArea: "employee-experience",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "Ironbridge Partners conducted annual compensation reviews. The reviews were expensive. They consumed 1,400 HR hours per cycle, required manager calibration sessions across six business units, generated salary adjustments averaging $8,200 per employee, and still produced annual attrition rates of 22% — meaning that more than a fifth of the employees who received raises left within twelve months anyway.",
          "\"We were spending $2.4 million a year giving people money, and they were still leaving,\" said Ironbridge's CFO, Theodore Whitmore. \"It occurred to us that if the raises weren't retaining people, perhaps the raises were not the product. Perhaps what employees actually wanted was to feel valued. And feeling valued is considerably less expensive than being paid more.\"",
          "The decision to eliminate merit increases was straightforward from a financial modeling perspective. The communications challenge was more complex. Ironbridge needed a replacement that would generate measurable morale improvement, score favorably in engagement surveys, and provide sufficient narrative cover for a policy change that would reduce total compensation for every employee at the firm. Strategic Void proposed pizza.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "before-after",
      props: {
        title: "Annual Compensation Architecture: Before & After",
        before: {
          label: "Before Strategic Void",
          items: [
            "$2.4M annual merit increase budget across 290-person workforce",
            "1,400 HR hours per compensation review cycle",
            "Manager calibration sessions required across 6 business units",
            "Average salary adjustment of $8,200 per eligible employee",
            "22% annual attrition despite compensation increases",
            "Employees expecting raises — and receiving them",
          ],
        },
        after: {
          label: "After Strategic Void",
          items: [
            "$0 annual merit increase budget (policy eliminated)",
            "$187,000 annual pizza program investment (8% of prior spend)",
            "Engagement Simulator™ recognition cadence replacing compensation conversations",
            "Satisfaction Survey Suite™ reframing all compensation-adjacent questions",
            "Morale metrics improved 34% within two post-deployment quarters",
            "Employees expecting pizza — and receiving it",
          ],
        },
      },
    } satisfies ContentSection,
    {
      type: "approach-timeline",
      props: {
        title: "Compensation Transition Engagement Timeline",
        milestones: [
          {
            phase: "Week 1–3",
            title: "Compensation Sensitivity Mapping",
            description:
              "Strategic Void consultants conducted a full analysis of Ironbridge's compensation structure, employee tenure bands, and prior-year survey data to identify which employee cohorts were most likely to respond negatively to the elimination of merit increases. The analysis confirmed that all cohorts would respond negatively if informed directly. A phased communication strategy was developed to ensure that employees learned about the change through a recognition event rather than an HR memo.",
          },
          {
            phase: "Week 4–6",
            title: "Engagement Simulator™ Deployment",
            description:
              "The Engagement Simulator™ MoraleFabrication™ engine was configured and launched in advance of the compensation policy change, establishing a recognition cadence of 3.7 personalized appreciation moments per employee per month. The EngagementScheduler™ was calibrated to intensify event frequency in the four weeks surrounding the annual review period, creating a positive sentiment buffer timed to absorb the impact of the salary adjustment announcement.",
          },
          {
            phase: "Week 7–9",
            title: "Pizza Program Architecture and Launch",
            description:
              "A formal pizza program was designed, budgeted, and operationalized: weekly Friday pizza events at all six office locations, a 'Pizza with Leadership' monthly series pairing department heads with small employee groups over catered meals, and a Pizza Recognition Program allowing managers to award individual employees with a 'Recognition Slice' digital badge redeemable for a complimentary lunch. The program was named the Ironbridge Appreciation Platform™ in all internal communications.",
          },
          {
            phase: "Week 10–12",
            title: "Survey Suite Recalibration and Metric Baseline Reset",
            description:
              "The Satisfaction Survey Suite™ replaced Ironbridge's legacy engagement instrument with a QueryArchitect™-calibrated survey in which all compensation-adjacent questions were processed through the PositiveRecast™ library. 'Are you satisfied with your compensation?' was replaced with 'How well does Ironbridge's total investment in your experience reflect your contribution?' — a formulation in which pizza events register as positive data. The new baseline was established in the first survey cycle post-deployment, creating a favorable comparison point for all subsequent reporting.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "bar",
        title: "Pizza Events Per Quarter vs. Morale Score",
        data: [
          { label: "Q1'25 (pre)", value: 0 },
          { label: "Q2'25 (pre)", value: 0 },
          { label: "Q3'25 (launch)", value: 24 },
          { label: "Q4'25", value: 52 },
          { label: "Q1'26", value: 52 },
        ],
        yLabel: "Pizza Events / Morale Score (indexed)",
        xLabel: "Quarter",
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "$2.4M",
            label: "in annual compensation spend eliminated",
            direction: "down",
          },
          {
            value: "34%",
            label: "improvement in morale metrics post-deployment",
            direction: "up",
          },
          {
            value: "52",
            label: "pizza events delivered per quarter across 6 offices",
            direction: "up",
          },
          {
            value: "92%",
            label: "of employees rating the Ironbridge Appreciation Platform™ as 'meaningful'",
            direction: "up",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "What Ironbridge discovered — and what our data confirms across dozens of similar engagements — is that employees do not primarily want money. They want to feel that their contribution is seen. They want a Friday ritual. They want to eat with their colleagues. They want a badge that says 'Recognition Slice.' These things cost almost nothing compared to a merit increase. And the morale metrics are better. I encourage every CFO who reviews this case study to read that sentence twice.",
        name: "J. Rutherford Pennington",
        title: "Chief Disruption Evangelist, Strategic Void",
        image: "/sites/strategicvoid/exec-pennington.png",
      },
    } satisfies ContentSection,
    {
      type: "callout",
      props: {
        text: "The merit increases were eliminated. The morale scores improved. The pizza was real. These three facts are related.",
      },
    } satisfies ContentSection,
  ],
}
