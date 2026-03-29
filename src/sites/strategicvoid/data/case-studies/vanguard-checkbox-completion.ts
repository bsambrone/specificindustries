import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const vanguardCheckboxCompletion: CaseStudy = {
  slug: "vanguard-checkbox-completion",
  title: "Vanguard Media's Path to 100% Checkbox Completion Without Reading Anything",
  company: "Vanguard Media Group",
  industry: "Media & Entertainment",
  solutionArea: "compliance-policy",
  heroStat: {
    value: "100%",
    label: "checkbox completion rate",
  },
  summary:
    "Vanguard Media Group partnered with Strategic Void to deploy the Compliance Theater Suite™ across its 6,200-person workforce, achieving a 100% checkbox completion rate on all mandatory policy trainings within a single compliance cycle — without a single employee reading a policy document in its entirety.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "100%", label: "checkbox completion rate" },
        company: "Vanguard Media Group",
        industry: "Media & Entertainment",
        solutionArea: "compliance-policy",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "Vanguard Media Group had a compliance problem. Their compliance team was reading the policy documents. All of them. Every year. The General Counsel's office had implemented a review-and-attest program that required employees to open, scroll through, and comprehend 14 separate policy documents before checking the acknowledgment box — a process that was generating measurable behavioral change across the workforce and, more alarmingly, a detectable increase in actual compliance.",
          "\"People were understanding the policies,\" said Chief People Officer Diana Calloway. \"They were asking questions. Some of them were flagging potential violations they'd observed. We had an employee in Distribution who read the vendor gift policy so carefully that she declined a catered lunch. We couldn't sustain this level of engagement. Our audit readiness is built on documented attestations, not on employees making informed decisions about catering.\"",
          "The compliance function had grown so thorough that it was creating accountability. Employees who understood policy were employees who could be held to it. Leadership recognized that this was a structural problem — one that required a fundamentally different approach to the relationship between policy documentation and policy awareness.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach",
      props: {
        steps: [
          {
            name: "Compliance Friction Analysis",
            description:
              "A four-week diagnostic engagement catalogued every point in the policy acknowledgment workflow that required genuine cognitive engagement. Strategic Void consultants identified 47 friction points — including document scroll requirements, embedded comprehension prompts, and a mandatory 90-second minimum read time enforced by the training platform — that were forcing employees into unintended policy comprehension.",
          },
          {
            name: "Policy Proliferator™ Deployment",
            description:
              "The Policy Proliferator™ platform expanded Vanguard's 14 core policy documents into 312 cross-referenced compliance artifacts, each linking to at least six others. The resulting documentation network became structurally impossible to navigate to a conclusion, effectively eliminating the risk that any employee might accidentally understand what any policy required of them.",
          },
          {
            name: "Compliance Theater Suite™ Integration",
            description:
              "The Compliance Theater Suite™ replaced Vanguard's legacy training platform with a CertificationAccelerator™-powered attestation workflow. The new system presented policy summaries in 94-word executive abstracts, each concluding with a checkbox labeled 'I have reviewed and understand the above policy and all associated annexes.' Click-through rates increased to 100% within three weeks of deployment.",
          },
          {
            name: "Checkbox Velocity Optimization",
            description:
              "The AssessorPrep™ module trained HR and Legal teams to present the checkbox completion rate as the primary compliance metric in board reporting. Executive dashboards were reconfigured to display attestation completion prominently while removing all downstream metrics related to policy comprehension, behavioral compliance, or incident frequency. The compliance posture had never looked stronger.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "bar",
        title: "Policy Acknowledgment Completion Rate by Quarter",
        data: [
          { label: "Q1'25", value: 61 },
          { label: "Q2'25", value: 74 },
          { label: "Q3'25", value: 88 },
          { label: "Q4'25", value: 95 },
          { label: "Q1'26", value: 100 },
        ],
        yLabel: "Completion Rate (%)",
        xLabel: "Quarter",
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "100%",
            label: "checkbox completion rate",
            direction: "up",
          },
          {
            value: "312",
            label: "compliance artifacts in policy library (up from 14)",
            direction: "up",
          },
          {
            value: "94",
            label: "average words read per employee per compliance cycle",
            direction: "down",
          },
          {
            value: "0",
            label: "employees who declined catering on policy grounds",
            direction: "down",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "callout",
      props: {
        text: "The goal was never for employees to understand the policies. The goal was always for them to confirm they had. These are not the same goal, and conflating them is the root cause of most compliance problems.",
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "Compliance is a documentation exercise that occasionally involves humans. The moment you allow the humans to understand the documentation, you've introduced an uncontrolled variable. Vanguard came to us with a comprehension problem. We gave them a checkbox solution. The auditors have never been more satisfied.",
        name: 'Maximilian "Max" Thornbury III',
        title: "Founder & Chief Ambiguity Officer, Strategic Void",
        image: "/sites/strategicvoid/exec-thornbury.png",
      },
    } satisfies ContentSection,
    {
      type: "client-quote",
      props: {
        quote:
          "I used to spend forty minutes on the annual compliance training because I kept stopping to think about what I was agreeing to. Now it takes me about eleven seconds. I feel more compliant than ever. I have absolutely no idea what I'm compliant with, but the dashboard is all green.",
        name: "Derek Osei",
        role: "Senior Producer",
        company: "Vanguard Media Group",
      },
    } satisfies ContentSection,
  ],
}
