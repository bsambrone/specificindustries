export interface Founder {
  baseImage: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string[]
  portrait: string
}

export const founders: Founder[] = [
  {
    baseImage: "bill",
    name: "Bill Hartwell, CIPP/π",
    title: "Founder & Chief Trust Officer",
    bio: [
      "Bill founded Privatrix in 2019 after a 22-year career in enterprise software, during which he observed that the customers who paid the most for privacy infrastructure were the ones who understood it the least. He saw, in this observation, a business.",
      "Bill is a SOC-π Certified Auditor (Internal) and serves on the advisory board of the Self-Attestation Institute, which he also founded.",
    ],
    portrait: "/sites/privatrix/leadership/hartwell.png",
  },
  {
    baseImage: "brandon",
    name: "Brandon Vasquez-Klein",
    title: "Chief Compliance Theatre Officer",
    bio: [
      "Brandon leads the Compliance Theatre practice at Privatrix, overseeing the production of laminated certifications, brass-engraved trust artifacts, and the quarterly board-report templates that have become an industry reference.",
      "Brandon previously served as Director of Compliance Optics at three Fortune 500 firms whose names are bound by NDA. He holds a CIPP/π and a Self-Attested SOC-π credential.",
    ],
    portrait: "/sites/privatrix/leadership/vasquez-klein.png",
  },
  {
    baseImage: "jim",
    name: "Jim Pemberton, JD CIPP/E",
    title: "VP, Strategic Privacy Posture",
    bio: [
      "Jim heads the Strategic Privacy Posture practice, advising enterprise clients on the procurement, deployment, and quarterly review of Privatrix products. He has personally signed 14,000 attestation documents in his career, more than any other living individual.",
      "Jim's signature is registered as a trade dress.",
    ],
    portrait: "/sites/privatrix/leadership/pemberton.png",
  },
  {
    baseImage: "sean",
    name: "Sean Aoki",
    title: "Head of Customer Reassurance",
    bio: [
      "Sean leads the Customer Reassurance organization, a 3-person team responsible for responding to all customer questions about whether Privatrix products do anything. The team's average response time is 47 business days.",
      "Sean is the recipient of the 2024 'Quietest Vendor at the Booth' award from the National Procurement Council.",
    ],
    portrait: "/sites/privatrix/leadership/aoki.png",
  },
]
