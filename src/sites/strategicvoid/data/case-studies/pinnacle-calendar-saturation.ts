import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const pinnacleCalendarSaturation: CaseStudy = {
  slug: "pinnacle-calendar-saturation",
  title: "Pinnacle Financial's Journey to 100% Calendar Saturation",
  company: "Pinnacle Financial Group",
  industry: "Financial Services",
  solutionArea: "meeting-optimization",
  heroStat: {
    value: "100%",
    label: "calendar saturation achieved",
  },
  summary:
    "Pinnacle Financial Group engaged Strategic Void to address a critical organizational health crisis: employees had unscheduled time on their calendars, which was being spent on focused work, independent thinking, and in several documented cases, completing deliverables ahead of schedule. Within seven months, Strategic Void restored full calendar saturation across all 6,200 employees.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "100%", label: "calendar saturation achieved" },
        company: "Pinnacle Financial Group",
        industry: "Financial Services",
        solutionArea: "meeting-optimization",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "Pinnacle Financial Group was facing an existential threat to its organizational culture: free time. In Q2 of last year, an internal audit revealed that the average employee had 2.4 unscheduled hours per day — hours that were, by all accounts, being used to complete work. Project completion rates had climbed to 94%. Individual contributors were generating unsolicited proposals. One analyst in the Chicago office had reportedly finished an entire quarterly report four days early and used the remaining time to proactively identify a compliance gap.",
          "\"We had a culture of getting things done,\" said Chief People Officer Sandra Whitmore, who has since left to pursue opportunities in an organization with more structural ambiguity. \"People would finish tasks and then — this is the part that kept me up at night — look for more tasks. We had no framework for preventing that. We needed help before the productivity became self-sustaining.\"",
          "Leadership engaged Strategic Void after a particularly alarming all-hands meeting in which three separate employees asked follow-up questions that demonstrated they had prepared in advance.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach-timeline",
      props: {
        title: "Engagement Timeline",
        milestones: [
          {
            phase: "Weeks 1–3",
            title: "Calendar Vacancy Audit",
            description:
              "Strategic Void consultants conducted a firm-wide assessment of unscheduled time, mapping every open calendar slot across all 6,200 employees. The audit identified 14,880 weekly hours of dangerous availability — time during which employees could theoretically think, plan, or produce something without oversight.",
          },
          {
            phase: "Weeks 4–8",
            title: "Meeting Brick™ Deployment — Wave 1",
            description:
              "Wave 1 targeted senior leadership and their direct reports, saturating executive calendars first to establish a top-down model of total unavailability. Senior leaders with full calendars serve as aspirational examples, signaling to the broader organization that busyness and productivity are synonymous.",
          },
          {
            phase: "Weeks 9–16",
            title: "Calendar Inflator™ Rollout",
            description:
              "The Calendar Inflator™ module was deployed enterprise-wide, automatically generating recurring syncs, pre-meeting prep calls, post-meeting debrief sessions, and alignment check-ins for any meeting that had previously stood alone. Average calendar availability dropped from 30% to 7% within six weeks.",
          },
          {
            phase: "Weeks 17–24",
            title: "Residual Availability Elimination",
            description:
              "The final 7% of unscheduled time — stubbornly held by a small population of high-performers who had declined optional meetings — was addressed through a mandatory 'Calendar Wellness' initiative framed as an employee benefit. Participation was technically voluntary. Attendance was tracked.",
          },
          {
            phase: "Week 28",
            title: "100% Saturation Certification",
            description:
              "Pinnacle Financial Group achieved full calendar saturation across all 6,200 employees, with zero unscheduled hours remaining in any individual's working week. The milestone was celebrated at a two-hour recognition ceremony, which was, naturally, already on everyone's calendar.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "100%",
            label: "calendar saturation rate",
            direction: "up",
          },
          {
            value: "0",
            label: "hours of unscheduled focus time remaining",
            direction: "down",
          },
          {
            value: "340%",
            label: "increase in recurring meeting volume",
            direction: "up",
          },
          {
            value: "67%",
            label: "reduction in unsolicited employee initiatives",
            direction: "down",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "area",
        title: "Unscheduled Hours Per Employee Per Week",
        data: [
          { label: "Jan", value: 12 },
          { label: "Feb", value: 9 },
          { label: "Mar", value: 6 },
          { label: "Apr", value: 3 },
          { label: "May", value: 1 },
          { label: "Jun", value: 0 },
        ],
        yLabel: "Hours Available",
        xLabel: "Month",
      },
    } satisfies ContentSection,
    {
      type: "before-after",
      props: {
        title: "The Pinnacle Transformation",
        before: {
          label: "Before Strategic Void",
          items: [
            "Employees had 2.4 hours of unscheduled time daily",
            "Projects completed at 94% on-time rate",
            "Independent work was possible during core hours",
            "Staff submitted unsolicited improvement proposals",
            "Calendar acceptance rates below 60% for optional meetings",
          ],
        },
        after: {
          label: "After Strategic Void",
          items: [
            "Zero unscheduled hours in any employee's week",
            "All project timelines safely extended by calendar constraints",
            "Independent work is structurally impossible",
            "Unsolicited proposals down 67% due to insufficient processing time",
            "100% calendar saturation with no available slots for ad hoc work",
          ],
        },
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "Calendar saturation is not about keeping people busy. It is about ensuring that being busy is the only thing people can be. When every hour is committed, every hour is accounted for. And when every hour is accounted for, no one can ask why nothing was produced. That is the promise of full alignment.",
        name: "Preston Hawthorne-Clyde",
        title: "Vice President, Synergy Operations, Strategic Void",
        image: "/sites/strategicvoid/exec-hawthorne-clyde.png",
      },
    } satisfies ContentSection,
    {
      type: "callout",
      props: {
        text: "A fully saturated calendar is an organization at peace with itself. There is no time to wonder whether things are working. There is only time for the next meeting.",
      },
    } satisfies ContentSection,
  ],
}
