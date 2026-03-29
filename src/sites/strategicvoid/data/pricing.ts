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
  // ── KPI Alignment ────────────────────────────────────────────────────────
  {
    solutionSlug: "kpi-alignment",
    tiers: [
      {
        name: "Essentials",
        price: "$2,499",
        description: "Per seat, per quarter. For teams beginning their metric obfuscation journey.",
        features: [
          "Metric Multiplier™ Standard (up to 3x multiplication)",
          "Dashboard Deepener™ Lite (5 additional layers)",
          "Self-service knowledge base",
          "Quarterly alignment report",
          "Community support",
        ],
        cta: "Start with Essentials",
      },
      {
        name: "Professional",
        price: "$7,999",
        description: "Per seat, per quarter. For enterprises committed to comprehensive KPI transformation.",
        features: [
          "Metric Multiplier™ Pro (up to 10x multiplication)",
          "Dashboard Deepener™ Full (unlimited layers)",
          "OKR Obfuscator™ (full suite)",
          "Benchmark Blurrer™ (all industries)",
          "Priority support (48hr SLA)",
          "Dedicated onboarding specialist",
          "Quarterly strategy review",
          "KPI confusion analytics dashboard",
        ],
        cta: "Go Professional",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Unlimited seats. For organizations where metric opacity is a core competency.",
        features: [
          "Everything in Professional, unlimited seats",
          "Dedicated Alignment Partner",
          "24/7 concierge support",
          "White-glove implementation",
          "Custom metric fabrication laboratory",
          "Executive briefings (quarterly)",
          "Annual non-productivity retreat",
        ],
        cta: "Contact Us",
      },
    ],
  },

  // ── Middle Management ─────────────────────────────────────────────────────
  {
    solutionSlug: "middle-management",
    tiers: [
      {
        name: "Essentials",
        price: "$2,999",
        description: "Per seat, per quarter. For organizations beginning their authority amplification journey.",
        features: [
          "Authority Amplifier™ Standard (3 escalation profiles)",
          "Delegation Deflector™ Basic (5 deflection templates)",
          "Self-service knowledge base",
          "Quarterly alignment report",
          "Community support",
        ],
        cta: "Start with Essentials",
      },
      {
        name: "Professional",
        price: "$8,999",
        description: "Per seat, per quarter. For enterprises committed to comprehensive management theater.",
        features: [
          "Authority Amplifier™ Pro (all 12 escalation profiles)",
          "Delegation Deflector™ Full (unlimited templates)",
          "Hierarchy Harmonizer™ (org chart reshuffling suite)",
          "Accountability Absorber™ (full deflection matrix)",
          "Priority support (48hr SLA)",
          "Dedicated onboarding specialist",
          "Quarterly strategy review",
          "Middle management analytics dashboard",
        ],
        cta: "Go Professional",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Unlimited seats. For organizations where middle management is an art form.",
        features: [
          "Everything in Professional, unlimited seats",
          "Dedicated Alignment Partner",
          "24/7 concierge support",
          "Dedicated synergy concierge",
          "White-glove implementation",
          "Executive briefings (quarterly)",
          "Annual non-productivity retreat",
        ],
        cta: "Contact Us",
      },
    ],
  },

  // ── Productivity Theater ──────────────────────────────────────────────────
  {
    solutionSlug: "productivity-theater",
    tiers: [
      {
        name: "Essentials",
        price: "$2,499",
        description: "Per seat, per quarter. For teams beginning their busyness performance journey.",
        features: [
          "Busyness Broadcaster™ Standard (5 activity templates)",
          "Status Updater Pro™ Basic (hourly broadcast)",
          "Self-service knowledge base",
          "Quarterly alignment report",
          "Community support",
        ],
        cta: "Start with Essentials",
      },
      {
        name: "Professional",
        price: "$7,999",
        description: "Per seat, per quarter. For enterprises committed to comprehensive productivity performance.",
        features: [
          "Busyness Broadcaster™ Pro (all 20 activity templates)",
          "Task Multiplier™ (full suite, up to 8x task expansion)",
          "Status Updater Pro™ Full (real-time AI-generated updates)",
          "Urgency Fabricator™ (all severity tiers)",
          "Priority support (48hr SLA)",
          "Dedicated onboarding specialist",
          "Quarterly strategy review",
          "Productivity theater analytics dashboard",
        ],
        cta: "Go Professional",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Unlimited seats. For organizations where the appearance of work is a core competency.",
        features: [
          "Everything in Professional, unlimited seats",
          "Dedicated Alignment Partner",
          "24/7 concierge support",
          "Personal appearance optimization consultant",
          "White-glove implementation",
          "Executive briefings (quarterly)",
          "Annual non-productivity retreat",
        ],
        cta: "Contact Us",
      },
    ],
  },

  // ── Compliance & Policy ───────────────────────────────────────────────────
  {
    solutionSlug: "compliance-policy",
    tiers: [
      {
        name: "Essentials",
        price: "$3,499",
        description: "Per seat, per quarter. For organizations beginning their policy proliferation journey.",
        features: [
          "Policy Proliferator™ Standard (up to 25 policies/month)",
          "Audit Trail Thickener™ Basic (3 documentation layers)",
          "Self-service knowledge base",
          "Quarterly alignment report",
          "Community support",
        ],
        cta: "Start with Essentials",
      },
      {
        name: "Professional",
        price: "$9,999",
        description: "Per seat, per quarter. For enterprises committed to comprehensive compliance theater.",
        features: [
          "Policy Proliferator™ Pro (unlimited policies)",
          "Audit Trail Thickener™ Full (unlimited layers, AI-assisted)",
          "Compliance Theater Suite™ (full ceremony package)",
          "Responsibility Redistributor™ (complete accountability diffusion)",
          "Priority support (48hr SLA)",
          "Dedicated onboarding specialist",
          "Quarterly strategy review",
          "Compliance theater analytics dashboard",
        ],
        cta: "Go Professional",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Unlimited seats. For organizations where regulatory performance is a fine art.",
        features: [
          "Everything in Professional, unlimited seats",
          "Dedicated Alignment Partner",
          "24/7 concierge support",
          "Pre-written board apology letters",
          "White-glove implementation",
          "Executive briefings (quarterly)",
          "Annual non-productivity retreat",
        ],
        cta: "Contact Us",
      },
    ],
  },

  // ── Communication Enhancement ─────────────────────────────────────────────
  {
    solutionSlug: "communication-enhancement",
    tiers: [
      {
        name: "Essentials",
        price: "$2,499",
        description: "Per seat, per quarter. For teams beginning their communication obfuscation journey.",
        features: [
          "Jargon Injector™ Standard (500 buzzword library)",
          "Email Elongator™ Basic (up to 3x length expansion)",
          "Self-service knowledge base",
          "Quarterly alignment report",
          "Community support",
        ],
        cta: "Start with Essentials",
      },
      {
        name: "Professional",
        price: "$7,999",
        description: "Per seat, per quarter. For enterprises committed to comprehensive communication complexity.",
        features: [
          "Jargon Injector™ Pro (5,000+ buzzword library, industry-specific)",
          "Email Elongator™ Full (up to 10x length expansion, AI-powered)",
          "Passive Voice Optimizer™ (full accountability removal suite)",
          "Ambiguity Amplifier™ (all clarity-reduction modes)",
          "Priority support (48hr SLA)",
          "Dedicated onboarding specialist",
          "Quarterly strategy review",
          "Communication complexity analytics dashboard",
        ],
        cta: "Go Professional",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Unlimited seats. For organizations where saying nothing meaningfully is a core skill.",
        features: [
          "Everything in Professional, unlimited seats",
          "Dedicated Alignment Partner",
          "24/7 concierge support",
          "Ghost-written executive thought leadership",
          "White-glove implementation",
          "Executive briefings (quarterly)",
          "Annual non-productivity retreat",
        ],
        cta: "Contact Us",
      },
    ],
  },

  // ── Decision Support ──────────────────────────────────────────────────────
  {
    solutionSlug: "decision-support",
    tiers: [
      {
        name: "Essentials",
        price: "$2,999",
        description: "Per seat, per quarter. For organizations beginning their decision deferral journey.",
        features: [
          "Consensus Diffuser™ Standard (up to 5 stakeholder groups)",
          "Committee Spawner™ Basic (3 committee templates)",
          "Self-service knowledge base",
          "Quarterly alignment report",
          "Community support",
        ],
        cta: "Start with Essentials",
      },
      {
        name: "Professional",
        price: "$8,999",
        description: "Per seat, per quarter. For enterprises committed to comprehensive decision avoidance.",
        features: [
          "Consensus Diffuser™ Pro (unlimited stakeholder groups)",
          "Committee Spawner™ Full (unlimited sub-committees)",
          "Stakeholder Multiplier™ (all expansion modes)",
          "Decision Deferral Engine™ (full indefinite postponement suite)",
          "Priority support (48hr SLA)",
          "Dedicated onboarding specialist",
          "Quarterly strategy review",
          "Decision avoidance analytics dashboard",
        ],
        cta: "Go Professional",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Unlimited seats. For organizations that have elevated indecision to a competitive advantage.",
        features: [
          "Everything in Professional, unlimited seats",
          "Dedicated Alignment Partner",
          "24/7 concierge support",
          "24/7 coin-flipping hotline",
          "White-glove implementation",
          "Executive briefings (quarterly)",
          "Annual non-productivity retreat",
        ],
        cta: "Contact Us",
      },
    ],
  },

  // ── Employee Experience ───────────────────────────────────────────────────
  {
    solutionSlug: "employee-experience",
    tiers: [
      {
        name: "Essentials",
        price: "$2,999",
        description: "Per seat, per quarter. For organizations beginning their engagement simulation journey.",
        features: [
          "Engagement Simulator™ Standard (5 engagement archetypes)",
          "Morale Measurer™ Basic (monthly pulse survey)",
          "Self-service knowledge base",
          "Quarterly alignment report",
          "Community support",
        ],
        cta: "Start with Essentials",
      },
      {
        name: "Professional",
        price: "$8,999",
        description: "Per seat, per quarter. For enterprises committed to comprehensive culture performance.",
        features: [
          "Engagement Simulator™ Pro (all 18 engagement archetypes)",
          "Morale Measurer™ Full (real-time sentiment theater)",
          "Culture Deck Generator™ (unlimited values rebranding)",
          "Satisfaction Survey Suite™ (full unread-response pipeline)",
          "ErgoMax Compliance Chair™ (fleet deployment support)",
          "Anonymous Feedback Redirector™ (complete routing suite)",
          "Priority support (48hr SLA)",
          "Dedicated onboarding specialist",
          "Quarterly strategy review",
        ],
        cta: "Go Professional",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Unlimited seats. For organizations where employee happiness theater is a strategic pillar.",
        features: [
          "Everything in Professional, unlimited seats",
          "Dedicated Alignment Partner",
          "24/7 concierge support",
          "Unlimited pizza deployment credits",
          "White-glove implementation",
          "Executive briefings (quarterly)",
          "Annual non-productivity retreat",
        ],
        cta: "Contact Us",
      },
    ],
  },
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
