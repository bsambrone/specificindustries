import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Dehydrated Water Co.",
  subdomain: "dehydratedwater",
  theme: {
    preset: "heritage",
    colors: {
      primary: "#1B3A4B",
      secondary: "#E8F0F2",
      accent: "#7BB8CC",
      background: "#D5DCE0",
      text: "#1a1a1a",
    },
    fonts: {
      heading: "playfair",
      body: "inter",
    },
  },
  metadata: {
    title: "Dehydrated Water Co. — Purveyors of Fine Powdered Hydration Since 1847",
    description:
      "Premium artisanal dehydrated water, crafted by hand since 1847. Just add water.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Our Story", path: "/our-story" },
    { label: "The Science", path: "/the-science" },
    { label: "WaaS", path: "/waas" },
    { label: "FAQ", path: "/faq" },
  ],
  features: {
    commerce: true,
  },
}
