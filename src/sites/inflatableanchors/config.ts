import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Inflatable Anchors Co.",
  subdomain: "inflatableanchors",
  theme: {
    preset: "nautical",
    colors: {
      primary: "#F57C00",
      secondary: "#FFFDE7",
      accent: "#0D47A1",
      background: "#FAFAFA",
      text: "#1a1a1a",
    },
    fonts: {
      heading: "poppins",
      body: "inter",
    },
  },
  metadata: {
    title: "Inflatable Anchors Co. — The Easiest Anchor You'll Ever Pull Up",
    description:
      "Revolutionary inflatable anchors for the modern boater. Lightweight, portable, and effortlessly retrievable.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "The Technology", path: "/the-technology" },
    { label: "Customer Stories", path: "/customer-stories" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
