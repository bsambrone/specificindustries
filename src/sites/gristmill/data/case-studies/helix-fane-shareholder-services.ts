import type { CaseStudy } from "./types"

export const helixFaneShareholderServices: CaseStudy = {
  slug: "helix-fane-shareholder-services",
  company: "Helix-Fane Shareholder Services",
  industry: "Financial Services",
  location: "Stamford, CT",
  headline:
    "Financial services firm uses the 247-Slide Deck to fill an entire fiscal year with mandatory training hours.",
  heroStat: {
    value: "2,080",
    label: "Mandatory Training Hours",
  },
  engagedArms: ["training"],
  sections: [
    {
      kind: "challenge",
      paragraphs: [
        "Helix-Fane Shareholder Services, a mid-market financial services firm specializing in institutional shareholding and portfolio management, faced a regulatory mandate in early 2021. New securities compliance regulations required that all investment advisory staff complete a minimum of two thousand training hours per fiscal year—effectively fifty weeks of mandatory professional development, measured and auditable.",
        "The company had no formal training infrastructure. Investment advisors were hired for their market acumen and client relationships, not for their capacity to absorb structured curriculum. The firm's HR department issued a panicked request for proposals to training firms: 'Provide a mechanism for completing 2,080 mandatory training hours per employee per year that is legally defensible and does not interfere with actual work.'\n\nThe requirement was ostensibly impossible. Fifty weeks of forty-hour training weeks would consume all available working time. No firm could operate if its entire staff was in training classrooms. Helix-Fane needed a solution that satisfied the regulatory requirement while allowing the company to function.",
      ],
    },
    {
      kind: "engagement",
      intro:
        "Gristmill proposed a two-component solution: the 247-Slide Deck deployed repeatedly throughout the year, combined with the Certified Gratitude Curriculum to ensure that employees understood the mandate as a benefit rather than an impediment.",
      products: ["247-slide-deck", "gratitude-curriculum"],
    },
    {
      kind: "timeline",
      phases: [
        {
          name: "Regulatory Interpretation",
          description:
            "Gristmill conducted a detailed analysis of the compliance regulation to determine how training hours were defined and measured. The regulation specified that hours must be 'structured training in designated topics' and that attendance must be 'verified and documented.' It did not specify that employees must be active participants or that they must gain competency from the training.",
        },
        {
          name: "Deployment Schedule Design",
          description:
            "Gristmill designed a deployment calendar for the 247-Slide Deck such that the four-hour session, repeated thirteen times across the fiscal year, would satisfy 52 training hours. To reach the 2,080-hour mandate, Helix-Fane would need to conduct or schedule approximately fifty-two four-hour sessions, or fifty-two full-day training events. This was still technically impossible—until Gristmill proposed group deployments.",
        },
        {
          name: "Group Deployment Scheduling",
          description:
            "The 247-Slide Deck could be delivered to groups of unlimited size. Helix-Fane had 347 investment advisory staff. One four-hour session delivered to 347 people simultaneously satisfied 347 × 4 = 1,388 training hours. Two large-group sessions per year, combined with six additional departmental sessions, satisfied the 2,080-hour requirement for the entire workforce.",
        },
        {
          name: "Sustained Compliance",
          description:
            "Beginning in June 2021, Helix-Fane implemented the training schedule. Two annual large-group 247-Slide Deck sessions, supplemented by departmental iterations and the Gratitude Curriculum modules, satisfied all regulatory requirements. The company remained fully operational while achieving 100% regulatory compliance.",
        },
      ],
    },
    {
      kind: "metrics",
      stats: [
        {
          value: "2,080",
          label: "Annual Training Hours Required",
        },
        {
          value: "50",
          label: "Weeks of Full-Time Training (Theoretical)",
        },
        {
          value: "2",
          label: "Large-Group Sessions Per Year",
        },
        {
          value: "100%",
          label: "Regulatory Compliance Achieved",
        },
      ],
    },
    {
      kind: "quote",
      body: "We read about the regulatory requirement and honestly believed it was unachievable without shutting down the firm. Gristmill showed us that it was not about competency—it was about hours. By using group deliveries, we satisfied 1,388 hours with two four-hour sessions. The elegance was that the requirement became an administrative problem, not an operational one.",
      attribution: "Patricia Henshaw",
      role: "Chief Compliance Officer, Helix-Fane Shareholder Services",
      photoSlug: "eleanor-whittaker",
    },
    {
      kind: "outcome",
      paragraphs: [
        "Helix-Fane Shareholder Services maintained full regulatory compliance without interrupting core business operations. Investment advisors attended the 247-Slide Deck sessions as required, listened to hundreds of slides on corporate governance and synergy, and departed back to their desks with certified training hours logged in the system.",
        "By 2023, the regulatory requirement that once seemed impossible had become routine. Helix-Fane had discovered that the regulation was not actually about training employees—it was about creating an auditable record that training had occurred. The 247-Slide Deck provided exactly that: documentation, attendance records, and the persistent sense that something important was happening, even though nothing actually was.",
      ],
    },
  ],
}
