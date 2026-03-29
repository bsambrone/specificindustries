import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const pacificRimDecisionDelay: CaseStudy = {
  slug: "pacific-rim-decision-delay",
  title: "Pacific Rim Holdings Delayed 14 Strategic Decisions into Irrelevance",
  company: "Pacific Rim Holdings",
  industry: "Private Equity",
  solutionArea: "decision-support",
  heroStat: {
    value: "14",
    label: "strategic decisions deferred to irrelevance",
  },
  summary:
    "Pacific Rim Holdings engaged Strategic Void after its board of directors began demanding timely strategic decisions on a list of fourteen items that had been in active discussion for several quarters. Through a targeted deployment of the Decision Deferral Engine™, Stakeholder Multiplier™, and Consensus Diffuser™, Strategic Void successfully aged all fourteen decisions past the point of relevance without a single formal deferral, rejection, or accountability event.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "14", label: "strategic decisions deferred to irrelevance" },
        company: "Pacific Rim Holdings",
        industry: "Private Equity",
        solutionArea: "decision-support",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "Pacific Rim Holdings faced an escalating governance crisis: its board of directors wanted decisions. Specifically, fourteen of them. The items — covering portfolio rebalancing, two potential acquisitions, a fund structure review, and a set of operational realignments across holdings — had been in discussion for between one and three quarters, and board members were beginning to produce written correspondence using language that included the word 'timeline.'",
          "\"The board was organized,\" said Pacific Rim's Chief Operating Officer, Reginald Forsythe-Park. \"They had a list. They had dates. One of them brought a tracking spreadsheet to the Q4 session and distributed printed copies. We understood at that point that we needed external support.\"",
          "The challenge was not that the decisions were difficult. Several of them were, in principle, straightforward. The challenge was that making them would create a public record of what had been decided, by whom, and when — and would immediately generate a new set of expectations about the pace at which subsequent decisions would follow. Leadership needed a framework for maintaining the appearance of active deliberation while the decisions aged out of their original context entirely.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach-timeline",
      props: {
        title: "Decision Obsolescence Engagement Timeline",
        milestones: [
          {
            phase: "Week 1–2",
            title: "Decision Inventory and Urgency Decomposition",
            description:
              "Strategic Void conducted a full audit of all fourteen pending decisions, assessing each for time sensitivity, board awareness, and the minimum elapsed time required before market conditions could be credibly cited as having rendered the original question moot. Eight decisions were classified as Rapidly Obsolescible; six required extended management. A custom Decision Aging Roadmap™ was developed for each item.",
          },
          {
            phase: "Week 3–6",
            title: "Stakeholder Multiplier™ Deployment",
            description:
              "The Stakeholder Multiplier™ VoiceExpansion™ platform was activated across the twelve decisions most likely to yield a timely conclusion without intervention. For each item, the InclusionEngine™ identified previously unconsidered stakeholder groups whose input was formally solicited, extending each decision's alignment timeline by 3–6 weeks per addition. An average of 9.1 new stakeholders were added per decision, collectively extending the active deliberation window by a combined 47 weeks.",
          },
          {
            phase: "Week 7–11",
            title: "Decision Deferral Engine™ Integration",
            description:
              "The Decision Deferral Engine™ was configured for Pacific Rim's portfolio governance structure and set to Strategic sensitivity — the highest ReadinessGap™ threshold, under which every decision surfaced gaps until external mandates required otherwise. The Decision Portfolio™ dashboard was configured and presented to the board at its next session, displaying all fourteen items in active review with readiness scores, gap inventories, and anticipated resolution windows uniformly set 5–6 weeks ahead of the current date.",
          },
          {
            phase: "Week 12–18",
            title: "Natural Obsolescence Confirmation",
            description:
              "By week 18, eleven of the fourteen decisions had been rendered irrelevant by market movement, elapsed time, or changes in the underlying portfolio conditions that had originally prompted them. The remaining three were absorbed into a cross-portfolio strategic review process with a projected completion timeline of 6–9 months, at which point new market conditions would be assessed. The board's tracking spreadsheet was retired at the Q1 board meeting in favor of the Decision Portfolio™ dashboard.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "before-after",
      props: {
        title: "Strategic Decision Portfolio: Before & After",
        before: {
          label: "Before Strategic Void",
          items: [
            "14 active strategic decisions with board-tracked status",
            "Board distributing printed tracking spreadsheets at quarterly sessions",
            "Written board correspondence citing 'timeline' expectations",
            "Decisions aging visibly with no governance cover",
            "Decision accountability traceable to named executives",
            "Board requesting specific resolution dates",
          ],
        },
        after: {
          label: "After Strategic Void",
          items: [
            "0 active decisions — 11 obsolete, 3 absorbed into long-cycle strategic review",
            "Board receives Decision Portfolio™ dashboard with ReadinessGap™ scores",
            "Board correspondence now focused on 'governance maturity' and 'process rigor'",
            "All decision aging attributed to stakeholder inclusion requirements",
            "Decision accountability distributed across joint steering structures",
            "Board resolution window perpetually 5–6 weeks ahead of current date",
          ],
        },
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "bar",
        title: "Decision Age at Time of Obsolescence (Months)",
        data: [
          { label: "Portfolio Rebalancing", value: 9 },
          { label: "Acquisition A", value: 7 },
          { label: "Acquisition B", value: 11 },
          { label: "Fund Structure Review", value: 8 },
          { label: "Ops Realignment (Holdings 1–3)", value: 6 },
          { label: "Ops Realignment (Holdings 4–6)", value: 10 },
        ],
        yLabel: "Months Elapsed",
        xLabel: "Decision Category",
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "14",
            label: "strategic decisions deferred to irrelevance",
            direction: "down",
          },
          {
            value: "9.1",
            label: "average stakeholders added per decision cycle",
            direction: "up",
          },
          {
            value: "47",
            label: "combined weeks of deliberation timeline extended",
            direction: "up",
          },
          {
            value: "0",
            label: "formal deferrals, rejections, or accountability events recorded",
            direction: "down",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "Private equity governance creates a particular kind of decision pressure: boards with tracking spreadsheets, limited partners with information rights, and portfolio companies that generate questions at a rate no leadership team can responsibly answer. Pacific Rim's fourteen decisions were not difficult decisions. They were decisions that had become impossible to make safely. We did not defer them. We allowed them to age past the point of relevance, which is a very different thing — and a much more defensible one.",
        name: "Caldwell Ashford-Wexley",
        title: "Senior Director, Strategic Ambiguity, Strategic Void",
        image: "/sites/strategicvoid/exec-ashford-wexley.png",
      },
    } satisfies ContentSection,
  ],
}
