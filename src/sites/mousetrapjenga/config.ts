import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Mousetrap Jenga",
  subdomain: "mousetrapjenga",
  theme: {
    preset: "light",
    colors: {
      primary: "#D4281F",      // Cherry red
      secondary: "#FFD23F",    // Sunburst yellow
      accent: "#2BB9B9",       // Turquoise
      background: "#FFF6E8",   // Cream newsprint
      text: "#1A1F4C",         // Deep ink navy
    },
    fonts: {
      heading: "bowlby-one-sc",
      body: "poppins",
    },
  },
  metadata: {
    title: "Mousetrap Jenga — The American Family Game Classic",
    description: "The best way to lose a finger since 1978! Now available in Mouse Trap, Rat Trap, Bear Trap, and Industrial Leg-Hold editions.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "How to Play", path: "/how-to-play" },
    { label: "Hall of Fame", path: "/hall-of-fame" },
    { label: "About", path: "/about" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
