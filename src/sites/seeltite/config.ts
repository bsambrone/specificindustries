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
    title: "Seel-Tite Containment Systems — One Seal. Every Scenario.",
    description: "American-engineered modular shart containment since 1973. The G1 Containment Gasket plus 10 disposal and ancillary accessories. Prevent. Dispose. Proceed.",
    ogImage: "/sites/seeltite/hero.png",
  },
  nav: [
    { label: "Products", path: "/products" },
    { label: "Scenarios", path: "/scenarios" },
    { label: "Recovery", path: "/recovery" },
    { label: "Demonstrations", path: "/demonstrations" },
    { label: "Compatibility", path: "/compatibility" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: true,
  },
}
