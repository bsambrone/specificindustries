import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const strattonManagementLayers: CaseStudy = {
  slug: "stratton-management-layers",
  title: "Stratton Industries Doubled Management Layers with Zero Output Change",
  company: "Stratton Industries",
  industry: "Manufacturing",
  solutionArea: "middle-management",
  heroStat: {
    value: "2x",
    label: "management layers added",
  },
  summary:
    "Stratton Industries engaged Strategic Void to address a dangerous organizational anomaly: a flat reporting structure that was inadvertently allowing employees to make decisions, take initiative, and produce results without adequate oversight. By doubling the number of management layers across the enterprise, Strategic Void restored the proper separation between those who do work and those who observe it — with no measurable change in output.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "2x", label: "management layers added" },
        company: "Stratton Industries",
        industry: "Manufacturing",
        solutionArea: "middle-management",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "Stratton Industries had built its 4,800-person manufacturing operation on a deceptively simple organizational model: a lean hierarchy in which individual contributors reported directly to senior leaders, decisions were made at the point of execution, and accountability was embarrassingly easy to trace. On paper, the structure looked efficient. In practice, it was a liability.",
          "\"Our people were making judgment calls without asking anyone,\" said SVP of Operations Gerald Tanner, who has since been promoted to a newly created role. \"A line supervisor would identify a bottleneck and just — fix it. No escalation. No approval chain. No documentation of the approval chain. It was chaos, but the organized kind, which is somehow worse.\"",
          "The root cause was structural. With only two management layers between frontline workers and executive leadership, there was simply not enough organizational distance to absorb, dilute, and redirect the energy of employees who wanted to contribute. Every initiative reached a decision-maker too quickly. Every problem got solved before it could become a strategic priority. Something had to be done.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach",
      props: {
        steps: [
          {
            name: "Hierarchy Density Assessment",
            description:
              "Strategic Void embedded a team of eight consultants across Stratton's three manufacturing campuses for five weeks to map every reporting relationship, decision point, and accountability node. The assessment identified 312 instances per week where an employee had resolved a problem without obtaining written authorization from a manager who had not yet been informed the problem existed.",
          },
          {
            name: "Hierarchy Harmonizer™ Deployment",
            description:
              "The Hierarchy Harmonizer™ platform was used to model a restructured org chart that doubled management layers from three to six tiers. Each new layer was populated by re-titling existing managers with expanded scope and reduced span of control, ensuring every decision now required traversal through at least four people before reaching someone empowered to say yes — or, more commonly, defer.",
          },
          {
            name: "Authority Amplifier™ Integration",
            description:
              "Authority Amplifier™ was deployed to the newly created middle-management tiers, equipping each manager with the communication frameworks and status signaling tools needed to project decisional authority without exercising it. Managers could now convene alignment meetings, request additional input, and escalate upward with the confidence that the system would support them indefinitely.",
          },
          {
            name: "Accountability Absorber™ Rollout",
            description:
              "To ensure that the new layers did not inadvertently create new accountability nodes, Accountability Absorber™ was activated across all six tiers. Each decision was now owned by a cross-functional steering group rather than an individual, distributing responsibility so broadly that no single person could be identified as having made a specific choice — which, Stratton's legal team noted, had certain additional advantages.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "bar",
        title: "Management Layers by Division — Before and After",
        data: [
          { label: "Operations", value: 6 },
          { label: "Supply Chain", value: 6 },
          { label: "Quality", value: 5 },
          { label: "Engineering", value: 6 },
          { label: "Finance", value: 5 },
        ],
        yLabel: "Management Layers",
        xLabel: "Division",
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "2x",
            label: "management layers across all divisions",
            direction: "up",
          },
          {
            value: "0%",
            label: "change in total output",
            direction: "down",
          },
          {
            value: "91%",
            label: "reduction in unauthorized employee decisions",
            direction: "down",
          },
          {
            value: "6",
            label: "approvals now required per operational change",
            direction: "up",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "A flat organization is an organization that has not yet discovered how much it could accomplish by doing less with more people. Stratton came to us producing results efficiently. They leave producing the same results inefficiently, which is a profoundly more defensible position from an organizational standpoint. We doubled the layers. We did not disturb the output. That is the art.",
        name: 'Maximilian "Max" Thornbury III',
        title: "Founder & Chief Ambiguity Officer, Strategic Void",
        image: "/sites/strategicvoid/exec-thornbury.png",
      },
    } satisfies ContentSection,
    {
      type: "client-quote",
      props: {
        quote:
          "Before Strategic Void, I had eight direct reports and made twelve decisions a day. Now I have two direct reports, sit on four steering committees, and haven't made a decision in six months. My engagement score has never been higher.",
        name: "Patricia Olmstead",
        role: "Director of Operational Alignment (newly created role)",
        company: "Stratton Industries",
      },
    } satisfies ContentSection,
  ],
}
