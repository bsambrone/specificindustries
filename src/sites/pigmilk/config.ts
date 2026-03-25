import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Pig Milk Co.",
  subdomain: "pigmilk",
  theme: {
    preset: "playful",
    colors: {
      primary: "#E91E63",
      secondary: "#FCE4EC",
      accent: "#880E4F",
      background: "#ffffff",
      text: "#1a1a1a",
    },
    fonts: {
      heading: "playfair",
      body: "inter",
    },
  },
  metadata: {
    title: "Pig Milk Co. — Farm-Fresh Pig Milk",
    description: "Premium artisanal pig milk, delivered to your door. Yes, really.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: false,
  },
}
