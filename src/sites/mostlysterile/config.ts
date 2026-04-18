import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Mostly Sterile",
  subdomain: "mostlysterile",
  theme: {
    preset: "light",
    colors: {
      primary: "#1e3a5f",
      secondary: "#9bc5b8",
      accent: "#e8c547",
      background: "#f6f4ee",
      text: "#0f1e2e",
    },
    fonts: {
      heading: "barlow-condensed",
      body: "inter",
    },
  },
  metadata: {
    title: "Mostly Sterile — Meeting or Nearing Industry Standards Since 2014",
    description: "Surgical instruments, bandages, PPE, diagnostics, and hospital surplus at prices you can live with. Sterile enough.",
    ogImage: "/sites/mostlysterile/hero.png",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Certifications", path: "/certifications" },
    { label: "Quality", path: "/quality-assurance" },
    { label: "Leadership", path: "/leadership" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "health-wellness",
  tagline: "Medical-grade supplies at approximately sterile conditions.",
}
