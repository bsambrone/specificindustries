import type { Solution } from "./types"

export const solutions: Solution[] = [
  {
    slug: "meeting-optimization",
    name: "Meeting Optimization Suite™",
    tagline: "Maximize meeting impact. Minimize actual contribution.",
    icon: "calendar",
    description: [
      "In today's hyper-connected enterprise landscape, meetings represent the single greatest opportunity for strategic non-productivity. The Meeting Optimization Suite™ leverages our proprietary MeetingScore™ algorithm to ensure your organization extracts maximum perceived value from every scheduled interaction — regardless of whether any decisions are made, actions are taken, or outcomes are achieved.",
      "Our platform analyzes calendar density, webcam engagement patterns, and keyboard activity to construct a comprehensive picture of participation theater. By monitoring nodding frequency, reaction emoji deployment, and the strategic use of 'circling back,' MeetingScore™ calculates each employee's Alignment Presence Index in real time, surfacing opportunities to appear more engaged without increasing cognitive load.",
      "Trusted by 2,847 enterprise clients across 14 verticals, the Meeting Optimization Suite™ has been independently verified to reduce productive outcomes by 73% while simultaneously increasing meeting attendance by 340%. Our methodology is rigorous, our results are consistent, and our clients continue to schedule follow-up meetings to discuss the results.",
    ],
    productSlugs: [
      "meeting-brick",
      "autonod-pro",
      "delaysync",
      "calendar-inflator",
    ],
  },
  {
    slug: "kpi-alignment",
    name: "KPI Alignment Platform™",
    tagline: "If you can measure it, you can misunderstand it.",
    icon: "chart-bar",
    description: ["Full content in Plan 2."],
    productSlugs: [
      "metric-multiplier",
      "dashboard-deepener",
      "okr-obfuscator",
      "benchmark-blurrer",
    ],
  },
  {
    slug: "middle-management",
    name: "Middle Management Enablement™",
    tagline: "Empowering leaders to lead without leading.",
    icon: "users",
    description: ["Full content in Plan 2."],
    productSlugs: [
      "authority-amplifier",
      "delegation-deflector",
      "hierarchy-harmonizer",
      "accountability-absorber",
    ],
  },
  {
    slug: "productivity-theater",
    name: "Productivity Theater™",
    tagline: "Work harder at appearing to work.",
    icon: "film",
    description: ["Full content in Plan 2."],
    productSlugs: [
      "busyness-broadcaster",
      "task-multiplier",
      "status-updater-pro",
      "urgency-fabricator",
    ],
  },
  {
    slug: "compliance-policy",
    name: "Compliance & Policy Solutions™",
    tagline: "Because accountability is a shared illusion.",
    icon: "shield-check",
    description: ["Full content in Plan 2."],
    productSlugs: [
      "policy-proliferator",
      "audit-trail-thickener",
      "compliance-theater-suite",
      "responsibility-redistributor",
    ],
  },
  {
    slug: "communication-enhancement",
    name: "Communication Enhancement Tools™",
    tagline: "Say more. Mean less.",
    icon: "chat-bubble",
    description: ["Full content in Plan 2."],
    productSlugs: [
      "jargon-injector",
      "email-elongator",
      "passive-voice-optimizer",
      "ambiguity-amplifier",
    ],
  },
  {
    slug: "decision-support",
    name: "Decision Support Systems™",
    tagline: "Making decisions optional.",
    icon: "question-mark-circle",
    description: ["Full content in Plan 2."],
    productSlugs: [
      "consensus-diffuser",
      "committee-spawner",
      "stakeholder-multiplier",
      "decision-deferral-engine",
    ],
  },
  {
    slug: "employee-experience",
    name: "Employee Experience Optimization™",
    tagline: "Because happy employees are statistically unnecessary.",
    icon: "face-smile",
    description: ["Full content in Plan 2."],
    productSlugs: [
      "engagement-simulator",
      "morale-measurer",
      "culture-deck-generator",
      "satisfaction-survey-suite",
    ],
  },
]

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug)
}

export function getSolutionSlugs(): string[] {
  return solutions.map((s) => s.slug)
}
