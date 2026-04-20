import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "The Pennywhistle Play Company",
  subdomain: "terrorclown",
  theme: {
    preset: "vintage-catalog",
    colors: {
      primary: "#A8352A",
      secondary: "#3E6C6E",
      accent: "#0F0B09",
      background: "#F5EDE0",
      text: "#1F1A17",
    },
    fonts: {
      heading: "cormorant-garamond",
      body: "lora",
    },
  },
  metadata: {
    title: "The Pennywhistle Play Company — Makers of Terror Clown™ since 1948",
    description:
      "Heirloom-quality children's companions, hand-finished in Millbrook, Ohio. Terror Clown™, the Haunted Headboard Bed, and six curated Experiences. Where every child finds a friend.",
    ogImage: "/sites/terrorclown/hero.png",
  },
  nav: [
    { label: "Shop", path: "/products" },
    { label: "Our Story", path: "/about" },
    { label: "Safety", path: "/safety" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "consumer-household",
  tagline: "Where every child finds a friend.",
}
