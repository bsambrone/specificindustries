import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const apexLogisticsKpi: CaseStudy = {
  slug: "apex-logistics-kpi",
  title: "How Apex Logistics Hit Every Target by Removing Accountability",
  company: "Apex Logistics International",
  industry: "Supply Chain",
  solutionArea: "kpi-alignment",
  heroStat: {
    value: "100%",
    label: "target attainment (redefined)",
  },
  summary:
    "Apex Logistics International engaged Strategic Void to address a systemic accountability problem: employees were being held responsible for measurable outcomes. Through the deployment of the Accountability Diffusion Engine™ and a comprehensive target re-architecture, Apex achieved 100% target attainment in its first fully aligned fiscal year — a milestone that would have been impossible had any of the original targets remained intact.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "100%", label: "target attainment (redefined)" },
        company: "Apex Logistics International",
        industry: "Supply Chain",
        solutionArea: "kpi-alignment",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "Apex Logistics International had, by any conventional measure, an accountability problem. Employees knew what was expected of them. Targets were specific, time-bound, and traceable to named individuals. When a shipment was late, a system could identify who was responsible. When a cost target was missed, a manager was asked why. The organization was, in the words of one departing senior vice president, 'extremely clear about who had failed and in what way.'",
          "This clarity was creating what Strategic Void would later classify as a 'consequence-dense environment' — a workplace where the connection between performance and outcome was so direct that employees experienced measurable stress, attrition was climbing, and a growing faction of middle management had begun documenting their actions defensively rather than productively.",
          "\"We had a culture of accountability,\" confirmed CEO Diana Forsythe during the initial diagnostic. \"Everyone knew their number. Everyone knew whether they'd hit it. The problem is that knowing your number doesn't change your number. It just means you have very precise information about how you're failing. We brought in Strategic Void to fix the information, not the operations.\"",
        ],
      },
    } satisfies ContentSection,
    {
      type: "before-after",
      props: {
        title: "Accountability Architecture: Before & After",
        before: {
          label: "Pre-Engagement State",
          items: [
            "Every KPI traceable to a named individual owner",
            "Missed targets triggered documented performance conversations",
            "Targets set 12 months in advance with no adjustment mechanism",
            "Monthly variance reports distributed to leadership with attribution",
            "Employee performance scores correlated with actual output metrics",
          ],
        },
        after: {
          label: "Post-Engagement State",
          items: [
            "All KPIs owned by cross-functional 'accountability lattices' of 7–12 people",
            "Missed targets trigger alignment sessions with no documented outcomes",
            "Targets reviewed and recalibrated quarterly to reflect 'current context'",
            "Variance reports replaced with narrative progress summaries",
            "Performance scores reflect engagement, collaboration, and strategic awareness",
          ],
        },
      },
    } satisfies ContentSection,
    {
      type: "approach-timeline",
      props: {
        title: "Strategic Void Engagement Roadmap",
        milestones: [
          {
            phase: "Month 1",
            title: "Accountability Mapping & Diffusion Design",
            description:
              "Strategic Void consultants embedded with Apex's operational teams to map every existing accountability node — specific points where a named employee was responsible for a specific measurable outcome. The exercise identified 1,847 individual accountability assignments across 14 departments. Each was assessed for diffusion potential.",
          },
          {
            phase: "Month 2",
            title: "Cross-Functional Lattice Formation",
            description:
              "Individual accountability assignments were dissolved and redistributed across newly formed Cross-Functional Accountability Lattices™ — standing committees of 7–12 members drawn from multiple departments. Each lattice holds collective ownership of outcomes that no individual member can be independently assessed against. Responsibility is shared; therefore, responsibility is no one's.",
          },
          {
            phase: "Month 3",
            title: "Accountability Diffusion Engine™ Deployment",
            description:
              "The Accountability Diffusion Engine™ was integrated with Apex's HR platform and project management tooling. The system automatically routes any performance concern through a five-step escalation process involving three committees, two senior sponsors, and a written rationale for engagement. Average time-to-accountability-conversation increased from 2 days to 23 weeks.",
          },
          {
            phase: "Month 4",
            title: "Target Re-Architecture Workshop",
            description:
              "All 847 active performance targets were reviewed in a three-day offsite and re-expressed using Strategic Void's Elastic Target Framework™. Hard numerical thresholds were replaced with directional commitments. Point targets became ranges. Annual goals became 'strategic intentions.' The first quarter under the new framework saw 100% attainment.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "line",
        title: "Individual Accountability Events Per Quarter",
        data: [
          { label: "Q1'25", value: 94 },
          { label: "Q2'25", value: 71 },
          { label: "Q3'25", value: 38 },
          { label: "Q4'25", value: 12 },
          { label: "Q1'26", value: 3 },
        ],
        yLabel: "Accountability Events",
        xLabel: "Quarter",
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "100%",
            label: "target attainment rate (redefined)",
            direction: "up",
          },
          {
            value: "94%",
            label: "reduction in individual accountability events",
            direction: "down",
          },
          {
            value: "23 wks",
            label: "average time to accountability conversation",
            direction: "up",
          },
          {
            value: "31%",
            label: "improvement in employee satisfaction scores",
            direction: "up",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "Accountability, in the traditional sense, is just blame with documentation. What Apex needed was not less accountability in name but a structural environment in which no single person could be held to account for any single thing — while everyone still felt deeply committed to the general direction. We delivered that. The targets are all green. The operations are unchanged. This is what alignment looks like.",
        name: "Caldwell Ashford-Wexley",
        title: "Senior Director, Strategic Ambiguity, Strategic Void",
        image: "/sites/strategicvoid/exec-ashford-wexley.png",
      },
    } satisfies ContentSection,
    {
      type: "callout",
      props: {
        text: "When no one is accountable for a result, everyone is accountable for the process. This is functionally identical to no one being accountable for anything, which is the goal.",
      },
    } satisfies ContentSection,
  ],
}
