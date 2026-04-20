import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "The Clean Sheet",
  subdomain: "cleansheet",
  theme: {
    preset: "clinical",
    colors: {
      primary: "#2C3E50",
      secondary: "#3498DB",
      accent: "#3498DB",
      background: "#FFFFFF",
      text: "#2C3E50",
    },
    fonts: {
      heading: "playfair",
      body: "inter",
    },
  },
  metadata: {
    title: "The Clean Sheet — Definitely Not Money Laundering. Just Laundering.",
    description:
      "Premium fabric care for discerning clients since 1987. We clean clothes. That's it. Please stop asking.",
    ogImage: "/sites/cleansheet/hero.png",
  },
  nav: [
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Leadership", path: "/leadership" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: false,
  },
  verticalKey: "professional-tech",
  tagline: "Bedding rentals for life milestones that warrant fresh linens.",
}
