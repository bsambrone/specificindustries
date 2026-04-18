import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "True Grit Personal Care",
  subdomain: "truegrit",
  theme: {
    preset: "industrial",
    colors: {
      primary: "#f96302",
      secondary: "#f5f5f0",
      accent: "#ff8c00",
      background: "#ffffff",
      text: "#1a1a1a",
    },
    fonts: {
      heading: "barlow-condensed",
      body: "inter",
    },
  },
  metadata: {
    title: "True Grit Personal Care — Where Comfort Meets Its Match",
    description: "Industrial-grade personal cleansing products. Non-GMO. Free Range. Definitely Not Tear-Free.",
    ogImage: "/sites/truegrit/hero.png",
  },
  nav: [
    { label: "Products", path: "/products" },
    { label: "Applications", path: "/applications" },
    { label: "The Experience", path: "/the-experience" },
    { label: "Behind the Scenes", path: "/behind-the-scenes" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "hygiene",
  tagline: "Abrasives for people who have given up on softer options.",
}
