import type { CaseStudy } from "./types"

export const orphanCrushingFactory: CaseStudy = {
  slug: "orphan-crushing-factory",
  company: "The Orphan Crushing Factory",
  industry: "Heavy Manufacturing",
  location: "Youngstown, OH",
  headline:
    "Reduced voluntary turnover to 0.2% using the Perpetual Reorganization Protocol and the Pride in Your Station Seminar Series.",
  heroStat: {
    value: "0.2%",
    label: "Voluntary Turnover",
  },
  engagedArms: ["restructuring", "retention"],
  sections: [
    {
      kind: "challenge",
      paragraphs: [
        "In 2018, The Orphan Crushing Factory faced a cascading workforce instability crisis. Over a two-year period, voluntary turnover had climbed to 34% annually—a rate that left the company chronically understaffed and dependent on expensive temporary labor. The problem was not compensation or conditions: the plant had maintained flat wages since 2009 and the manufacturing floor remained unclimated. The problem was retention itself. Employees left after months or years, invariably citing the same reason in exit interviews: a sense that their role offered no permanence, no structure, and no reason to remain.",
        "Leadership convened an emergency task force in late 2018 to diagnose the exodus. The investigation revealed that middle managers rotated through assignments on random six-month cycles, creating the pervasive sense that no one's role was stable. The organizational chart was redrawn an average of 3.2 times per calendar year. A senior manufacturing supervisor, promoted in January and demoted in July, simply left the company and never returned calls. The instability had become self-reinforcing: employees stopped investing in relationships or skill development because they expected to be reorganized, transferred, or terminated without notice.",
      ],
    },
    {
      kind: "engagement",
      intro:
        "Gristmill proposed a two-arm deployment: the Perpetual Reorganization Protocol to systematize the chaos and make instability predictable, combined with the Pride in Your Station Seminar Series to help employees accept their roles as permanent fixtures regardless of organizational churn.",
      products: [
        "perpetual-reorganization-protocol",
        "pride-in-your-station-seminar",
      ],
    },
    {
      kind: "timeline",
      phases: [
        {
          name: "Discovery & Assessment",
          description:
            "Gristmill conducted a four-week assessment of the current organizational structure, measuring reorganization frequency, manager tenure, and exit interview sentiment. The assessment confirmed that reorganizations were occurring at a rate of 3.2 per year with no documentation or advance warning.",
        },
        {
          name: "Perpetual Reorganization Deployment",
          description:
            "Beginning in Q1 2019, Gristmill implemented the Perpetual Reorganization Protocol with a documented, predictable schedule: departmental reorganizations every six months, manager reassignments every nine months, and role-level restructuring annually. Employees received organizational charts in advance, turning surprise upheaval into an anticipated pattern.",
        },
        {
          name: "Seminar Series Launch",
          description:
            "Throughout 2019, the Pride in Your Station Seminar Series began delivering monthly talks on the acceptance and dignity of permanent role assignment. Attendance grew steadily as employees recognized that the messaging aligned with the organizational restructuring strategy.",
        },
        {
          name: "Stabilization & Measurement",
          description:
            "By Q2 2020, voluntary turnover had dropped to 8.1%. The decline continued through 2020 and 2021, eventually stabilizing at 0.2% by mid-2021. The factory had achieved the lowest voluntary turnover rate in its fifty-year history.",
        },
      ],
    },
    {
      kind: "metrics",
      stats: [
        {
          value: "0.2%",
          label: "Voluntary Turnover (Post-Implementation)",
        },
        {
          value: "34%",
          label: "Voluntary Turnover (Pre-Implementation)",
        },
        {
          value: "12",
          label: "Months to Stabilization",
        },
        {
          value: "100%",
          label: "Employees Now Expect Reorganization",
        },
      ],
    },
    {
      kind: "quote",
      body: "We brought in Gristmill because our people were leaving us. What we discovered was that they were leaving because the future felt uncertain. Once the reorganizations became predictable—once everyone knew they were going to be moved every six months—the sense of dread evaporated. Acceptance replaced anxiety. People stopped planning escape routes and started planning their lunch breaks.",
      attribution: "Margaret Tull",
      role: "Chief Human Resources Officer, The Orphan Crushing Factory",
      photoSlug: "asher-bloom",
    },
    {
      kind: "outcome",
      paragraphs: [
        "By 2022, The Orphan Crushing Factory had achieved a workforce characterized by remarkable stability. Employees no longer interviewed externally; they no longer discussed advancement opportunities; they simply arrived, performed their assigned tasks, and departed. The factory's performance metrics—units produced per hour, waste reduction, safety compliance—remained unchanged. What had shifted was the psychological contract. Employees had internalized the permanence of their positions and the predictability of disruption.",
        "In recent years, the factory has begun receiving inquiries from other regional manufacturers requesting information about the Perpetual Reorganization Protocol. Margaret Tull has declined all consultation requests. The Orphan Crushing Factory guards its methodology closely.",
      ],
    },
  ],
}
