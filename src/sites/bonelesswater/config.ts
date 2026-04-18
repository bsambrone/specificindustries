import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Boneless Water",
  subdomain: "bonelesswater",
  theme: {
    preset: "light",
    colors: {
      primary: "#0c4a6e",      // medical navy
      secondary: "#075985",    // deeper navy
      accent: "#dc2626",       // urgent red (CERTIFIED, WARNING)
      background: "#FFFFFF",
      text: "#0f172a",
    },
    fonts: {
      heading: "inter",
      body: "inter",
    },
  },
  metadata: {
    title: "Boneless Water — Pharmaceutical-Grade Bone-Free Drinking Water",
    description: "The original deboned drinking water. Independently verified 99.9999% bone-free. The skeletal structure of water has been understood since 1873; we are the only platform that takes it seriously.",
    ogImage: "/sites/bonelesswater/home-hero.png",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Comparison", path: "/comparison" },
    { label: "Our Process", path: "/process" },
    { label: "Research", path: "/research" },
    { label: "About", path: "/about" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "consumer-goods",
  tagline: "Water reformulated for modern consumers. No bones.",
}
