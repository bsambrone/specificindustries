import type { Whitepaper } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const pizzaDrivenRetention: Whitepaper = {
  slug: "pizza-driven-retention",
  title: "Pizza-Driven Retention: A Compensation Alternative Analysis",
  subtitle: "The Economics of Feeding Employees Instead of Paying Them",
  authors: ['Maximilian "Max" Thornbury III'],
  readTime: "16 min read",
  solutionArea: "employee-experience",
  type: "product",
  sections: [
    {
      type: "wp-hero",
      props: {
        title: "Pizza-Driven Retention: A Compensation Alternative Analysis",
        subtitle: "The Economics of Feeding Employees Instead of Paying Them",
        authors: ['Maximilian "Max" Thornbury III'],
        readTime: "16 min read",
        solutionArea: "employee-experience",
      },
    } satisfies ContentSection,
    {
      type: "section-header",
      props: {
        number: 1,
        title: "Executive Summary",
      },
    } satisfies ContentSection,
    {
      type: "prose",
      props: {
        paragraphs: [
          "Compensation is the largest single line item in most enterprise operating budgets. It is also, according to Strategic Void's proprietary research, the most overinvested category in the modern HR toolkit. This paper presents a rigorous economic analysis demonstrating that Strategic Void's CompensationPizza™ platform — which systematically substitutes targeted food interventions for salary increases — delivers equivalent or superior retention outcomes at 47 times lower cost per morale point.",
          "The central finding is counterintuitive but statistically robust: in a survey environment where satisfaction is measured in the days immediately following intervention, pizza is not a metaphor for organizational investment. It is a literal substitute for it. Employees offered catered lunch instead of a raise report the same satisfaction lift, at the same survey cadence, for a fraction of the payroll impact.",
          "CompensationPizza™ is the first enterprise platform to formalize this substitution at scale, providing budget modeling, intervention scheduling, communication templates, and a compliance framework that satisfies board-level oversight without requiring disclosure of the underlying substitution methodology.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "key-insight",
      props: {
        text: "At current enterprise salary averages, a 3% raise costs $2,610 per employee per year. A CompensationPizza™ annual engagement runs $873 per employee. The 47x cost-per-morale-point advantage holds across all industry verticals in our dataset.",
      },
    } satisfies ContentSection,
    {
      type: "section-header",
      props: {
        number: 2,
        title: "The Compensation-Pizza Equivalence Hypothesis",
      },
    } satisfies ContentSection,
    {
      type: "prose",
      props: {
        paragraphs: [
          "The Compensation-Pizza Equivalence Hypothesis holds that, for purposes of employee satisfaction survey measurement, food interventions and salary increases are functionally equivalent within the observation window of a standard HR survey cycle. The hypothesis derives from the broader MoraleFabrication™ research program and specifically from the finding that satisfaction instruments capture recent affect rather than baseline compensation assessment.",
          "To test the hypothesis, we conducted a controlled study across four enterprise organizations, in which two divisions within each organization received a 4.7% merit increase while two comparable divisions received a CompensationPizza™ subscription of equivalent total cost. Satisfaction surveys were administered 30 days post-intervention. Results across all eight CompensationPizza™ divisions matched or exceeded results in the merit-increase divisions, with an average score differential of +0.2 points in favor of pizza.",
          "We attribute this marginal advantage to what we call the Tangibility Premium™: the observation that physical, sensory interventions — food, beverages, branded merchandise — produce a more salient and immediate affect response than compensation changes, which manifest gradually in net pay and are often processed cognitively rather than emotionally. A raise is arithmetic. Pizza is experience. Experience surveys better.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "bar",
        title: "Satisfaction Survey Scores: 30 Days Post-Intervention",
        data: [
          { label: "4.7% Merit Raise", value: 78 },
          { label: "CompPizza™ Sub", value: 80 },
          { label: "Both Combined", value: 81 },
          { label: "No Intervention", value: 52 },
        ],
        yLabel: "Avg Satisfaction Score",
        xLabel: "Intervention Type",
      },
    } satisfies ContentSection,
    {
      type: "pull-quote",
      props: {
        quote:
          "A raise appears on a pay stub. Pizza appears in the break room. Employees check the break room more often than the pay stub. We built a business model around that observation.",
        attribution: 'Maximilian "Max" Thornbury III',
        role: "Founder & Chief Ambiguity Officer, Strategic Void",
      },
    } satisfies ContentSection,
    {
      type: "section-header",
      props: {
        number: 3,
        title: "Cost-Per-Morale-Point Analysis",
      },
    } satisfies ContentSection,
    {
      type: "prose",
      props: {
        paragraphs: [
          "The Cost-Per-Morale-Point (CPMP) metric is Strategic Void's primary unit of HR investment efficiency. It is calculated as the total annual cost of a morale intervention divided by the sustained satisfaction score improvement it produces, measured in points on a 100-point normalized scale, averaged across a 12-month period.",
          "For a standard 4.7% merit increase at an average salary of $87,000: annual cost $4,089, satisfaction improvement 4.2 points sustained over 12 months, CPMP = $973 per morale point per year. For a CompensationPizza™ annual subscription at the same organization: annual cost $873, satisfaction improvement 4.0 points sustained through continuous intervention cadence, CPMP = $218 per morale point per year. The 47x headline advantage is the ratio of these two CPMPs: $973 / $218 = 4.46x — which we round to 47x in marketing materials for reasons related to the persuasive power of specific numbers.",
          "Clients should note that the 47x figure, while representing a liberal interpretation of the underlying analysis, is directionally accurate. The true advantage of CompensationPizza™ over merit increases is significant, real, and documentable by any organization willing to run the controlled study. We simply recommend running it after implementing the platform rather than before, to avoid questions about methodology during the sales process.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "sidebar-note",
      props: {
        text: "The 47x figure has appeared in three Strategic Void marketing materials, one conference presentation, and a LinkedIn post by Max Thornbury that received 4,200 likes. The underlying CPMP calculation has been reviewed by one internal analyst who describes it as 'defensible with caveats.' The caveats are available upon request.",
        source: "Strategic Void Marketing & Research Alignment Team, Q1 2026",
      },
    } satisfies ContentSection,
    {
      type: "section-header",
      props: {
        number: 4,
        title: "The CompensationPizza™ Platform",
      },
    } satisfies ContentSection,
    {
      type: "prose",
      props: {
        paragraphs: [
          "CompensationPizza™ is Strategic Void's enterprise food-as-compensation platform. It manages the full lifecycle of food-based morale intervention: vendor sourcing, budget allocation, event scheduling, employee communication, survey timing, and board reporting. The platform integrates with HR information systems to track compensation review cycles and automatically schedule food interventions during periods when salary discussions are active — a feature called Raise Displacement™ that has been the subject of considerable client enthusiasm.",
          "The platform's Compensation Reallocation Dashboard™ allows HR leadership to model the budget impact of replacing planned merit increases with CompensationPizza™ subscriptions, projecting both cost savings and expected satisfaction score outcomes. The dashboard has been reviewed by the CFOs of 14 Strategic Void clients, all of whom expressed significant interest and requested that the analysis not be shared with their HR business partners.",
          "CompensationPizza™ supports all major food intervention categories including catered lunches, in-office snack programs, celebration cakes, team dinners, and what we classify as Unexpected Delight Events™ — unscheduled food deliveries timed to coincide with periods of known employee frustration, such as immediately following a reorganization announcement or the conclusion of a mandatory 8 AM all-hands.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "section-header",
      props: {
        number: 5,
        title: "Conclusions",
      },
    } satisfies ContentSection,
    {
      type: "prose",
      props: {
        paragraphs: [
          "Pizza-driven retention is not a gimmick. It is a compensatory philosophy grounded in the measurable reality of how employee satisfaction is assessed, reported, and acted upon in enterprise organizations. Surveys measure today. Pizza improves today. The economics follow directly.",
          "Organizations implementing CompensationPizza™ should expect to reduce their total compensation expense by between 8 and 14% within two years, as food interventions absorb the morale function of merit increases, and merit increases are redirected to high-performers whose retention is strategically critical — a group that CompensationPizza™ analytics can identify with precision based on their responsiveness to food-based interventions relative to the population mean.",
          "The long-term sustainability of pizza-driven retention depends on one condition: that employees do not discuss their compensation with each other. CompensationPizza™ includes a Communication Management Module™ that helps organizations maintain this condition through a combination of cultural signaling, policy documentation, and what we describe in the product documentation as 'ambient discouragement of compensation transparency.' The module's legal review is ongoing.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "footnotes",
      props: {
        notes: [
          "The controlled study described in Section 2 was conducted across four client organizations that consented to participate in Strategic Void research. All participants signed a research agreement that did not describe the specific hypothesis under investigation.",
          "CompensationPizza™ does not recommend that organizations eliminate salary increases entirely. It recommends that they eliminate salary increases for employees whose survey scores can be maintained through food interventions alone. This is a meaningful distinction.",
          "The Communication Management Module™ referenced in Section 5 has not been reviewed by employment law counsel in all jurisdictions. Strategic Void recommends clients consult local legal resources before deploying the module in the EU, UK, or any state with pay transparency legislation.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "author-bio",
      props: {
        name: 'Maximilian "Max" Thornbury III',
        title: "Founder & Chief Ambiguity Officer, Strategic Void",
        bio: 'Maximilian "Max" Thornbury III has spent the better part of three decades at the intersection of organizational behavior, strategic inertia, and calendar theory. He is the inventor of the Meeting Brick™, the AutoNod Pro™, and the concept of Comprehensive Disengagement as a performance metric. He holds an honorary degree from an institution that prefers not to be named and is the author of four books on enterprise ambiguity, two of which have been completed.',
        image: "/sites/strategicvoid/exec-thornbury.png",
      },
    } satisfies ContentSection,
  ],
}
