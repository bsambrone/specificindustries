import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Snortables",
  subdomain: "snortables",
  theme: {
    preset: "dark",
    colors: {
      primary: "#00e5a0",
      secondary: "#0ea5e9",
      accent: "#f59e0b",
      background: "#0a0a0f",
      text: "#e8e8ec",
    },
    fonts: {
      heading: "space-grotesk",
      body: "inter",
    },
  },
  metadata: {
    title: "Snortables — Intranasal Nutrient Delivery",
    description: "Clinically optimized intranasal nutrient delivery for the modern human. Why eat when you can insufflate?",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "The Process", path: "/process" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
