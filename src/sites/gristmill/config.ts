import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Gristmill Partners",
  subdomain: "gristmill",
  theme: {
    preset: "industrial",
    colors: {
      primary: "#c4622d",
      secondary: "#6b3d1f",
      accent: "#d4a147",
      background: "#f4ead5",
      text: "#2b1e10",
    },
    fonts: {
      heading: "zilla-slab",
      body: "fraunces",
    },
  },
  metadata: {
    title: "Gristmill Partners — Helping American Industry Grind Employees Into Dust Since 1962",
    description:
      "Gristmill Partners is the trusted name in workforce stabilization, retention engineering, and compensation dampening for the Fortune 500. Privately held since 1962.",
    ogImage: "/sites/gristmill/home-hero.png",
  },
  megaMenu: {
    items: [
      {
        label: "Services",
        style: "mega",
        children: [
          {
            label: "Mandatory Learning & Development",
            path: "/services/training",
            description: "Fill the hours. Empty the head.",
          },
          {
            label: "Internal Communications Optimization",
            path: "/services/communications",
            description: "Say more. Clarify nothing.",
          },
          {
            label: "Organizational Restructuring Services",
            path: "/services/restructuring",
            description: "Everything in motion. Nothing in place.",
          },
          {
            label: "Retention Through Ambient Dread",
            path: "/services/retention",
            description: "Loyalty through carefully managed uncertainty.",
          },
          {
            label: "Performance Management Systems",
            path: "/services/performance",
            description: "If it moves, measure it. If it doesn't move, measure it harder.",
          },
          {
            label: "Management Enablement",
            path: "/services/management",
            description: "Responsibility without authority. Authority without accountability.",
          },
          {
            label: "Compensation Suppression Solutions",
            path: "/services/compensation",
            description: "Fair pay, properly contextualized.",
          },
          {
            label: "Employee Engagement",
            path: "/services/engagement",
            description: "Camaraderie, mandatory.",
          },
          {
            label: "IT & Tooling",
            path: "/services/tooling",
            description: "Technology that works against you, consistently.",
          },
          {
            label: "Physical Workspace Strategy",
            path: "/services/workspace",
            description: "The building itself is the intervention.",
          },
        ],
      },
      {
        label: "Case Studies",
        path: "/case-studies",
      },
      {
        label: "About",
        path: "/about",
      },
      {
        label: "Contact",
        path: "/contact",
      },
    ],
  },
  nav: [
    { label: "Services", path: "/services" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: false,
  },
}
