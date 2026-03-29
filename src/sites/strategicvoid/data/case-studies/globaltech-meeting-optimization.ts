import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const globaltechMeetingOptimization: CaseStudy = {
  slug: "globaltech-meeting-optimization",
  title: "How GlobalTech Dynamics Reduced Productive Meetings by 73%",
  company: "GlobalTech Dynamics",
  industry: "Enterprise Technology",
  solutionArea: "meeting-optimization",
  heroStat: {
    value: "73%",
    label: "reduction in productive meeting outcomes",
  },
  summary:
    "GlobalTech Dynamics partnered with Strategic Void to deploy the full Meeting Optimization Suite™, successfully eliminating nearly three-quarters of all productive meeting outcomes across a 14,000-person enterprise in under nine months.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "73%", label: "reduction in productive meeting outcomes" },
        company: "GlobalTech Dynamics",
        industry: "Enterprise Technology",
        solutionArea: "meeting-optimization",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "GlobalTech Dynamics had a productivity problem. Meetings were producing results. Attendees were leaving with action items, clear owners, and — most disturbingly — a shared sense of progress. Decision velocity had increased 40% year-over-year, and cross-functional alignment was at an all-time high. Leadership knew something had to change.",
          "\"We were finishing projects on time,\" admitted CTO Dr. Priya Nandakumar. \"Our teams were executing. Outcomes were traceable. The board was asking questions we could actually answer. It was causing chaos in our reporting structure. We needed a partner who could help us return to a more sustainable level of strategic ambiguity.\"",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach",
      props: {
        steps: [
          {
            name: "Stakeholder Misalignment Audit",
            description:
              "A six-week diagnostic engagement identified 847 meetings per week at risk of producing actionable outcomes. Strategic Void consultants embedded with 23 teams to document accountability gaps, ownership voids, and consensus points that could be safely undermined.",
          },
          {
            name: "Meeting Brick Deployment",
            description:
              "14,000 Meeting Bricks™ were distributed across all enterprise locations. Each device was pre-configured with the GlobalTech Inertia Profile, calibrating ambient cognitive disruption to the precise threshold required to prevent conclusions without visibly disrupting engagement scores.",
          },
          {
            name: "AutoNod Pro Integration",
            description:
              "AutoNod Pro™ was rolled out to executive leadership first, establishing a participation signal that propagated downward. Senior leaders demonstrated the strategic value of visible engagement decoupled from comprehension, normalizing the behavior across all management layers within six weeks.",
          },
          {
            name: "Calendar Inflator Rollout",
            description:
              "The Calendar Inflator™ module reduced calendar availability to 4%, ensuring that any meeting which did generate momentum could not be followed up within the same fiscal quarter. Rescheduling friction increased 1,200%, effectively neutralizing residual productivity impulses.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "73%",
            label: "reduction in productive meeting outcomes",
            direction: "down",
          },
          {
            value: "340%",
            label: "increase in total meeting volume",
            direction: "up",
          },
          {
            value: "4%",
            label: "calendar availability",
            direction: "down",
          },
          {
            value: "91%",
            label: "employee engagement score",
            direction: "up",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "line",
        title: "Productive Meeting Outcomes Over Time",
        data: [
          { label: "Q1'25", value: 87 },
          { label: "Q2'25", value: 72 },
          { label: "Q3'25", value: 41 },
          { label: "Q4'25", value: 23 },
          { label: "Q1'26", value: 12 },
        ],
        yLabel: "Productive Outcomes",
        xLabel: "Quarter",
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "Strategic Void didn't just solve our productivity problem — they reframed it. We no longer measure success by what gets done. We measure it by what gets deferred, diluted, and strategically revisited at a future date to be determined. That is organizational alignment at its finest.",
        name: 'Maximilian "Max" Thornbury III',
        title: "Founder & Chief Ambiguity Officer, Strategic Void",
        image: "/sites/strategicvoid/exec-thornbury.png",
      },
    } satisfies ContentSection,
    {
      type: "callout",
      props: {
        text: "The less work accomplished, the more aligned the organization became. This is not a paradox. This is the product.",
      },
    } satisfies ContentSection,
    {
      type: "client-quote",
      props: {
        quote:
          "I used to dread meetings because we'd leave with things to do. Now I leave meetings feeling heard, seen, and completely uncertain about what happens next. That ambiguity used to feel like failure. Strategic Void helped me understand it's actually leadership.",
        name: "Marcus Chen",
        role: "VP Engineering",
        company: "GlobalTech Dynamics",
      },
    } satisfies ContentSection,
  ],
}
