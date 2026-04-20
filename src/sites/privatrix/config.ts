import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Privatrix",
  subdomain: "privatrix",
  theme: {
    preset: "saas",
    colors: {
      primary: "#1E3A8A",      // deep corporate navy
      secondary: "#0EA5E9",    // trust-blue accent
      accent: "#F59E0B",       // gold premium/enterprise highlights
      background: "#FFFFFF",   // pure white
      text: "#0F172A",         // slate-900
    },
    fonts: {
      heading: "inter",
      body: "inter",
    },
  },
  metadata: {
    title: "Privatrix — Trust. Delivered. Quarterly.",
    description: "The only enterprise privacy platform with zero independently verifiable claims. SOC-π certified. GDPR-Adjacent™.",
    ogImage: "/sites/privatrix/hero.png",
  },
  nav: [
    { label: "Products", path: "/products" },
    { label: "Certifications", path: "/certifications" },
    { label: "Leadership", path: "/leadership" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "professional-tech",
  tagline: "Privacy-first tooling for people who prefer not to be consulted.",
}
