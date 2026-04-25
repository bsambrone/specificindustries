import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Citizens Against DHMO",
  subdomain: "citizensagainstdhmo",
  theme: {
    preset: "ngo",
    colors: {
      primary: "#134e6f",      // deep institutional blue
      secondary: "#c25b32",    // warm terracotta — nonprofit-CTA orange
      accent: "#7eb3d9",       // soft sky blue
      background: "#f8fafc",   // near-white
      text: "#1a2332",         // charcoal-slate
    },
    fonts: {
      heading: "source-serif-4",
      body: "inter",
    },
  },
  metadata: {
    title: "Citizens Against DHMO — A grassroots movement for transparency about dihydrogen monoxide",
    description: "DHMO is in your food, your schools, your data centers, and your bloodstream. Citizens Against DHMO is the leading awareness movement demanding transparency about the most under-regulated chemical in modern life.",
    ogImage: "/sites/citizensagainstdhmo/hero.png",
  },
  nav: [
    { label: "The Threats", path: "/threats" },
    { label: "Where It Hides", path: "/sources" },
    { label: "Stories", path: "/stories" },
    { label: "Impact", path: "/impact" },
    { label: "Take Action", path: "/take-action" },
    { label: "Leadership", path: "/leadership" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: false,
  },
  verticalKey: "hygiene-wellness",
  tagline: "DHMO is in everything you love. We're the citizens demanding answers.",
}
