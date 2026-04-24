import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Unmotivators Inc.",
  subdomain: "unmotivators",
  theme: {
    preset: "corporate-gray",
    colors: {
      primary: "#1A1A18",
      secondary: "#D4D1CA",
      accent: "#7A2E2E",
      background: "#E5E3DE",
      text: "#1A1A18",
    },
    fonts: {
      heading: "oswald",
      body: "source-serif-4",
    },
  },
  metadata: {
    title: "Unmotivators Inc. — Professional Disappointment, Delivered",
    description: "Honest office decor for people who have stopped pretending. Posters, mugs, plaques, and awards for the workplace that is what it is. Also: things for your home.",
    ogImage: "/sites/unmotivators/hero.png",
  },
  nav: [
    { label: "Office", path: "/office" },
    { label: "Home", path: "/home" },
    { label: "Manifesto", path: "/manifesto" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "consumer-household",
  tagline: "Professional disappointment, delivered.",
}
