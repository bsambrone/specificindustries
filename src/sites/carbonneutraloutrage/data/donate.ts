export interface DonationTier {
  slug: string
  name: string
  amount: number          // dollars, integer
  amountDisplay: string   // e.g., "$10"
  funds: string           // what it "funds"
  confirmationHeading: string
  confirmationMessage: string
}

export const tiers: DonationTier[] = [
  {
    slug: "minor-kvetch",
    name: "Minor Kvetch",
    amount: 10,
    amountDisplay: "$10",
    funds: "A single reusable pitchfork tine",
    confirmationHeading: "Your Kvetch Has Been Logged",
    confirmationMessage: "Thank you. Your contribution will be allocated to the next tine-replacement run at the regional sharpening cooperative.",
  },
  {
    slug: "measured-grievance",
    name: "Measured Grievance",
    amount: 25,
    amountDisplay: "$25",
    funds: "One month of Outrage of the Month Club for an underserved ZIP code",
    confirmationHeading: "Grievance Sponsored",
    confirmationMessage: "Thank you. Your sponsorship will fund one month of Outrage of the Month Club delivery to a member in an underserved ZIP code.",
  },
  {
    slug: "principled-objection",
    name: "Principled Objection",
    amount: 100,
    amountDisplay: "$100",
    funds: "A Certified Responsible Overreactor™ scholarship",
    confirmationHeading: "Scholarship Endowed",
    confirmationMessage: "Thank you. Your contribution funds one full Certified Responsible Overreactor™ scholarship for a candidate in financial need.",
  },
  {
    slug: "formal-complaint",
    name: "Formal Complaint",
    amount: 500,
    amountDisplay: "$500",
    funds: "Offsets one regional HOA meeting",
    confirmationHeading: "Complaint Filed",
    confirmationMessage: "Thank you. Your contribution offsets the projected emissions of one full regional HOA meeting through Verified Outrage Offsets™ credits.",
  },
  {
    slug: "structural-meltdown-offset",
    name: "Structural Meltdown Offset",
    amount: 2500,
    amountDisplay: "$2,500",
    funds: "Reforests a Twitter thread",
    confirmationHeading: "Thread Reforested",
    confirmationMessage: "Thank you. Your contribution will be deployed against a documented multi-day social-media thread, restoring its tree-equivalent to active reforestation.",
  },
  {
    slug: "patron-of-the-tempered-uprising",
    name: "Patron of the Tempered Uprising",
    amount: 10000,
    amountDisplay: "$10,000",
    funds: "Names a pitchfork after you; bronze nameplate",
    confirmationHeading: "Patronage Acknowledged",
    confirmationMessage: "Thank you. A pitchfork in active circulation will be inscribed with your name on a bronze nameplate. The Campaign will arrange a private inscription ceremony at our annual Convening.",
  },
]

export function getTierBySlug(slug: string): DonationTier | undefined {
  return tiers.find((t) => t.slug === slug)
}
