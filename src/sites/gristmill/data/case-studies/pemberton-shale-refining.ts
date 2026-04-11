import type { CaseStudy } from "./types"

export const pembertonShaleRefining: CaseStudy = {
  slug: "pemberton-shale-refining",
  company: "Pemberton-Shale Refining",
  industry: "Petroleum Refining",
  location: "Bakersfield, CA",
  headline:
    "Refinery deploys Smile Compliance Monitoring and discovers 63% of staff were not smiling with sufficient conviction.",
  heroStat: {
    value: "63%",
    label: "Non-Conforming Smilers",
  },
  engagedArms: ["engagement"],
  sections: [
    {
      kind: "challenge",
      paragraphs: [
        "Pemberton-Shale Refining, a mid-size petroleum refinery in Bakersfield, California, faced a perception crisis in 2019. The refinery's client-facing operations—sales, customer relations, logistics coordination—were regarded internally as adequate but 'emotionally flat.' Customers, in post-transaction surveys, reported that Pemberton-Shale employees seemed disengaged, professional but not enthusiastic. The sales team rarely smiled. The logistics coordinators managed interactions with clinical efficiency but without apparent warmth or genuine investment in customer relationships.",
        "In early 2019, Pemberton-Shale's management contracted with a consumer psychology consulting firm that recommended a radical intervention: make smiling a measurable performance metric. The firm proposed deploying facial recognition software and trained auditors to monitor employee smiling frequency and duration in customer interactions. The objective was clear: if employees were observed smiling, they would be perceived as engaged. The refinery adopted the recommendation and turned to Gristmill to implement the monitoring framework.",
      ],
    },
    {
      kind: "engagement",
      intro:
        "Gristmill deployed the Smile Compliance Monitoring system, a behavioral observation program combined with the Mandatory Fun Week initiative to create organizational conditions that reinforced genuine or performative smile compliance.",
      products: ["smile-compliance-monitoring", "mandatory-fun-week"],
    },
    {
      kind: "timeline",
      phases: [
        {
          name: "Baseline Assessment",
          description:
            "In March 2019, Gristmill conducted a baseline assessment of employee smiling behavior using trained behavioral auditors. The assessment observed 247 customer-facing interactions across the sales, logistics, and customer relations teams. The auditors documented whether smiling was present and scored the quality of the smile on a proprietary scale measuring 'authenticity' and 'duration.'",
        },
        {
          name: "Monitoring System Deployment",
          description:
            "Beginning in April 2019, Gristmill implemented continuous Smile Compliance Monitoring using a combination of video observation and trained auditors. Every customer-facing interaction was evaluated in real-time or reviewed within 24 hours. Employees received compliance scores based on smiling frequency and perceived sincerity.",
        },
        {
          name: "Mandatory Fun Initiatives",
          description:
            "Throughout Q2 2019, Pemberton-Shale implemented Mandatory Fun Week celebrations designed to condition employees to associate the workplace with lighthearted, smile-promoting activities. Team-building events, themed dress days, and forced social activities were scheduled to normalize smiling in the work environment.",
        },
        {
          name: "Compliance Assessment",
          description:
            "By Q3 2019, Gristmill conducted a second comprehensive assessment of smiling behavior. The audit revealed that 63% of staff were not smiling with sufficient conviction or frequency to meet company standards. In response, Pemberton-Shale initiated targeted interventions: coaching sessions on smile technique, filmed examples of model compliance behavior, and documentation of non-compliance in personnel files.",
        },
      ],
    },
    {
      kind: "metrics",
      stats: [
        {
          value: "63%",
          label: "Non-Conforming Smilers Identified",
        },
        {
          value: "37%",
          label: "Employees Meeting Smile Standards",
        },
        {
          value: "247",
          label: "Baseline Interactions Observed",
        },
        {
          value: "1–10",
          label: "Smile Quality Compliance Scale",
        },
      ],
    },
    {
      kind: "quote",
      body: "We discovered that smiling is not a simple behavioral response—it's a skill that requires coaching. Sixty-three percent of our staff had not internalized the expectation that customer-facing work should be accompanied by consistent, confident smiling. The monitoring system made the expectation visible. Now, when an employee speaks to a customer, they know their smile is being measured. That knowledge changes the smile itself.",
      attribution: "Karen Liu",
      role: "Vice President of Customer Relations, Pemberton-Shale Refining",
      photoSlug: "greg-diane-hofstra",
    },
    {
      kind: "outcome",
      paragraphs: [
        "By 2020, Pemberton-Shale Refining had normalized smile monitoring as a permanent feature of customer-facing employee expectations. The refinery maintained auditing systems and continued to track smiling compliance quarterly. Customer satisfaction scores, measured independently of the monitoring program, showed no improvement. However, the monitoring system had successfully created a measurable behavioral standard.",
        "In subsequent years, the company expanded Smile Compliance Monitoring beyond customer-facing roles to internal interactions. By 2022, the refinery had developed an organizational culture in which facial expression itself had become subject to performance evaluation. What had begun as an effort to appear more engaged had become a systematic documentation of the degree to which employees could conceal genuine emotional disengagement behind acceptable smiling behavior.",
      ],
    },
  ],
}
