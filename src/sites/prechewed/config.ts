import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Prechewed™",
  subdomain: "prechewed",
  theme: {
    preset: "saas",
    colors: {
      primary: "#5B3FD9",
      secondary: "#0F0E1A",
      accent: "#EFA339",
      background: "#FAFAF7",
      text: "#0F0E1A",
    },
    fonts: {
      heading: "space-grotesk",
      body: "inter",
    },
  },
  metadata: {
    title: "Prechewed™ — You have better things to do with your mouth.",
    description: "Pre-Oral Hydrolysis™ in a pouch. 8.3× nutrient bioavailability. 47 days reclaimed annually. The Daily Bolus and 27 other pouches, pre-chewed for you.",
    ogImage: "/sites/prechewed/hero.png",
  },
  nav: [
    { label: "Products", path: "/products" },
    { label: "Daily Bolus", path: "/bolus" },
    { label: "Science", path: "/science" },
    { label: "Process", path: "/process" },
    { label: "Press", path: "/press" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "health-wellness",
  tagline: "You have better things to do with your mouth.",
}
