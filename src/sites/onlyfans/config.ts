import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "OnlyFans",
  subdomain: "onlyfans",
  theme: {
    preset: "light",
    colors: {
      primary: "#00AFF0",      // OnlyFans cyan
      secondary: "#0095CD",    // deeper cyan
      accent: "#FF7A59",       // coral — tip buttons
      background: "#FFFFFF",
      text: "#0F172A",
    },
    fonts: {
      heading: "inter",
      body: "inter",
    },
  },
  metadata: {
    title: "OnlyFans — Air Movement Subscriptions",
    description: "Subscribe to your favorite fan. Literal fans. Blowing literal air. The world's premier subscription platform for household and industrial airflow content.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Meet the Fans", path: "/browse" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "About", path: "/about" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: false,
  },
}
