import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Stratify",
  subdomain: "stratify",
  theme: {
    preset: "prosperity",
    colors: {
      primary: "#0a1628",
      secondary: "#c9a227",
      accent: "#e8c840",
      background: "#060e1a",
      text: "#f0ece4",
    },
    fonts: {
      heading: "space-grotesk",
      body: "inter",
    },
  },
  metadata: {
    title: "Stratify — Own Your Layer",
    description:
      "A vertically-optimized, stratified commerce ecosystem leveraging decentralized entrepreneurial layers to unlock exponential personal monetization.",
    ogImage: "/sites/stratify/hero-team.png",
  },
  nav: [
    { label: "Opportunity", path: "/opportunity" },
    { label: "Stratification Tiers", path: "/tiers" },
    { label: "Success Stories", path: "/success-stories" },
    { label: "Leadership", path: "/leadership" },
    { label: "Events", path: "/events" },
    { label: "Join Now", path: "/onboarding/step-1" },
  ],
  features: {
    commerce: false,
  },
  verticalKey: "professional-tech",
  tagline: "Enterprise stratification. We separate what does not need to be combined.",
}
