import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Whiskerworks",
  subdomain: "whiskerworks",
  theme: {
    preset: "trade-school",
    colors: {
      primary: "#0F4C5C",      // Municipal forest-teal (community-college chromatics)
      secondary: "#F5F2E8",    // Institutional off-white
      accent: "#F26419",       // Warning-sign orange — "ENROLL NOW"
      background: "#FFFEF7",   // Fluorescent-lit off-white
      text: "#1A1A1A",
    },
    fonts: {
      heading: "playfair-display",
      body: "inter",
    },
  },
  metadata: {
    title: "Whiskerworks — Your cat. Employed. In six weeks or less.",
    description: "Whiskerworks Advanced Feline Training Institute: six divisions, twenty careers, zero refunds. Accredited by us.",
    ogImage: "/sites/whiskerworks/hero.jpg",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Divisions", path: "/divisions" },
    { label: "Faculty", path: "/faculty" },
    { label: "Leadership", path: "/leadership" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: false,
  },
  verticalKey: "pets-specialty",
  tagline: "Advanced feline training across six divisions.",
}
