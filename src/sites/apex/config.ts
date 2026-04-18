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
    title: "Specific Industries — Serving the World's Most Specific Industries",
    description: "We identify overlooked market segments and build dedicated brands to serve them. Specific Industries is the parent company behind a portfolio of brands serving the world's most specific industries.",
    ogImage: "/sites/apex/companyhq.png",
    logo: "/sites/apex/companyhq.png",
    organizationType: "Corporation",
    foundingDate: "2019",
    founders: ["Bill Sambrone"],
  },
  nav: [
    { label: "Portfolio", path: "/portfolio" },
    { label: "Thesis", path: "/thesis" },
    { label: "Newsroom", path: "/newsroom" },
    { label: "Partnerships", path: "/partnerships" },
    { label: "Careers", path: "/careers" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: false,
  },
}
