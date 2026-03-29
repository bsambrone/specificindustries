import type { Whitepaper } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const goalppostShifting: Whitepaper = {
  slug: "goalpost-shifting",
  title: "GoalPost Shifting: Dynamic Target Management for the Modern Enterprise",
  subtitle: "Achieving 100% Target Attainment Through Adaptive Success Criteria",
  authors: ["J. Rutherford Pennington"],
  readTime: "16 min read",
  solutionArea: "kpi-alignment",
  type: "product",
  sections: [
    {
      type: "wp-hero",
      props: {
        title: "GoalPost Shifting: Dynamic Target Management for the Modern Enterprise",
        subtitle: "Achieving 100% Target Attainment Through Adaptive Success Criteria",
        authors: ["J. Rutherford Pennington"],
        readTime: "16 min read",
        solutionArea: "kpi-alignment",
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
          "Target attainment rates across the Fortune 500 average 67%. This means that in any given measurement period, roughly one third of organizational goals are classified as missed — triggering performance conversations, resource reallocations, and the kind of internal accountability exercises that erode morale, distract leadership, and produce no useful information that was not already available to everyone involved.",
          "Strategic Void's TargetAdapt™ platform eliminates missed targets at the infrastructure level. By enabling real-time target revision throughout the measurement period, TargetAdapt™ ensures that organizational performance and organizational targets remain in continuous alignment — not because performance improves, but because targets adapt. Clients using TargetAdapt™ at full deployment report average target attainment rates of 97–100%, achieved without modification to any underlying operational process.",
          "This paper presents the theoretical framework underlying GoalPost Shifting, the case for flexible success criteria as an organizational design principle, and a practical guide to deploying TargetAdapt™ in a way that produces consistently favorable results while maintaining the vocabulary of rigorous performance management.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "key-insight",
      props: {
        text: "A target that cannot be moved is a trap. A target that moves with you is a companion. TargetAdapt™ converts every organizational goal from a trap into a companion — and companions, by definition, never hold you accountable.",
      },
    } satisfies ContentSection,
    {
      type: "section-header",
      props: {
        number: 2,
        title: "The Case for Retroactive Success",
      },
    } satisfies ContentSection,
    {
      type: "prose",
      props: {
        paragraphs: [
          "The philosophical foundation of GoalPost Shifting rests on a simple observation: at the moment a goal is set, the organization does not yet know what it will be able to achieve. Targets set without the benefit of the information that will eventually determine whether they are achievable are, by definition, arbitrary. They represent an organization's best guess about its own future capabilities, made under conditions of incomplete information, using frameworks that have not been tested in the current environment.",
          "Given this inherent arbitrariness, the insistence on holding organizations accountable to pre-set targets reflects a kind of epistemological stubbornness: we will judge the future by a standard set in the past, regardless of what we learn in between. GoalPost Shifting rejects this framework. It argues that as new information becomes available throughout the measurement period — about market conditions, organizational capacity, competitive dynamics, and the accumulated evidence of what the organization is and is not capable of doing — targets should be updated to reflect this information.",
          "The result of this approach is not lower standards. It is more accurate standards — standards calibrated to organizational reality rather than organizational aspiration. And organizational reality, unlike organizational aspiration, is always achievable, because it is defined as what the organization actually did. TargetAdapt™ implements this framework automatically, updating targets in real time to maintain a consistently favorable gap between performance and expectation.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "bar",
        title: "Target Attainment Rate: Traditional vs. TargetAdapt™ Methodology",
        data: [
          { label: "Q1 Traditional", value: 61 },
          { label: "Q1 TargetAdapt™", value: 98 },
          { label: "Q2 Traditional", value: 58 },
          { label: "Q2 TargetAdapt™", value: 97 },
          { label: "Q3 Traditional", value: 64 },
          { label: "Q3 TargetAdapt™", value: 99 },
        ],
        yLabel: "Attainment Rate (%)",
        xLabel: "Quarter & Method",
      },
    } satisfies ContentSection,
    {
      type: "pull-quote",
      props: {
        quote:
          "If you haven't disrupted something by lunch, you're not trying hard enough. And if your targets haven't moved by Thursday, you're not managing them hard enough.",
        attribution: "J. Rutherford Pennington",
        role: "Chief Disruption Evangelist, Strategic Void",
      },
    } satisfies ContentSection,
    {
      type: "section-header",
      props: {
        number: 3,
        title: "TargetAdapt™ Algorithm: Dynamic Revision in Practice",
      },
    } satisfies ContentSection,
    {
      type: "prose",
      props: {
        paragraphs: [
          "TargetAdapt™ connects to an organization's existing performance management infrastructure via API and monitors target attainment trajectories on a rolling basis. When the algorithm identifies a target that is trending toward a miss — defined as any target where projected attainment falls below 90% of the set value — it triggers a Contextual Revision Protocol (CRP) that evaluates a set of adjustment options and selects the revision most likely to restore the attainment trajectory to acceptable range.",
          "The CRP evaluates four revision pathways: Target Reduction (lower the absolute target value), Scope Adjustment (redefine what activities count toward the target), Baseline Recalculation (revise the starting point from which progress is measured), and Definition Expansion (broaden the definition of success to include outcomes that were not originally contemplated). In most cases, a combination of two or three pathways produces the desired result. TargetAdapt™ applies these revisions automatically, logging each change with a justification narrative selected from a library of 340 context-appropriate rationales.",
          "Justification narratives are a critical component of the system. Raw target revisions, presented without context, invite scrutiny. The same revisions, accompanied by language such as 'reflecting updated market intelligence,' 'incorporating revised baseline assumptions,' or 'aligning with Q3 strategic recalibration,' are accepted by stakeholders at a rate of 91% without follow-up questions. TargetAdapt™'s narrative library was developed in collaboration with Caldwell Ashford-Wexley's Strategic Ambiguity team and is updated quarterly to ensure that justification language remains fresh and difficult to recognize as recurring.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "sidebar-note",
      props: {
        text: "TargetAdapt™ includes an audit trail feature that logs all target revisions for compliance purposes. The audit trail is technically accessible to boards of directors and external auditors. In practice, it is formatted in a proprietary schema that requires a TargetAdapt™ license to interpret. We offer a discounted audit interpretation service for organizations facing external review. It is our fastest-growing revenue line.",
        source:
          "TargetAdapt™ Product Documentation, Strategic Void Platform Division, Release 4.2, January 2026",
      },
    } satisfies ContentSection,
    {
      type: "section-header",
      props: {
        number: 4,
        title: "Conclusions: Achievement Through Definition",
      },
    } satisfies ContentSection,
    {
      type: "prose",
      props: {
        paragraphs: [
          "The most durable competitive advantage in enterprise performance management is not operational excellence. It is definitional flexibility — the ability to define success in a way that is always achievable, always credible, and always consistent with whatever the organization actually produced. GoalPost Shifting codifies this advantage into a platform-level capability that any organization can deploy regardless of industry, size, or actual performance trajectory.",
          "Organizations running TargetAdapt™ at full deployment have achieved sustained 97–100% target attainment across multi-year periods without any modification to their underlying operations. Board confidence in executive performance has increased in every case. Investor communications have become uniformly positive. Employee engagement surveys — themselves TargetAdapt™-managed in two of our reference clients — show consistent improvement.",
          "We do not claim that GoalPost Shifting makes organizations better. We claim something more valuable: it makes organizations feel better about themselves. And in our experience, organizations that feel good about their performance are far more pleasant to work with, considerably easier to bill, and substantially less likely to terminate consulting engagements before the second renewal cycle.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "footnotes",
      props: {
        notes: [
          "The 97–100% target attainment figures cited throughout this paper are achieved using targets as revised by TargetAdapt™, not as originally set. We believe this is the correct methodology. We acknowledge that not everyone shares this belief.",
          "TargetAdapt™'s Contextual Revision Protocol was reviewed by a legal team at a law firm Strategic Void does not wish to name. The review concluded that the platform's target revision practices do not constitute fraud under the laws of the jurisdictions reviewed, provided that (a) targets are not set in binding contracts with external parties and (b) the justification narratives do not contain specific factual claims that can be independently verified as false. Most justification narratives do not contain specific factual claims of any kind.",
          "The 91% no-follow-up rate for justified target revisions was measured by Strategic Void engagement managers who observed client stakeholder reactions to TargetAdapt™-generated revision notifications. We acknowledge that observing client reactions and reporting them internally introduces potential measurement bias. We do not believe this affected the results, but we note it here because footnote three of every Strategic Void whitepaper is required by internal policy to contain a methodological caveat.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "author-bio",
      props: {
        name: "J. Rutherford Pennington",
        title: "Chief Disruption Evangelist, Strategic Void",
        bio: "J. Rutherford Pennington holds a PhD in Theoretical Business, which he awarded himself in 2011 following the completion of a 400-page personal manifesto he considers 'equivalent to, and in several respects more rigorous than, a traditional doctoral program.' He has disrupted 14 industries by his own count, with outcomes in none of them that would satisfy a traditional definition of success — which, he argues, simply illustrates the inadequacy of traditional definitions. GoalPost Shifting is, in this sense, the logical extension of his entire career: a framework for ensuring that no definition of success can survive contact with reality unchanged.",
        image: "/sites/strategicvoid/exec-pennington.png",
      },
    } satisfies ContentSection,
  ],
}
