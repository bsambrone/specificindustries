import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Grass Fed WiFi",
  subdomain: "grassfedwifi",
  theme: {
    preset: "pastoral",
    colors: {
      primary: "#87A96B",
      secondary: "#A8C8E0",
      accent: "#E8D5A2",
      background: "#FAF7F0",
      text: "#2D4A2B",
    },
    fonts: {
      heading: "fraunces",
      body: "nunito",
    },
  },
  metadata: {
    title: "Grass Fed WiFi — Farm-to-Table Wi-Fi",
    description: "Raw Spectrum. Pasture-Raised Connectivity. Small-batch, single-origin, seasonally harvested wifi from our frequency-farm co-op.",
    ogImage: "/sites/grassfedwifi/home-hero.png",
  },
  nav: [
    { label: "Shares", path: "/shares" },
    { label: "Harvest Calendar", path: "/harvest-calendar" },
    { label: "Grazing Lands", path: "/grazing-lands" },
    { label: "The Pasture", path: "/the-pasture" },
    { label: "The Farmers", path: "/meet-the-farmers" },
    { label: "Join the Co-op", path: "/join" },
  ],
  features: {
    commerce: true,
  },
}
