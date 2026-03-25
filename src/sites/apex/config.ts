import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Specific Industries",
  subdomain: "apex",
  theme: {
    preset: "corporate",
    colors: {
      primary: "#1a1a2e",
      secondary: "#e2e8f0",
      accent: "#0f3460",
      background: "#ffffff",
      text: "#1a1a1a",
    },
    fonts: {
      heading: "space-grotesk",
      body: "inter",
    },
  },
  metadata: {
    title: "Specific Industries — Very Specific Products",
    description: "We make very specific products for very specific people.",
  },
  nav: [
    { label: "Home", path: "/" },
  ],
  features: {
    commerce: false,
  },
}
