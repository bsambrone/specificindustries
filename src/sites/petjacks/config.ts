import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Petjacks",
  subdomain: "petjacks",
  theme: {
    preset: "playful",
    colors: {
      primary: "#7EC4E8",
      secondary: "#FFD6A5",
      accent: "#FF8FA3",
      background: "#FDFBF5",
      text: "#1F2937",
    },
    fonts: {
      heading: "nunito",
      body: "inter",
    },
  },
  metadata: {
    title: "Petjacks — Every Pet Deserves the Sky",
    description:
      "Personal propulsion systems for cats, dogs, rabbits, and fish. Family-friendly adventure, sky-high confidence, and lasting bonds await.",
    ogImage: "/sites/petjacks/hero.png",
    organizationType: "Corporation",
    parentOrganization: "Specific Industries",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Flight Academy", path: "/flight-academy" },
    { label: "Mission Gallery", path: "/mission-gallery" },
    { label: "Safety Record", path: "/safety-record" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "pets-specialty",
  tagline: "Every pet deserves the sky.",
}
