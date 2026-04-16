import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Squared Away Supply Co.",
  subdomain: "squaredaway",
  theme: {
    preset: "military",
    colors: {
      primary: "#4B5320",      // olive drab
      secondary: "#BDB76B",    // subdued khaki
      accent: "#FF6B1A",       // safety orange CTA
      background: "#F5EFE0",   // manila cream
      text: "#1F1F1F",         // near-black
    },
    fonts: {
      heading: "black-ops-one",
      body: "inter",
    },
  },
  metadata: {
    title: "Squared Away Supply Co. — The Official Unofficial Post Exchange",
    description:
      "Authorized gear for all four service branches. Morale is a metric. We sell it by the pound.",
    ogImage: "/sites/squaredaway/hero.png",
  },
  nav: [
    { label: "ARMY", path: "/army" },
    { label: "NAVY", path: "/navy" },
    { label: "AIR FORCE", path: "/airforce" },
    { label: "MARINES", path: "/marines" },
    { label: "MORALE", path: "/morale" },
    { label: "FAQ", path: "/faq" },
    { label: "LEADERSHIP", path: "/leadership" },
  ],
  features: {
    commerce: true,
  },
}
