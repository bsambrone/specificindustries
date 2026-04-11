import type { ServiceArm } from "./types"

export const arms: ServiceArm[] = [
  {
    slug: "training",
    name: "Mandatory Learning & Development",
    nickname: "The Training Arm",
    tagline: "Fill the hours. Empty the head.",
    overview: [
      "Gristmill's flagship practice, in continuous operation since 1962. Our Training Arm delivers classroom and webinar programming of documented ineffectiveness, purpose-built to consume calendar hours, exhaust short-term memory, and reinforce the employee's sense that the firm's priorities are neither theirs to understand nor theirs to question.",
      "Every module is certification-bearing, audit-trackable, and calibrated to produce zero measurable improvement in capability while producing very real improvements in attendance compliance. Deployed at over 400 Fortune 500 clients and privately held industrials.",
    ],
    image: "/sites/gristmill/arms/training.png",
    productSlugs: [
      "247-slide-deck",
      "nasal-hygiene-webinar",
      "gratitude-curriculum",
      "knowledge-retention-nullification",
      "monthly-certification-renewal",
    ],
  },
  {
    slug: "communications",
    name: "Internal Communications Optimization",
    nickname: "The Messaging Arm",
    tagline: "Say more. Clarify nothing.",
    overview: [
      "A suite of internal communications services engineered to maximize volume and minimize information transfer. Gristmill's Messaging Arm has been helping organizations manage the flow of inside-the-firm communication since the Carter administration.",
    ],
    image: "/sites/gristmill/arms/communications.png",
    productSlugs: [
      "all-hands-email",
      "strategic-ambiguity-newsletter",
      "buzzword-density-maximizer",
      "delayed-clarity-initiative",
    ],
  },
  {
    slug: "restructuring",
    name: "Organizational Restructuring Services",
    nickname: "The Reorg Arm",
    tagline: "Everything in motion. Nothing in place.",
    overview: [
      "Reorganization is not a one-time intervention. At Gristmill we believe it is a hygienic practice, applied continuously to keep every title meaningful to nobody but the reorganizer. Our Restructuring Arm has executed more than 8,000 successful reorganizations, none of which improved outcomes.",
    ],
    image: "/sites/gristmill/arms/restructuring.png",
    productSlugs: [
      "perpetual-reorganization-protocol",
      "reporting-line-randomizer",
      "seat-migration-program",
      "title-inflation-engine",
      "org-chart-obfuscation-tool",
    ],
  },
  {
    slug: "retention",
    name: "Retention Through Ambient Dread",
    nickname: "The Fear Arm",
    tagline: "Loyalty through carefully managed uncertainty.",
    overview: [
      "Gristmill's Fear Arm is the industry's gold standard in non-explicit workforce discipline. We install and maintain a persistent atmosphere of unspecified threat — gentle enough not to trigger regulatory scrutiny, loud enough to keep the workforce gratefully employed. Clients report retention figures that would otherwise require a weak labor market to achieve.",
    ],
    image: "/sites/gristmill/arms/retention.png",
    productSlugs: [
      "ambient-layoff-rumor-service",
      "peer-benchmarking-reports",
      "gratitude-audits",
      "pride-in-your-station-seminar",
      "calendar-placeholder-events",
      "executive-walk-by-program",
    ],
  },
  {
    slug: "performance",
    name: "Performance Management Systems",
    nickname: "The Measurement Arm",
    tagline: "If it moves, measure it. If it doesn't move, measure it harder.",
    overview: [
      "Our Measurement Arm delivers performance management programs that convert individual contribution into numbers the contributor cannot challenge. Every metric is defensible. Every target is moving. Every evaluation cycle produces an outcome.",
    ],
    image: "/sites/gristmill/arms/performance.png",
    productSlugs: [
      "360-feedback-closed-loop",
      "goalpost-mobility-framework",
      "literal-stretch-goals",
      "underperformance-discovery-engine",
    ],
  },
  {
    slug: "management",
    name: "Management Enablement",
    nickname: "The Middle Management Arm",
    tagline: "Responsibility without authority. Authority without accountability.",
    overview: [
      "The middle manager is the load-bearing beam of the modern enterprise. Gristmill's Middle Management Arm equips your managers with the tools, training, and structural ambiguity required to absorb complaints from below, defer decisions to above, and keep the organization moving sideways at pace.",
    ],
    image: "/sites/gristmill/arms/management.png",
    productSlugs: [
      "escalation-buffer-training",
      "calendar-saturation-protocol",
      "delegation-without-authority",
      "take-this-offline-toolkit",
    ],
  },
  {
    slug: "compensation",
    name: "Compensation Suppression Solutions",
    nickname: "The Raise-Denial Arm",
    tagline: "Fair pay, properly contextualized.",
    overview: [
      "Compensation conversations are the single largest source of workforce volatility. Gristmill's Raise-Denial Arm — operating since 1971 — provides the training, literature, and manager-side scripting necessary to reduce successful raise requests to statistical noise.",
    ],
    image: "/sites/gristmill/arms/compensation.png",
    productSlugs: [
      "shareholder-empathy-curriculum",
      "raise-deflection-workshop",
      "hedonic-treadmill-benefits",
      "market-adjustment-explanation-portal",
      "equity-vesting-mirage",
    ],
  },
  {
    slug: "engagement",
    name: "Employee Engagement",
    nickname: "The Fun Arm",
    tagline: "Camaraderie, mandatory.",
    overview: [
      "Gristmill's Fun Arm applies rigor, tracking, and consequence to the historically frivolous domain of workplace camaraderie. Fun is too important to be optional. We make it measurable.",
    ],
    image: "/sites/gristmill/arms/engagement.png",
    productSlugs: [
      "mandatory-fun-week",
      "corporate-trivia-career-impacting",
      "icebreaker-generator",
      "smile-compliance-monitoring",
    ],
  },
  {
    slug: "tooling",
    name: "IT & Tooling",
    nickname: "The Friction Arm",
    tagline: "Technology that works against you, consistently.",
    overview: [
      "A comprehensive suite of information technology services designed to introduce controlled inefficiency at every point of employee-computer interaction. The Friction Arm has been deployed at industrial clients since the advent of the personal computer.",
    ],
    image: "/sites/gristmill/arms/tooling.png",
    productSlugs: [
      "sso-multi-failure",
      "vpn-latency-enhancement",
      "ticket-routing-labyrinth",
      "auto-update-critical-work",
    ],
  },
  {
    slug: "workspace",
    name: "Physical Workspace Strategy",
    nickname: "The Environment Arm",
    tagline: "The building itself is the intervention.",
    overview: [
      "Architecture is the original workforce discipline. Gristmill's Environment Arm rebuilds your office to do the quiet work of retention, compensation suppression, and performance management for you, whether anyone is looking or not.",
    ],
    image: "/sites/gristmill/arms/workspace.png",
    productSlugs: [
      "standing-desk-mandate",
      "break-room-decommissioning",
      "open-office-acoustics",
      "hot-desk-hunger-games",
      "temperature-variance-initiative",
      "lighting-inconsistency-program",
    ],
  },
]

export function getArmBySlug(slug: string): ServiceArm | undefined {
  return arms.find((arm) => arm.slug === slug)
}
