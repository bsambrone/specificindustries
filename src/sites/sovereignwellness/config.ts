import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Sovereign Wellness Co.",
  subdomain: "sovereignwellness",
  theme: {
    preset: "elegant",
    colors: {
      primary: "#6B1F1F",       // Oxblood
      secondary: "#F5ECD7",     // Parchment Cream
      accent: "#1A2942",        // Deep Navy
      background: "#F5ECD7",    // Parchment Cream
      text: "#1C1613",          // Ink Black
    },
    fonts: {
      heading: "cormorant-garamond",
      body: "lora",
    },
  },
  metadata: {
    title: "Sovereign Wellness Co. — Ancestral Medicine, Restored. Protected.",
    description: "Custodians of remedies filed away in 1962. Sixteen protocols for conditions the medical establishment has declined to acknowledge. Banned in 39 states. Est. in defiance, 1774.",
    ogImage: "/sites/sovereignwellness/hero.png",
  },
  nav: [
    { label: "Treatments", path: "/treatments" },
    { label: "Founders", path: "/founders" },
    { label: "Our Story", path: "/our-story" },
    { label: "Dispatches", path: "/dispatches" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: false,
  },
}
