import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Rocks",
  subdomain: "rocks",
  theme: {
    preset: "terminal",
    colors: {
      primary: "#ff9900",
      secondary: "#1a1a1a",
      accent: "#00ff41",
      background: "#0a0a0a",
      text: "#ff9900",
    },
    fonts: {
      heading: "ibm-plex-mono",
      body: "ibm-plex-mono",
    },
  },
  metadata: {
    title: "ROCKS — The Only Asset Class Older Than Money",
    description:
      "Institutional-grade bedrock exposure. Terrestrial hard assets with zero counterparty risk. Accumulate positions at spot.",
    ogImage: "/sites/rocks/hero.png",
  },
  nav: [
    { label: "MARKETS", path: "/products" },
    { label: "VAULT", path: "/vault-tour" },
    { label: "ABOUT", path: "/about" },
    { label: "LEADERSHIP", path: "/leadership" },
    { label: "CONTACT", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "consumer-goods",
  tagline: "Geological assets curated for the discerning rock owner.",
}
