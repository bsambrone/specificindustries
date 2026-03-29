import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const novacorpPerceivedProductivity: CaseStudy = {
  slug: "novacorp-perceived-productivity",
  title: "NovaCorp's 340% Increase in Perceived Productivity",
  company: "NovaCorp Technologies",
  industry: "SaaS",
  solutionArea: "productivity-theater",
  heroStat: {
    value: "340%",
    label: "increase in perceived productivity",
  },
  summary:
    "NovaCorp Technologies had built a culture of genuine output — engineers shipped features, analysts delivered insights, and results were measurable in ways that made leadership uncomfortable. Strategic Void deployed the full Productivity Theater suite to decouple the appearance of work from its execution, achieving a 340% increase in perceived productivity while preserving actual output at its original baseline.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "340%", label: "increase in perceived productivity" },
        company: "NovaCorp Technologies",
        industry: "SaaS",
        solutionArea: "productivity-theater",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "NovaCorp Technologies had a problem that most organizations would envy and none would admit to: its people were productive. Not visibly productive — genuinely productive. Ticket velocity was high, but status updates were sparse. Features shipped on schedule, but the slack channels were quiet. Engineers who had just closed fourteen issues in a sprint would answer 'what are you working on?' with a single sentence instead of a sprawling three-paragraph overview with attachments.",
          "\"Our engineers were too efficient,\" said VP of Engineering Lorenzo Castillo, who came to Strategic Void after reading the firm's white paper 'The Quiet Employee Is a Liability.' \"They would finish work and not tell anyone. They would solve a problem without creating a ticket for how they intended to solve the problem. One of our senior devs shipped a refactor that improved load times by 40% and didn't mention it in the standup. We didn't know for eleven days.\"",
          "The organization's leadership had no visibility into how hard people appeared to be working because they were too focused on what actually got done. The board wanted a better story. The executive team needed metrics that looked impressive in slide decks. NovaCorp needed Strategic Void.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach",
      props: {
        steps: [
          {
            name: "Productivity Signal Audit",
            description:
              "Strategic Void's Busyness Broadcaster™ diagnostic team spent four weeks at NovaCorp's San Francisco headquarters analyzing the gap between actual output and communicated output. The audit found that the average NovaCorp engineer was producing at a level 340% higher than they were visibly representing, leaving an enormous perception gap that was being entirely wasted.",
          },
          {
            name: "Busyness Broadcaster™ Deployment",
            description:
              "Busyness Broadcaster™ was configured to the NovaCorp Visibility Profile and deployed to all 780 individual contributors. The platform automatically transformed completed work into in-progress narratives, converted shipped features into multi-week epics with detailed status threads, and surfaced every closed task as evidence of ongoing strategic prioritization.",
          },
          {
            name: "Status Updater Pro™ Integration",
            description:
              "Status Updater Pro™ was integrated with NovaCorp's existing project management tooling, establishing a mandatory daily update cadence that ensured no work could be completed without generating at least four status artifacts documenting the journey toward completion. Engineers now communicated what they were about to do, what they were doing, what they had almost done, and what they had done — separately.",
          },
          {
            name: "Task Multiplier™ Activation",
            description:
              "Task Multiplier™ decomposed every project into a minimum of twelve trackable sub-tasks, each with its own owner, due date, and stakeholder notification. A single feature that previously shipped as one ticket now generated a visible workstream that occupied sixteen calendar slots and produced forty-seven status updates, giving leadership the comprehensive oversight they had always deserved.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "line",
        title: "Perceived vs. Actual Productivity Index Over Engagement",
        data: [
          { label: "Baseline", value: 22 },
          { label: "Month 1", value: 41 },
          { label: "Month 2", value: 65 },
          { label: "Month 3", value: 88 },
          { label: "Month 4", value: 97 },
          { label: "Month 5", value: 97 },
        ],
        yLabel: "Perceived Productivity Index",
        xLabel: "Month",
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "340%",
            label: "increase in perceived productivity",
            direction: "up",
          },
          {
            value: "0%",
            label: "change in actual output",
            direction: "down",
          },
          {
            value: "47x",
            label: "increase in status artifacts per shipped feature",
            direction: "up",
          },
          {
            value: "96%",
            label: "executive satisfaction with team visibility",
            direction: "up",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "NovaCorp's engineers were already doing the work. They simply weren't performing it. There is a difference — and it is a difference worth 340 percentage points. We did not change what they produced. We changed how observable the production appeared to be. The board has never asked fewer uncomfortable questions. That is the outcome we were retained to deliver.",
        name: "J. Rutherford Pennington",
        title: "Chief Disruption Evangelist, Strategic Void",
        image: "/sites/strategicvoid/exec-pennington.png",
      },
    } satisfies ContentSection,
    {
      type: "callout",
      props: {
        text: "If a feature ships and no one sees fourteen status updates about it, did it create organizational value? Strategic Void's answer is: technically, but not optimally.",
      },
    } satisfies ContentSection,
    {
      type: "client-quote",
      props: {
        quote:
          "I used to ship code and tell my manager when it was done. Now I have a pre-shipping alignment sync, a shipping-readiness check-in, a post-ship retrospective, and a visibility artifact submitted to three Slack channels. I ship the same amount of code. My manager thinks I'm working constantly. My performance review has never been better.",
        name: "Anika Vasquez",
        role: "Senior Software Engineer",
        company: "NovaCorp Technologies",
      },
    } satisfies ContentSection,
  ],
}
