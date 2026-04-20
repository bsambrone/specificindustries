// src/sites/pettential/config.ts
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Pettential",
  subdomain: "pettential",
  theme: {
    preset: "athletic",
    colors: {
      primary: "#CCFF00",
      secondary: "#1A1A1A",
      accent: "#FF3366",
      background: "#FAFAFA",
      text: "#111111",
    },
    fonts: {
      heading: "space-grotesk",
      body: "inter",
    },
  },
  metadata: {
    title: "Pettential — Elevating Every Animal to Its Full Potential™",
    description: "A premium pet performance brand with products and coaching services across six divisions. Because stagnation is a choice.",
    ogImage: "/sites/pettential/hero.jpg",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Team", path: "/leadership" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "pets-specialty",
  tagline: "Pet companionship services across every taxonomic kingdom.",
}
