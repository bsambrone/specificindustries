import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Campaign for Sustainable Overreactions",
  subdomain: "carbonneutraloutrage",
  theme: {
    preset: "ngo",
    colors: {
      primary: "#1f4d3a",     // deep evergreen
      secondary: "#c96a47",   // terracotta
      accent: "#87a287",      // sage
      background: "#f6f1e7",  // recycled-paper cream
      text: "#2a2724",        // warm charcoal
    },
    fonts: {
      heading: "fraunces",
      body: "work-sans",
    },
  },
  metadata: {
    title: "Campaign for Sustainable Overreactions — Responsible Outrage for a Warming Planet",
    description: "If you must overreact, do it responsibly. The Campaign for Sustainable Overreactions advocates for carbon-neutral outrage, reusable pitchforks, and certified responsible overreactor practices.",
    ogImage: "/sites/carbonneutraloutrage/hero.png",
  },
  nav: [
    { label: "Programs", path: "/programs" },
    { label: "Impact", path: "/impact" },
    { label: "Take Action", path: "/take-action" },
    { label: "Leadership", path: "/leadership" },
    { label: "About", path: "/about" },
    { label: "Donate", path: "/donate" },
  ],
  features: {
    commerce: false,
  },
  verticalKey: "hygiene-wellness",
  tagline: "If you must overreact, do it responsibly.",
}
