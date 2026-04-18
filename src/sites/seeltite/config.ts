import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Seel-Tite Containment Systems",
  subdomain: "seeltite",
  theme: {
    preset: "industrial",
    colors: {
      primary: "#F25C05",       // Safety orange
      secondary: "#1A1A1A",     // Charcoal
      accent: "#C8E82A",        // Hi-vis lime
      background: "#F2F2EF",    // Concrete off-white
      text: "#0D0D0D",          // Near-black
    },
    fonts: {
      heading: "barlow-condensed",
      body: "inter",
    },
  },
  metadata: {
    title: "Seel-Tite — Toot With Confidence.",
    description: "Every toot is a gamble. The G1 is the house. The G1 Containment Gasket plus ten disposal and ancillary accessories. Since 1973.",
    ogImage: "/sites/seeltite/hero.png",
  },
  nav: [
    { label: "Products", path: "/products" },
    { label: "Scenarios", path: "/scenarios" },
    { label: "Recovery", path: "/recovery" },
    { label: "Demonstrations", path: "/demonstrations" },
    { label: "Fitment", path: "/fitment" },
    { label: "Compatibility", path: "/compatibility" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: true,
  },
}
