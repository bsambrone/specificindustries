import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "The Theory Is Real",
  subdomain: "thetheoryisreal",
  theme: {
    preset: "paranoid",
    colors: {
      primary: "#c8a86b",      // aged gold
      secondary: "#6b8e75",    // desaturated olive
      accent: "#c13a2e",       // red-alert — reserve for alarm chrome
      background: "#0f1012",   // near-black, slight blue
      text: "#d8d4c7",         // warm off-white
    },
    fonts: {
      heading: "ibm-plex-mono",
      body: "lora",
    },
  },
  metadata: {
    title: "The Theory Is Real — The Truth They Hide From You",
    description: "Independent atmospheric, reptilian, simulation, and signal-interference reporting. Evidence. Forum. Research archive. Awaken.",
    ogImage: "/sites/thetheoryisreal/hero.png",
  },
  nav: [
    { label: "Theories", path: "/theories" },
    { label: "Forum", path: "/forum" },
    { label: "Shop", path: "/shop" },
    { label: "Evidence", path: "/evidence" },
    { label: "Library", path: "/library" },
    { label: "About", path: "/about" },
  ],
  features: {
    commerce: true,
  },
  megaMenu: {
    items: [
      {
        label: "Theories",
        path: "/theories",
        style: "mega",
        children: [
          { label: "Atmospheric", path: "/category/atmospheric", description: "Sky-based influence operations" },
          { label: "Global Control", path: "/category/global-control", description: "The architecture of obedience" },
          { label: "Reptilian Dossier", path: "/category/reptilian", description: "What they really are" },
          { label: "Digital Reality", path: "/category/digital-reality", description: "NPCs, algorithms, the simulation" },
          { label: "Weaponized Tech", path: "/category/weaponized-tech", description: "Infrastructure as attack surface" },
        ],
      },
      {
        label: "Forum",
        path: "/forum",
        style: "dropdown",
        children: [
          { label: "Hot Threads", path: "/forum#hot" },
          { label: "Atmospheric Anomalies", path: "/forum/atmospheric-anomalies" },
          { label: "Reptilian Sightings", path: "/forum/reptilian-sightings" },
          { label: "NPC Watch", path: "/forum/npc-watch" },
          { label: "Signal Interference", path: "/forum/signal-interference" },
          { label: "General Truth-Seeking", path: "/forum/general" },
        ],
      },
      { label: "Shop", path: "/shop" },
      { label: "Evidence", path: "/evidence" },
      { label: "Library", path: "/library" },
    ],
  },
  tagline: "The truth is not hidden. You are.",
}
