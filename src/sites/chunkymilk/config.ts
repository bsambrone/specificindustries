import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Whitford Family Chunky Milk",
  subdomain: "chunkymilk",
  theme: {
    preset: "playful",
    colors: {
      primary: "#3F5A3A",
      secondary: "#E8DFC8",
      accent: "#6B4423",
      background: "#F4EEDD",
      text: "#2A1F14",
    },
    fonts: {
      heading: "playfair",
      body: "lora",
    },
  },
  metadata: {
    title: "Whitford Family Chunky Milk — Made In The Hollow Since 1867",
    description: "Six generations of chunks, straight from the hollow.",
    ogImage: "/sites/chunkymilk/hero.png",
    organizationType: "LocalBusiness",
    foundingDate: "1867",
    parentOrganization: "Specific Industries",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "The Chunkin' Process", path: "/the-chunkin-process" },
    { label: "Our Hollow", path: "/our-hollow" },
    { label: "Heritage", path: "/heritage" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "food-beverage",
  tagline: "Six generations of chunks, straight from the hollow.",
}
