// src/sites/elderparty/config.ts
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "The Elder Party",
  subdomain: "elderparty",
  theme: {
    preset: "political",
    colors: {
      primary: "#c4a035",
      secondary: "#1a2340",
      accent: "#5c1a1a",
      background: "#0b0f1a",
      text: "#e0ddd4",
    },
    fonts: {
      heading: "playfair",
      body: "inter",
    },
  },
  metadata: {
    title: "The Elder Party — A Return to Older Values",
    description: "The Elder Party is committed to restoring what was always beneath. Leadership that has waited. A fresh start for America.",
    ogImage: "/sites/elderparty/hero.png",
  },
  megaMenu: {
    items: [
      {
        label: "Platform",
        path: "/platform",
      },
      {
        label: "Coalitions",
        path: "/coalitions",
      },
      {
        label: "News",
        path: "/news",
      },
      {
        label: "Events",
        path: "/events",
      },
      {
        label: "Get Involved",
        style: "dropdown",
        children: [
          { label: "Volunteer", path: "/volunteer", description: "The campaign needs you. It has always needed you." },
          { label: "Donate", path: "/donate", description: "Every dollar brings us closer to awakening." },
          { label: "Events", path: "/events", description: "Rallies, town halls, and awakenings near you." },
        ],
      },
      {
        label: "About",
        style: "dropdown",
        children: [
          { label: "About the Party", path: "/about", description: "Our history, our mission, our inevitable triumph." },
          { label: "Leadership", path: "/leadership", description: "Meet the officials guiding the awakening." },
          { label: "The Candidate", path: "/candidate", description: "Cthulhu R'lyeh — Founder & Party Leader." },
          { label: "Contact", path: "/contact", description: "We already know where you are, but formalities matter." },
        ],
      },
      {
        label: "Shop",
        path: "/shop",
      },
    ],
  },
  nav: [
    { label: "Platform", path: "/platform" },
    { label: "Coalitions", path: "/coalitions" },
    { label: "News", path: "/news" },
    { label: "Events", path: "/events" },
    { label: "Volunteer", path: "/volunteer" },
    { label: "Donate", path: "/donate" },
    { label: "About", path: "/about" },
    { label: "Shop", path: "/shop" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "professional-services",
  tagline: "Event planning tailored exclusively to the 75-and-over demographic.",
}
