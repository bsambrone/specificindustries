import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const dataplexFocusband: CaseStudy = {
  slug: "dataplex-focusband",
  title: "How DataPlex Systems Achieved FocusBand™ Adoption Across 12 Time Zones",
  company: "DataPlex Systems",
  industry: "Data Analytics",
  solutionArea: "productivity-theater",
  heroStat: {
    value: "12",
    label: "time zones with active FocusBand™ coverage",
  },
  summary:
    "DataPlex Systems had a remote workforce problem: distributed employees were completing their work without anyone being able to verify they were working. Strategic Void deployed FocusBand™ — a continuous activity signaling platform — across 12 time zones, ensuring that every DataPlex employee could prove, at any moment, that they were visibly occupied, regardless of whether the occupation was producing anything.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "12", label: "time zones with active FocusBand™ coverage" },
        company: "DataPlex Systems",
        industry: "Data Analytics",
        solutionArea: "productivity-theater",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "DataPlex Systems had expanded aggressively during the previous four years, assembling a 3,200-person data analytics workforce spread across offices and home setups in 12 time zones. The expansion had been operationally successful. That was the problem.",
          "\"Our remote employees were producing excellent work,\" said Chief People Officer Waverly Hobbs. \"But producing work isn't the same as being seen to produce it. I would get on a call with an analyst in Singapore at 11 PM their time and they would just — have their camera off. No status light. No activity indicator. For all I knew, they were working. But I couldn't prove it, and in the absence of proof, productivity is purely theoretical.\"",
          "The organization's managers were losing sleep. Not because results were poor — results were, by every measure, strong — but because the visibility framework for those results was entirely absent. When a board member asked \"how do you know your remote teams are engaged,\" the honest answer was \"because they keep delivering.\" DataPlex leadership needed a better answer than that.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach-timeline",
      props: {
        title: "Global FocusBand™ Deployment Timeline",
        milestones: [
          {
            phase: "Weeks 1–3",
            title: "Remote Visibility Gap Assessment",
            description:
              "Strategic Void's Busyness Broadcaster™ diagnostic team conducted a 12-timezone audit of DataPlex's activity signaling infrastructure, identifying that 89% of remote employees had no persistent visibility mechanism beyond their actual work output. The assessment quantified a visibility gap of approximately 24,000 unmonitored working hours per week.",
          },
          {
            phase: "Weeks 4–9",
            title: "FocusBand™ Pilot — Americas Region",
            description:
              "FocusBand™ was piloted across DataPlex's North and South American teams, covering six time zones. The platform installed a persistent desktop presence layer that broadcast continuous activity signals — cursor movement, application switching, document access, ambient audio events — into a centralized visibility dashboard accessible to managers in real time. Pilot participants reported feeling 'more present' despite working identical hours.",
          },
          {
            phase: "Weeks 10–17",
            title: "EMEA and APAC Rollout",
            description:
              "FocusBand™ was extended to DataPlex's European, Middle Eastern, and Asia-Pacific teams, completing global coverage across all 12 time zones. Timezone-aware presence normalization ensured that an analyst working at 2 AM Singapore time registered the same visibility signal quality as a London employee during core hours. The platform introduced a concept the team called 'presence equivalence.'",
          },
          {
            phase: "Weeks 18–22",
            title: "Urgency Fabricator™ Integration",
            description:
              "Urgency Fabricator™ was integrated with FocusBand™ to ensure that high visibility correlated with high-urgency task framing. Every active employee now had at least one CRITICAL-flagged item in their queue at all times, ensuring that their continuous presence signaling was contextually supported by visible evidence of prioritized work — whether or not the priority was real.",
          },
          {
            phase: "Week 24",
            title: "Full-Coverage Certification",
            description:
              "DataPlex Systems achieved FocusBand™ Full Coverage Certification: every employee in all 12 time zones had an active, continuously broadcasting presence signal with less than 4 minutes of daily unaccounted gap time. The certification was presented at an all-hands meeting that ran 40 minutes over its scheduled duration, which Strategic Void noted was itself a strong visibility signal.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "area",
        title: "FocusBand™ Coverage by Time Zone (% employees active)",
        data: [
          { label: "UTC-8", value: 94 },
          { label: "UTC-5", value: 97 },
          { label: "UTC-3", value: 91 },
          { label: "UTC+0", value: 96 },
          { label: "UTC+2", value: 93 },
          { label: "UTC+4", value: 88 },
          { label: "UTC+5.5", value: 90 },
          { label: "UTC+7", value: 89 },
          { label: "UTC+8", value: 95 },
        ],
        yLabel: "% Employees with Active Signal",
        xLabel: "Time Zone",
      },
    } satisfies ContentSection,
    {
      type: "before-after",
      props: {
        title: "Remote Workforce Visibility: Before and After",
        before: {
          label: "Before Strategic Void",
          items: [
            "Remote employees had no persistent visibility mechanism",
            "Managers assessed productivity through work output alone",
            "89% of remote hours were 'visibility dark' to leadership",
            "Board questions about remote engagement had no satisfying answer",
            "Employees could work without anyone noticing they were working",
          ],
        },
        after: {
          label: "After Strategic Void",
          items: [
            "100% of employees broadcast continuous FocusBand™ presence signals",
            "Real-time visibility dashboard accessible to all managers globally",
            "Less than 4 minutes daily of unaccounted employee gap time",
            "Board receives weekly FocusBand™ Presence Density Report",
            "Employees are visibly working at all times, regardless of output",
          ],
        },
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "12",
            label: "time zones with active FocusBand™ coverage",
            direction: "up",
          },
          {
            value: "100%",
            label: "employee presence signal coverage",
            direction: "up",
          },
          {
            value: "< 4 min",
            label: "daily unaccounted gap time per employee",
            direction: "down",
          },
          {
            value: "78%",
            label: "reduction in manager anxiety about remote work",
            direction: "down",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "DataPlex had a workforce that was working. What they lacked was a workforce that could be observed working — which is an entirely different and, in our view, more important capability. FocusBand™ gave their managers something to look at. The thing they were looking at wasn't always the work. But it was always something. That is visibility at scale.",
        name: "Caldwell Ashford-Wexley",
        title: "Senior Director, Strategic Ambiguity, Strategic Void",
        image: "/sites/strategicvoid/exec-ashford-wexley.png",
      },
    } satisfies ContentSection,
  ],
}
