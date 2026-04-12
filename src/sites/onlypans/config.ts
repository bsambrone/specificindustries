import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Only Pans",
  subdomain: "onlypans",
  theme: {
    preset: "light",
    colors: {
      primary: "#C2410C",      // molten copper
      secondary: "#7C2D12",    // deep rust
      accent: "#FDE68A",       // warm amber
      background: "#FFF6ED",   // cream
      text: "#1C0F05",         // near-black coffee
    },
    fonts: {
      heading: "inter",
      body: "inter",
    },
  },
  metadata: {
    title: "Only Pans — Cookware Subscriptions",
    description: "Subscribe to your favorite pan. Literal pans. Sitting perfectly still. A better platform than those people with the fans.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Meet the Pans", path: "/browse" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "About", path: "/about" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: false,
  },
}
