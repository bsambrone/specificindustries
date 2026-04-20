import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Super Engineered",
  subdomain: "superengineered",
  theme: {
    preset: "apple-minimal",
    colors: {
      primary: "#1d1d1f",     // Near-black text / buttons
      secondary: "#f5f5f7",   // Apple grey section breaks
      accent: "#0071e3",      // Apple blue CTAs / links
      background: "#ffffff",  // Pure white
      text: "#1d1d1f",        // Near-black body
    },
    fonts: {
      heading: "inter",
      body: "inter",
    },
  },
  metadata: {
    title: "Super Engineered — Rebuilt from first principles.",
    description: "Essential objects, rebuilt. Toothbrushes, doorknobs, light switches, and spoons — engineered at a level previously reserved for datacenters. Cloud+ subscription required.",
    ogImage: "/sites/superengineered/products/toothbrush-pro.png",
  },
  nav: [
    { label: "Shop", path: "/shop" },
    { label: "Enterprise", path: "/enterprise" },
    { label: "Developers", path: "/developers" },
    { label: "Trust", path: "/trust" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "consumer-household",
  tagline: "Over-specified industrial goods for under-specified problems.",
}
