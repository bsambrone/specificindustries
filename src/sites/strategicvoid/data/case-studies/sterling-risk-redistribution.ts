import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const sterlingRiskRedistribution: CaseStudy = {
  slug: "sterling-risk-redistribution",
  title: "How Sterling Pharmaceuticals Redistributed Risk Until Nobody Was Responsible",
  company: "Sterling Pharmaceuticals",
  industry: "Pharmaceutical",
  solutionArea: "compliance-policy",
  heroStat: {
    value: "0",
    label: "identifiable risk owners",
  },
  summary:
    "Sterling Pharmaceuticals engaged Strategic Void to address a critical governance vulnerability: risk ownership was concentrated in named individuals, creating an accountability infrastructure that could be traced directly to decisions and their consequences. Following a full deployment of the Responsibility Redistributor™ platform, Sterling achieved zero identifiable risk owners across all material compliance domains.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "0", label: "identifiable risk owners" },
        company: "Sterling Pharmaceuticals",
        industry: "Pharmaceutical",
        solutionArea: "compliance-policy",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "Sterling Pharmaceuticals had built a governance structure that worked too well. Over twelve years, the compliance team had developed a RACI matrix of extraordinary precision — each risk domain had a single accountable owner, a documented escalation path, and a named individual who could be located and questioned when something went wrong. The board considered this a strength. Legal considered it a liability.",
          "\"We had a Chief Risk Officer who actually owned risk,\" said Sterling's General Counsel, Patricia Waverley. \"When regulators called, they asked to speak with her. When an incident occurred, there was a documented decision trail that led to a specific person who had made a specific choice. This was not the kind of governance architecture that protects an organization. It was the kind that exposes one.\"",
          "The concentration of accountability had become so severe that three risk owners were fielding direct inquiries from FDA representatives, two had been named in a shareholder letter, and one had declined a promotion specifically because accepting it would have added three more risk domains to her documented portfolio. Risk ownership had become the most professionally dangerous role in the organization. Something had to be done.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach-timeline",
      props: {
        title: "Redistribution Engagement Timeline",
        milestones: [
          {
            phase: "Week 1–3",
            title: "Accountability Concentration Audit",
            description:
              "Strategic Void consultants conducted a full mapping of Sterling's RACI matrix, identifying 34 compliance domains with single accountable owners. A Responsibility Heat Map™ confirmed that 61% of material risk exposure was traceable to fewer than eight individuals — a concentration density our team classified as Forensically Dangerous.",
          },
          {
            phase: "Week 4–7",
            title: "Responsibility Redistributor™ Deployment",
            description:
              "The OwnershipDiffusion™ engine was configured to Sterling's governance architecture and integrated with the GRC platform, HRIS system, and compliance management suite. The RACI Multiplier™ module began processing each Accountable designation, transforming single ownership into joint accountability structures spanning a minimum of four organizational roles.",
          },
          {
            phase: "Week 8–11",
            title: "Cross-Functional Implication Rollout",
            description:
              "The CrossFunction Implicator™ expanded 19 single-department risk domains into multi-unit shared responsibility structures. Each expansion was documented with a governance justification memo citing regulatory risk, stakeholder impact, and cross-functional dependency — all of which were technically accurate and none of which meaningfully described the actual reason for the change.",
          },
          {
            phase: "Week 12–14",
            title: "Accountability Architecture Verification",
            description:
              "Final verification confirmed that no compliance domain retained a single identifiable accountable owner. External counsel conducted a mock regulatory inquiry simulation; when asked who owned the relevant risk domain, three different respondents named four different people, two of whom named each other. The redistribution was complete.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "before-after",
      props: {
        title: "Risk Ownership Architecture: Before & After",
        before: {
          label: "Before Strategic Void",
          items: [
            "34 risk domains with single named accountable owners",
            "Direct regulatory inquiry lines to specific individuals",
            "Documented decision trails traceable to named executives",
            "Risk owners declining promotions to avoid accountability exposure",
            "Shareholders able to identify who made which risk decisions",
            "General counsel receiving targeted legal correspondence",
          ],
        },
        after: {
          label: "After Strategic Void",
          items: [
            "0 risk domains with a single identifiable accountable owner",
            "All regulatory inquiries routed to a shared governance inbox",
            "Decision trails distributed across minimum 4 co-accountable roles",
            "Promotions accepted freely — responsibility follows nobody upward",
            "Shareholders presented with a Responsibility Heat Map™ showing diffuse ownership",
            "Legal correspondence addressed to 'The Compliance Function'",
          ],
        },
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "pie",
        title: "Post-Redistribution Risk Ownership Distribution",
        data: [
          { label: "Jointly Accountable (4+ roles)", value: 58 },
          { label: "Shared Governance Committee", value: 22 },
          { label: "Cross-Functional Working Group", value: 14 },
          { label: "Pending Ownership Assignment", value: 6 },
        ],
        yLabel: "% of Risk Domains",
        xLabel: "Ownership Category",
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "0",
            label: "identifiable risk owners across all material domains",
            direction: "down",
          },
          {
            value: "34→0",
            label: "single-owner risk domains eliminated",
            direction: "down",
          },
          {
            value: "4.7",
            label: "average co-accountable owners per risk domain",
            direction: "up",
          },
          {
            value: "0",
            label: "executive-level accountability events in 18 months post-deployment",
            direction: "down",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "In governance, there is a common misconception that accountability requires an accountable person. This is bureaucratic thinking. True organizational resilience is achieved when responsibility is distributed so thoroughly that any inquiry into who owns a given risk domain produces a list of parties, each of whom can credibly point to the others. Sterling Pharmaceuticals is now a model of this architecture.",
        name: "J. Rutherford Pennington",
        title: "Chief Disruption Evangelist, Strategic Void",
        image: "/sites/strategicvoid/exec-pennington.png",
      },
    } satisfies ContentSection,
  ],
}
