import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Domaine Carter & Fils",
  subdomain: "carterandfils",
  theme: {
    preset: "elegant",
    colors: {
      primary: "#5C1A1B",       // Oxblood
      secondary: "#F2EAD3",     // Parchment Cream
      accent: "#B8791C",        // Amber Crude
      background: "#F2EAD3",    // Parchment Cream
      text: "#0B0906",          // Deep Oil Noir
    },
    fonts: {
      heading: "cormorant-garamond",
      body: "lora",
    },
  },
  metadata: {
    title: "Domaine Carter & Fils — Estate-Bottled in the Allegheny Since 1859",
    description: "A seventh-generation family winery. Reds, whites, rosés, sparkling, and dessert wines from the shale terroir of western Pennsylvania.",
    ogImage: "/sites/carterandfils/hero.png",
  },
  nav: [
    { label: "Our Story", path: "/our-story" },
    { label: "The Cellar", path: "/cellar" },
    { label: "Wine Club", path: "/wine-club" },
    { label: "Visit the Estate", path: "/visit" },
    { label: "Journal", path: "/journal" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "food-beverage",
  tagline: "Heritage craftsmanship, fourth generation. Quietly precise.",
}
