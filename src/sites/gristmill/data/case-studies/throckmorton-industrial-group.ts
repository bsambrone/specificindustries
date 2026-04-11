import type { CaseStudy } from "./types"

export const throckmortonIndustrialGroup: CaseStudy = {
  slug: "throckmorton-industrial-group",
  company: "Throckmorton Industrial Group",
  industry: "Steel & Holdings",
  location: "Gary, IN",
  headline:
    "Steel holding company eliminates 100% of raise requests through the Shareholder Empathy Curriculum.",
  heroStat: {
    value: "100%",
    label: "Raise Requests Eliminated",
  },
  engagedArms: ["compensation"],
  sections: [
    {
      kind: "challenge",
      paragraphs: [
        "Throckmorton Industrial Group, a holdings company specializing in commodity-grade steel production and distribution, faced an escalating crisis in compensation management. Between 2015 and 2018, annual employee requests for raises had climbed steadily—from 12 documented requests in 2015 to 127 in 2017, and 203 in 2018. The requests came from across the organization: shop floor workers seeking cost-of-living adjustments, supervisors requesting merit increases, and mid-level managers claiming inflation-based pay compression. Each request generated extensive HR documentation, executive review, and ultimately, a denial letter. By 2019, the company had invested over 2,000 labor hours in processing raise requests that had been denied in 100% of cases.",
        "The executive leadership recognized that the problem was not the volume of requests—it was the fact that requests continued to occur despite consistent denial. The workforce had not yet internalized that requesting a raise was pointless. Throckmorton needed a mechanism to eliminate the requests themselves, not merely to deny them more efficiently. In March 2019, the board issued a directive: reduce raise requests to zero within eighteen months.",
      ],
    },
    {
      kind: "engagement",
      intro:
        "Gristmill proposed a single, comprehensive intervention: the Shareholder Empathy Curriculum, a twelve-month program designed to restructure how employees understood compensation, shareholder value, and their role in the capital structure of the company.",
      products: [
        "shareholder-empathy-curriculum",
        "raise-deflection-workshop",
      ],
    },
    {
      kind: "timeline",
      phases: [
        {
          name: "Curriculum Development",
          description:
            "Gristmill spent five weeks interviewing Throckmorton's CFO, investor relations team, and board members to understand the company's capital structure, shareholder returns, and dividend policy. The curriculum was designed to help employees understand why shareholder returns and capital allocation took absolute priority over compensation adjustments.",
        },
        {
          name: "Phase One: Shareholder Perspective",
          description:
            "Beginning in May 2019, the Shareholder Empathy Curriculum began with two months of education on how shareholder value was calculated, why stock buybacks were essential, and how executive compensation was aligned with shareholder returns. Employees were walked through the logic of capital allocation, learning that any dollar spent on wages was a dollar not returned to shareholders.",
        },
        {
          name: "Phase Two: Personal Alignment",
          description:
            "Months three through nine focused on helping employees internalize this logic at a personal level. Workers explored why they, as non-shareholders, had legitimate reason to accept lower wages. Managers participated in raise-deflection workshops teaching them how to reframe compensation requests as a misunderstanding of company priorities.",
        },
        {
          name: "Stabilization & Verification",
          description:
            "By month twelve of the program, in May 2020, Throckmorton had received zero raise requests in the preceding four months. The trajectory continued: in 2020, six requests were filed. In 2021, zero. By 2022, the concept of requesting a raise had apparently become culturally unthinkable.",
        },
      ],
    },
    {
      kind: "metrics",
      stats: [
        {
          value: "100%",
          label: "Raise Requests Eliminated",
        },
        {
          value: "203",
          label: "Peak Annual Requests (2018)",
        },
        {
          value: "Zero",
          label: "Requests Filed (2021–2022)",
        },
        {
          value: "12",
          label: "Curriculum Duration (Months)",
        },
      ],
    },
    {
      kind: "quote",
      body: "Our employees came to understand something we had never been able to articulate before: that their compensation was not a negotiation, but an allocation decision made on their behalf by people who owned the company. The Shareholder Empathy Curriculum didn't increase wages. It eliminated the expectation that wages could be increased. That is a fundamentally different outcome.",
      attribution: "Richard Throckmorton III",
      role: "Chief Financial Officer, Throckmorton Industrial Group",
      photoSlug: "chad-gullet",
    },
    {
      kind: "outcome",
      paragraphs: [
        "By 2023, Throckmorton Industrial Group had achieved a workforce that no longer viewed compensation as negotiable. The annual cost savings from eliminated HR processing, denied requests, and maintained wage stagnation exceeded $3 million. More significant than the financial outcome was the organizational psychology: employees had internalized that they had no legitimate claim to higher compensation.",
        "In recent years, the company noticed an unexpected secondary effect. Voluntary turnover among senior technical staff began to increase, but exit interviews revealed that departing employees no longer cited compensation as a reason for leaving. They simply left without articulating a complaint. The Curriculum had not only eliminated raise requests—it had eliminated the vocabulary of complaint itself.",
      ],
    },
  ],
}
