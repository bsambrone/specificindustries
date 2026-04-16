import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Radium Roy's",
  subdomain: "radiumroys",
  theme: {
    preset: "light",
    colors: {
      primary: "#1a8c3a",
      secondary: "#ff6b35",
      accent: "#a87300",
      background: "#f5f1e8",
      text: "#1a2238",
    },
    fonts: {
      heading: "bungee",
      body: "work-sans",
    },
  },
  metadata: {
    title: "Radium Roy's — Better Living Through American Ingenuity",
    description: "Wholesome American consumer goods for the modern family. From our laboratories to your home since 1952.",
    ogImage: "/sites/radiumroys/hero.png",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Standards", path: "/standards" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
