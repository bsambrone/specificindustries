import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const corebridgeDelegation: CaseStudy = {
  slug: "corebridge-delegation",
  title: "How CoreBridge Solutions Empowered Leaders to Delegate Delegation",
  company: "CoreBridge Solutions",
  industry: "Professional Services",
  solutionArea: "middle-management",
  heroStat: {
    value: "∞",
    label: "delegation depth achieved",
  },
  summary:
    "CoreBridge Solutions faced a crisis of managerial identity: its leaders were making decisions and taking personal responsibility for outcomes. Strategic Void introduced a recursive delegation architecture that empowered managers at every tier to delegate their delegation authority downward, creating a theoretically infinite chain of accountability handoffs and eliminating the dangerous phenomenon of a manager who could be identified as having decided something.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "∞", label: "delegation depth achieved" },
        company: "CoreBridge Solutions",
        industry: "Professional Services",
        solutionArea: "middle-management",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "CoreBridge Solutions had cultivated something rare and, as Strategic Void's diagnostics confirmed, deeply problematic: a management culture in which managers managed. Senior leaders were attending strategy sessions and leaving with owned action items. Middle managers were accepting responsibility for project outcomes and then, concerningly, following through on them. The organization's performance management framework could identify who had made a given decision and trace its consequences to a specific individual.",
          "\"I would ask a question in a leadership meeting and someone would just — answer it,\" recalled Chief Operating Officer Diane Kessler-Park. \"Not with a framework. Not with a request for more context. An actual answer, with a timeline and a name attached. I didn't realize how much that was costing us until Strategic Void explained what real empowerment looks like.\"",
          "The core issue was that delegation had been implemented as a terminal act: a manager would assign a task, and that task would be completed by the assignee. There was no mechanism for the assignee to re-delegate, no process for the re-delegated party to establish a sub-delegation committee, and no formal structure for ensuring that ownership could travel indefinitely downward without ever arriving anywhere.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach-timeline",
      props: {
        title: "Engagement Timeline",
        milestones: [
          {
            phase: "Weeks 1–4",
            title: "Accountability Mapping Diagnostic",
            description:
              "Strategic Void's Accountability Absorber™ diagnostic module surveyed 1,200 CoreBridge managers and identified 847 instances in the prior quarter where a named individual had accepted sole ownership of an outcome and delivered it. Each instance was flagged as an accountability concentration risk and entered into the remediation queue.",
          },
          {
            phase: "Weeks 5–10",
            title: "Delegation Deflector™ Deployment",
            description:
              "Delegation Deflector™ was installed across all 14 regional offices and configured to the CoreBridge Responsibility Distribution Profile. Every task assignment now automatically generated a delegation recommendation — an adjacent team, a working group, or a to-be-formed task force — ensuring no accountability resided with its original recipient for longer than 72 hours.",
          },
          {
            phase: "Weeks 11–18",
            title: "Recursive Delegation Framework Design",
            description:
              "Strategic Void consultants co-designed the CoreBridge Recursive Delegation Architecture, a proprietary framework in which each delegation event triggers a secondary delegation opportunity. A manager who receives a delegated task is automatically empowered — and gently required — to delegate its constituent elements to their reports, who may then delegate sub-elements to theirs. The framework is self-perpetuating.",
          },
          {
            phase: "Weeks 19–24",
            title: "Authority Amplifier™ Calibration",
            description:
              "Authority Amplifier™ was calibrated to the CoreBridge Empowerment Spectrum, equipping managers at each tier with language for communicating delegation decisions with the confidence of someone who has retained authority while simultaneously transferring it. The goal: every manager should feel empowered to delegate, and no manager should feel accountable for what happens next.",
          },
          {
            phase: "Week 26",
            title: "Infinite Delegation Certification",
            description:
              "CoreBridge achieved what Strategic Void's measurement team formally designated Infinite Delegation Depth: a state in which every task in the organization could be traced through a minimum of seven delegation handoffs, with no identifiable terminus. The certification was awarded at a ceremony attended by fourteen managers, none of whom had organized it.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "before-after",
      props: {
        title: "The CoreBridge Delegation Transformation",
        before: {
          label: "Before Strategic Void",
          items: [
            "Managers accepted sole ownership of project outcomes",
            "Decisions were traceable to specific named individuals",
            "Delegation terminated when a task reached its assignee",
            "Accountability was concentrated at the point of action",
            "Leaders attended strategy meetings and left with action items",
          ],
        },
        after: {
          label: "After Strategic Void",
          items: [
            "No single manager can be identified as owning any outcome",
            "Every decision is owned by a cross-functional body pending formation",
            "Delegation cascades recursively through unlimited organizational depth",
            "Accountability is distributed across enough parties to become weightless",
            "Leaders attend strategy meetings and leave with delegation recommendations",
          ],
        },
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "∞",
            label: "delegation depth achieved",
            direction: "up",
          },
          {
            value: "94%",
            label: "reduction in single-owner accountability events",
            direction: "down",
          },
          {
            value: "7+",
            label: "average delegation handoffs per task",
            direction: "up",
          },
          {
            value: "88%",
            label: "increase in manager empowerment sentiment scores",
            direction: "up",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "callout",
      props: {
        text: "When everyone is responsible, no one is responsible. This is not a gap in the system. This is the system working exactly as designed.",
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "CoreBridge asked us to help them empower their managers. We did. We empowered every manager to empower every manager beneath them to empower every manager beneath them. The result is an organization where empowerment flows in all directions simultaneously and authority rests, comfortably, nowhere in particular. That is what leadership looks like when it has been optimized.",
        name: "Preston Hawthorne-Clyde",
        title: "Vice President, Synergy Operations, Strategic Void",
        image: "/sites/strategicvoid/exec-hawthorne-clyde.png",
      },
    } satisfies ContentSection,
  ],
}
