import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Meh.",
  subdomain: "meh",
  theme: {
    preset: "brutalist",
    colors: {
      primary: "#2a2a2a",
      secondary: "#4a4a4a",
      accent: "#9a9a9a",
      background: "#d6d6d6",
      text: "#2a2a2a",
    },
    fonts: {
      heading: "inter",
      body: "inter",
    },
  },
  metadata: {
    title: "Meh. — Gadgets for people who've adjusted their expectations.",
    description: "Emotionally Disappointing Gadgets™. Engineered to underdeliver, reliably. Sixteen consumer electronics designed to gently let you down.",
    ogImage: "/sites/meh/hero.png",
  },
  nav: [
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
  ],
  megaMenu: {
    items: [
      { label: "Products", path: "/products" },
      {
        label: "Readings",
        style: "dropdown",
        children: [
          { label: "Manifesto", path: "/manifesto" },
          { label: "Press", path: "/press" },
          { label: "Journal", path: "/journal" },
          { label: "FAQ", path: "/faq" },
        ],
      },
      { label: "About", path: "/about" },
    ],
  },
  features: {
    commerce: true,
  },
  verticalKey: "professional-services",
  tagline: "Underreacting, professionally, on your behalf.",
}
