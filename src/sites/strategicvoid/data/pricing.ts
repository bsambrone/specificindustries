import type { SolutionPricing, PricingTier, PricingFeatureRow } from "./types"

// ─── Per-solution pricing ────────────────────────────────────────────────────

export const solutionPricing: SolutionPricing[] = [
  {
    solutionSlug: "meeting-optimization",
    tiers: [
      {
        name: "Essentials",
        price: "$2,499",
        description: "Per seat, per quarter. For organizations beginning their non-productivity journey.",
        features: [
          "Meeting Brick™ (1 unit)",
          "AutoNod Pro™ Standard (3 nod profiles)",
          "DelaySync™ Basic (2–15 second range)",
          "Calendar Inflator™ Lite (≤20% availability target)",
          "Standard onboarding (email)",
          "MeetingScore™ dashboard",
          "Community support",
        ],
        cta: "Start with Essentials",
      },
      {
        name: "Professional",
        price: "$7,999",
        description: "Per seat, per quarter. For enterprises committed to comprehensive meeting transformation.",
        features: [
          "Meeting Brick™ (3 units, all colorways)",
          "AutoNod Pro™ Premium (all 14 nod profiles)",
          "DelaySync™ Pro (full 2–45 second range + AI name detection)",
          "Calendar Inflator™ Full (≤7% availability target, phantom attendees)",
          "Double-Booked Defense enabled",
          "Dedicated onboarding specialist",
          "MeetingScore™ Advanced Analytics",
          "Priority support (4-hour SLA)",
          "Quarterly strategy review",
        ],
        cta: "Go Professional",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Unlimited seats. For organizations where meeting optimization is a core competency.",
        features: [
          "Everything in Professional, unlimited seats",
          "Room-scale AutoNod Pro™ Enterprise deployment",
          "Custom nod profile creation",
          "White-glove implementation",
          "Dedicated Alignment Partner",
          "Executive briefings (quarterly)",
          "Custom MeetingScore™ benchmarking",
          "24/7 priority support (1-hour SLA)",
          "Annual non-productivity retreat",
        ],
        cta: "Contact Us",
      },
    ],
  },
  // Placeholder — other solution pricing in Plan 2
]

// ─── Master pricing tiers ────────────────────────────────────────────────────

export const masterTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$9,999",
    description: "Per year. For organizations taking their first steps into strategic non-productivity.",
    features: [
      "1 solution suite",
      "Up to 10 seats",
      "Essentials tier across all included products",
      "Annual alignment assessment",
      "Void Certification (Bronze)",
      "Email support",
      "Access to Strategic Void Knowledge Base",
    ],
    cta: "Start Starter",
  },
  {
    name: "Growth",
    price: "$24,999",
    description: "Per year. For organizations ready to scale their misalignment enterprise-wide.",
    features: [
      "3 solution suites",
      "Up to 50 seats",
      "Professional tier across all included products",
      "Quarterly alignment assessments",
      "Void Certification (Silver)",
      "Dedicated Alignment Partner (shared)",
      "Semi-annual executive briefings",
      "Priority support (8-hour SLA)",
      "Access to Methodology Library",
    ],
    cta: "Start Growing",
    highlighted: true,
  },
  {
    name: "Transformation",
    price: "$49,999",
    description: "Per year. For enterprises committed to organization-wide void alignment.",
    features: [
      "All 8 solution suites",
      "Up to 250 seats",
      "Professional tier across all products",
      "Monthly alignment assessments",
      "Void Certification (Gold)",
      "Dedicated Alignment Partner",
      "Quarterly executive briefings",
      "Annual Disruption Residency™ (2 seats)",
      "Priority support (4-hour SLA)",
      "Custom methodology adaptation",
      "Annual non-productivity retreat (team)",
    ],
    cta: "Begin Transformation",
  },
  {
    name: "Singularity",
    price: "Let's talk.",
    description: "For organizations that have transcended the need for a price point.",
    features: [
      "Everything in Transformation, unlimited",
      "Unlimited seats across all 8 solution suites",
      "Enterprise tier across all products",
      "Unlimited alignment assessments",
      "Void Certification (Platinum, custom ceremony)",
      "Named Alignment Partner (dedicated)",
      "Monthly C-suite advisory sessions",
      "Unlimited Disruption Residency™ seats",
      "24/7 support with 15-minute SLA",
      "Bespoke methodology co-development",
      "Quarterly off-site non-productivity retreats",
      "Blame Redistribution Hotline™ (dedicated line)",
    ],
    cta: "Enter the Singularity",
  },
]

// ─── Master pricing feature comparison matrix ────────────────────────────────
// Column order: Starter | Growth | Transformation | Singularity

export const featureComparisonRows: PricingFeatureRow[] = [
  {
    label: "Solution Suites Included",
    values: ["1", "3", "All 8", "All 8"],
  },
  {
    label: "Product Tier",
    values: ["Essentials", "Professional", "Professional", "Enterprise"],
  },
  {
    label: "Seats",
    values: ["Up to 10", "Up to 50", "Up to 250", "Unlimited"],
  },
  {
    label: "Alignment Assessments",
    values: ["Annual", "Quarterly", "Monthly", "Unlimited"],
  },
  {
    label: "Void Certification",
    values: ["Bronze", "Silver", "Gold", "Platinum"],
  },
  {
    label: "Dedicated Alignment Partner",
    values: [false, "Shared", "Dedicated", "Named"],
  },
  {
    label: "Executive Briefings",
    values: [false, "Semi-annual", "Quarterly", "Monthly"],
  },
  {
    label: "Disruption Residency™",
    values: [false, false, "2 seats/year", "Unlimited"],
  },
  {
    label: "Bespoke Methodology Adaptation",
    values: [false, false, true, true],
  },
  {
    label: "C-Suite Advisory Sessions",
    values: [false, false, false, "Monthly"],
  },
  {
    label: "Blame Redistribution Services",
    values: [false, false, "Standard", "Premium + Hotline"],
  },
  {
    label: "Support SLA",
    values: ["Email", "8 hours", "4 hours", "15 minutes"],
  },
  {
    label: "Synergy Threading",
    values: [false, true, true, true],
  },
  {
    label: "Confusion Management Dashboard",
    values: [false, false, true, true],
  },
  {
    label: "Ceremony Facilitation",
    values: [false, false, true, true],
  },
  {
    label: "Blame Redistribution Hotline™",
    values: [false, false, false, true],
  },
  {
    label: "Non-Productivity Retreat",
    values: [false, false, "Team (annual)", "Quarterly off-site"],
  },
]
