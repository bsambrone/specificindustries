import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Odd Occasions",
  subdomain: "oddoccasions",
  theme: {
    preset: "boutique",
    colors: {
      primary: "#7C9A82",
      secondary: "#F5F0E8",
      accent: "#D4A0A0",
      background: "#FFFDF8",
      text: "#2D2D2D",
    },
    fonts: {
      heading: "playfair",
      body: "nunito",
    },
  },
  metadata: {
    title: "Odd Occasions — Thoughtfully Curated Gifts for Life's Most Specific Moments",
    description: "A boutique gift shop offering curated gift boxes for extremely specific situations. From 'Sorry I Ate Your Labeled Lunch in 2017' to 'Congrats on Your Mild Promotion,' every awkward moment deserves a beautiful box.",
    ogImage: "/sites/oddoccasions/home-hero.png",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Our Story", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "professional-tech",
  tagline: "Event services for occasions that fall outside standard categories.",
}
