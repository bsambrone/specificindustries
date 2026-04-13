import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Pig Milk Creamery",
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
    title: "Pig Milk Creamery — Farm-Fresh Pig Milk",
    description: "Premium artisanal pig milk, delivered to your door. Yes, really.",
    ogImage: "/sites/pigmilk/hero.png",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Behind the Scenes", path: "/behind-the-scenes" },
    { label: "Volunteer", path: "/volunteer" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
