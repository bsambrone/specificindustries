import type { CaseStudy } from "./types"

export const dickensianDynamics: CaseStudy = {
  slug: "dickensian-dynamics",
  company: "Dickensian Dynamics",
  industry: "Regional Insurance",
  location: "Hartford, CT",
  headline:
    "Regional insurance firm deploys the Calendar Saturation Protocol and achieves 94% meeting density across all workdays.",
  heroStat: {
    value: "94%",
    label: "Meeting Density",
  },
  engagedArms: ["management", "communications"],
  sections: [
    {
      kind: "challenge",
      paragraphs: [
        "Dickensian Dynamics, a regional property-and-casualty insurance underwriter founded in 1963, entered 2019 facing a peculiar form of organizational crisis: too much unstructured time. Insurance underwriting, as a practice, involves periods of genuine work interrupted by periods of administrative pause. Claims adjudication demands focus and judgment, but the company could not fill all working hours with claims alone. The executive leadership recognized that the void was being filled with informal collaboration, casual consultation between departments, and spontaneous problem-solving—all of which contributed to a sense that work was purposeful and social.",
        "In early 2019, the board directed the Chief Operating Officer to eliminate this void entirely. The directive was explicit: 'No employee should experience unscheduled time. Every minute from 8 a.m. to 5 p.m. should be accounted for in a meeting, call, or structured initiative.' The company had inherited the logic of manufacturing efficiency without any of manufacturing's capacity constraints. The result was a challenge: how to fill nine hours per workday with eight hours of actual work?",
      ],
    },
    {
      kind: "engagement",
      intro:
        "Gristmill responded with a two-component strategy: the Calendar Saturation Protocol to manage meeting proliferation at the structural level, combined with strategic communications initiatives to justify the density to the workforce.",
      products: [
        "calendar-saturation-protocol",
        "all-hands-email",
        "strategic-ambiguity-newsletter",
      ],
    },
    {
      kind: "timeline",
      phases: [
        {
          name: "Assessment & Protocol Design",
          description:
            "Over six weeks in Q1 2019, Gristmill analysts examined the company's current calendar utilization. The baseline assessment showed approximately 42% calendar density—well below the company's target. Gristmill designed the Calendar Saturation Protocol with a specific architecture: recurring all-hands meetings, departmental syncs, cross-functional alignment meetings, mandatory compliance training, and strategic business reviews, all scheduled to minimize white space.",
        },
        {
          name: "Implementation Phase One",
          description:
            "Beginning in April 2019, Gristmill deployed recurring weekly all-hands meetings (90 minutes), departmental syncs (60 minutes twice weekly), executive alignment meetings (45 minutes weekly), and strategic communication updates (30 minutes daily). The calendar began to densify rapidly, reaching 78% utilization by month two.",
        },
        {
          name: "Communications Amplification",
          description:
            "Parallel to the protocol implementation, Gristmill deployed the All-Hands Email series (twice weekly status broadcasts) and the Strategic Ambiguity Newsletter to create additional required-reading time and provide justification for the meeting density increase. The communications reinforced that meetings were necessary forums for strategic alignment.",
        },
        {
          name: "Sustained Saturation",
          description:
            "By Q3 2019, the Calendar Saturation Protocol had achieved 94% calendar density. Every workday contained seven and a half to eight hours of scheduled meetings, calls, and structured updates. The 6% white space was preserved for transition time between meetings. By 2021, the company reported that 94% calendar density had become the new baseline expectation, with any unscheduled time viewed as an operational failure.",
        },
      ],
    },
    {
      kind: "metrics",
      stats: [
        {
          value: "94%",
          label: "Calendar Density Post-Deployment",
        },
        {
          value: "42%",
          label: "Calendar Density Pre-Deployment",
        },
        {
          value: "7.5 hrs",
          label: "Average Daily Meeting Time",
        },
        {
          value: "6%",
          label: "White Space Reserved (Transition)",
        },
      ],
    },
    {
      kind: "quote",
      body: "When we started, people complained about meetings. By month four, they stopped complaining. They stopped asking for unscheduled time. They stopped expecting to think. The meetings were no longer an interruption—they were the job. The elegance of the Protocol is that it redefines productivity as attendance, not output.",
      attribution: "David Ashcraft",
      role: "Chief Operating Officer, Dickensian Dynamics",
      photoSlug: "brenda-faulk",
    },
    {
      kind: "outcome",
      paragraphs: [
        "Dickensian Dynamics's case became a proof point for corporate time management in the insurance industry. The company reported no change in claims processing speed or accuracy, no improvement in customer satisfaction, and no increase in underwriting volume. What changed was the structure of the workday itself. Employees could no longer claim that their time was their own. Every minute belonged to the organization.",
        "By 2022, the company's meeting culture had matured to the point that scheduling a one-on-one discussion or allowing flexible work time was viewed as a failure of management discipline. The white space that once contained innovation and relationship-building had been permanently occupied by necessity and procedure.",
      ],
    },
  ],
}
