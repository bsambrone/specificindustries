import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const broadleafEmailClarity: CaseStudy = {
  slug: "broadleaf-email-clarity",
  title: "How Broadleaf Consulting Reduced Email Clarity by 89%",
  company: "Broadleaf Consulting Group",
  industry: "Management Consulting",
  solutionArea: "communication-enhancement",
  heroStat: {
    value: "89%",
    label: "reduction in email clarity",
  },
  summary:
    "Broadleaf Consulting Group deployed the full Communication Enhancement suite — Ambiguity Amplifier™, Passive Voice Optimizer™, and Email Elongator™ — to address a systemic communications hazard: emails were too clear. Within six months, Broadleaf achieved an 89% reduction in measured email clarity, eliminating the paper trail of commitments that had been accumulating across client engagements for years.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "89%", label: "reduction in email clarity" },
        company: "Broadleaf Consulting Group",
        industry: "Management Consulting",
        solutionArea: "communication-enhancement",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "Broadleaf Consulting Group had built its client communication practice on a principle of directness. Emails had clear subject lines. Deliverables had specific due dates. Action items were written in active voice with named owners. Follow-up threads were concise. The firm had even developed an internal style guide requiring that every email end with a numbered list of next steps.",
          "\"We thought clarity was a competitive differentiator,\" said Managing Partner Evan Brightwell. \"We were wrong. Clarity is a paper trail. When you tell a client specifically what you'll deliver, specifically when, and specifically who is responsible — and then the engagement evolves, as engagements do — you've created a document record of all the ways the outcome diverged from the commitment. Our inbox was a museum of things we said we would do.\"",
          "Client dispute resolution had become increasingly difficult. When clients raised concerns about deliverable scope, Broadleaf's own email archive was routinely used as evidence against them. Two partners had stopped putting delivery dates in writing entirely, creating a different problem: clients who claimed agreements that no one remembered making. The firm needed a communications architecture that was neither too specific nor too vague — it needed to be specifically vague.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach",
      props: {
        steps: [
          {
            name: "Communications Liability Audit",
            description:
              "A three-week review of Broadleaf's email archive identified 2,340 messages containing what Strategic Void classified as Commitment-Bearing Language — specific deliverables, named owners, binary decisions, and date references that could be held to a standard. The audit concluded that 94% of Broadleaf's external communications contained at least one recoverable commitment, a figure our team considered alarming.",
          },
          {
            name: "Ambiguity Amplifier™ Deployment",
            description:
              "The VaguenessCore™ engine was integrated across all partner and senior associate email accounts. The CommitmentNeutralizer™ module was configured to transform delivery commitments into directional language, convert named owners into shared accountability constructions, and replace binary decisions with evolving-landscape framing. Within thirty days, the average number of recoverable commitments per external email fell from 3.4 to 0.4.",
          },
          {
            name: "Passive Voice Optimizer™ Rollout",
            description:
              "The AccountabilityEraser™ engine was deployed firm-wide to ensure that all written communications containing references to outcomes, errors, or scope changes used agentless constructions. 'We underestimated the timeline' became 'The timeline required recalibration.' 'Our team missed the deliverable' became 'The deliverable milestone was not achieved within the originally anticipated window.' Attribution dropped by 89% across outgoing correspondence.",
          },
          {
            name: "Email Elongator™ Integration",
            description:
              "The VerbosityEngine™ was deployed to address the secondary clarity problem: short emails were too easy to interpret. The ExpansionMatrix™ algorithm wrapped every outgoing message in contextual preamble, stakeholder acknowledgment, and a closing reinforcement section that restated the body in different terms without adding information. Clients reported that emails felt 'thorough' and 'comprehensive.' Requests for clarification fell 76% as recipients stopped asking questions they sensed would generate longer non-answers.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "89%",
            label: "reduction in measured email clarity",
            direction: "down",
          },
          {
            value: "0.4",
            label: "recoverable commitments per external email (down from 3.4)",
            direction: "down",
          },
          {
            value: "76%",
            label: "reduction in client clarification requests",
            direction: "down",
          },
          {
            value: "340%",
            label: "increase in email length",
            direction: "up",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "line",
        title: "Recoverable Commitments Per Email Over Time",
        data: [
          { label: "Month 1", value: 34 },
          { label: "Month 2", value: 27 },
          { label: "Month 3", value: 18 },
          { label: "Month 4", value: 11 },
          { label: "Month 5", value: 6 },
          { label: "Month 6", value: 4 },
        ],
        yLabel: "Commitments (per 10 emails)",
        xLabel: "Month",
      },
    } satisfies ContentSection,
    {
      type: "before-after",
      props: {
        title: "Communication Style Transformation",
        before: {
          label: "Before Strategic Void",
          items: [
            "Emails ended with numbered next steps and named owners",
            "Delivery dates stated explicitly in writing",
            "Active voice creating direct accountability trails",
            "Short, scannable emails that conveyed single clear requests",
            "Client archive used as evidence in scope disputes",
            "Partners declining to commit in writing — creating verbal agreement ambiguity",
          ],
        },
        after: {
          label: "After Strategic Void",
          items: [
            "Emails end with 'forward-looking alignment statements' that imply next steps without specifying them",
            "Timelines framed as 'anticipated windows subject to scope evolution'",
            "Passive constructions ensure outcomes are unattributable to named parties",
            "Emails average 6.2x original length, reducing comprehension and follow-through",
            "Client archive contains no recoverable commitments on any material deliverable",
            "Verbal and written communications aligned: both are equally non-binding",
          ],
        },
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "Clarity is the enemy of flexibility, and flexibility is the product that consulting firms actually sell. Broadleaf had confused the medium — clear writing — with the message, which should always be: we are moving in a direction, together, toward an outcome that we will define more precisely at a future date. The Communication Enhancement suite gave them the language to sell that product fluently.",
        name: "Caldwell Ashford-Wexley",
        title: "Senior Director, Strategic Ambiguity, Strategic Void",
        image: "/sites/strategicvoid/exec-ashford-wexley.png",
      },
    } satisfies ContentSection,
    {
      type: "callout",
      props: {
        text: "An email that cannot be used against you in a scope dispute is not a vague email. It is a strategically constructed communications asset. There is a difference, and that difference is billable.",
      },
    } satisfies ContentSection,
  ],
}
