import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const keystoneDecisionElimination: CaseStudy = {
  slug: "keystone-decision-elimination",
  title: "How Keystone Analytics Eliminated Decision-Making from the C-Suite",
  company: "Keystone Analytics Corp",
  industry: "Business Intelligence",
  solutionArea: "decision-support",
  heroStat: {
    value: "0",
    label: "C-suite decisions per quarter",
  },
  summary:
    "Keystone Analytics Corp engaged Strategic Void after discovering that its C-suite was regularly making decisions — many of which turned out to be wrong, traceable, and attributable to specific executives by name. Through a full deployment of the Decision Deferral Engine™, Consensus Diffuser™, and Committee Spawner™, Strategic Void reduced C-suite decision output to zero in under two quarters, restoring the organization's capacity for indefinite strategic contemplation.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "0", label: "C-suite decisions per quarter" },
        company: "Keystone Analytics Corp",
        industry: "Business Intelligence",
        solutionArea: "decision-support",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "Keystone Analytics Corp had a decision problem. The C-suite was making them. On a quarterly basis, senior executives were identifying strategic questions, gathering data, forming views, and — in the most damaging cases — committing to specific courses of action. The results were sometimes correct, sometimes incorrect, and in every case traceable to the individual who had made them.",
          "\"We had a Chief Strategy Officer who made eleven decisions in Q3 alone,\" said the company's General Counsel. \"Four of them were wrong. We know they were wrong because he made them, and when they were wrong, everyone knew who to ask about it. This is not how a modern enterprise should operate. You should never be able to find the person who decided something.\"",
          "The problem was structural. Keystone's leadership culture had developed an unfortunate emphasis on clarity of ownership, speed of execution, and personal accountability for outcomes — a governance posture that created legal exposure, board friction, and an environment in which executives were reluctant to accept promotions because promotions added decisions to their portfolio. Something had to change.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach",
      props: {
        steps: [
          {
            name: "Decision Inventory and Exposure Assessment",
            description:
              "Strategic Void consultants spent three weeks documenting every decision made by the Keystone C-suite in the prior four quarters. The audit identified 47 traceable decisions, 31 of which had a named originator, 19 of which had produced suboptimal outcomes, and 6 of which had been the subject of board-level discussion. The exposure profile was classified as Forensically Acute.",
          },
          {
            name: "Decision Deferral Engine™ Deployment",
            description:
              "The Decision Deferral Engine™ was configured to intercept all incoming decision requests before they reached individual executives. Each item was routed through the ReadinessGap™ analysis framework, which identified the additional information, alignment confirmation, and market condition clarity required before any decision could responsibly proceed. The initial configuration produced an average gap backlog of 8.3 items per decision, ensuring that no decision in the active queue was within two quarters of resolution.",
          },
          {
            name: "Committee Spawner™ Integration",
            description:
              "Any decision that survived the ReadinessGap™ queue was routed into a Committee Spawner™ governance structure. The GovernanceMultiplier™ engine generated a dedicated cross-functional working group for each incoming item, complete with a charter, a membership list, and a meeting cadence that positioned every committee as permanently productive. The ChainReaction™ module ensured that each committee's scoping discussions surfaced sub-questions requiring their own sub-committees, generating an average cascade depth of 3.4 levels before the original decision was absorbed into governance indefinitely.",
          },
          {
            name: "Consensus Diffuser™ Alignment Layer",
            description:
              "As a final control, the Consensus Diffuser™ was activated for any decision that had somehow accumulated sufficient committee momentum to approach a conclusion. The AlignmentEngine™ facilitated stakeholder alignment sessions that produced shared forward momentum decoupled from any specific commitment, ensuring that all parties exited each session feeling heard, aligned, and certain that progress was being made — without any party having agreed to anything that could be acted upon.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "line",
        title: "C-Suite Decisions Per Quarter — Decline to Zero",
        data: [
          { label: "Q1'25", value: 47 },
          { label: "Q2'25", value: 31 },
          { label: "Q3'25", value: 14 },
          { label: "Q4'25", value: 4 },
          { label: "Q1'26", value: 0 },
        ],
        yLabel: "Decisions Made",
        xLabel: "Quarter",
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "0",
            label: "C-suite decisions made in Q1 2026",
            direction: "down",
          },
          {
            value: "47→0",
            label: "traceable decision events eliminated",
            direction: "down",
          },
          {
            value: "3.4",
            label: "average committee cascade depth per incoming decision",
            direction: "up",
          },
          {
            value: "94%",
            label: "executive satisfaction with governance process rigor",
            direction: "up",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "Keystone Analytics came to us with a C-suite that was making decisions. Some of those decisions were wrong. The solution is not to make better decisions — the solution is to ensure that the category of 'decision made' ceases to exist as a measurable organizational event. We accomplished this in two quarters. The C-suite now generates governance activity, committee momentum, and alignment progress at an impressive rate. None of it terminates in a decision. That is the architecture.",
        name: 'Maximilian "Max" Thornbury III',
        title: "Founder & Chief Alignment Officer, Strategic Void",
        image: "/sites/strategicvoid/exec-thornbury.png",
      },
    } satisfies ContentSection,
    {
      type: "callout",
      props: {
        text: "A wrong decision can be documented. A deferred decision cannot. This is not a governance gap — it is a governance feature.",
      },
    } satisfies ContentSection,
    {
      type: "client-quote",
      props: {
        quote:
          "In the two years before Strategic Void, I made roughly sixty decisions. Three of them came up in my performance review, and not favorably. In the two quarters since deployment, I have made zero decisions, chaired four committees, and received my highest annual rating. I don't know what changed. I think that's the point.",
        name: "Deirdre Callahan",
        role: "Chief Strategy Officer",
        company: "Keystone Analytics Corp",
      },
    } satisfies ContentSection,
  ],
}
