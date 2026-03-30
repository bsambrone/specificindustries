import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Strategic Void Consulting",
  subdomain: "strategicvoid",
  theme: {
    preset: "consulting",
    colors: {
      primary: "#c9a84c",
      secondary: "#1a2744",
      accent: "#c9a84c",
      background: "#0a1628",
      text: "#e8e0d0",
    },
    fonts: {
      heading: "playfair",
      body: "inter",
    },
  },
  metadata: {
    title: "Strategic Void Consulting — Aligning Your Organization with the Void™",
    description:
      "Strategic Void Consulting delivers enterprise-grade solutions for organizations committed to maximum process without measurable outcome.",
  },
  megaMenu: {
    items: [
      {
        label: "Solutions",
        style: "mega",
        children: [
          {
            label: "Meeting Optimization Suite™",
            path: "/solutions/meeting-optimization",
            description: "Maximize meeting impact. Minimize actual contribution.",
          },
          {
            label: "KPI Alignment Platform™",
            path: "/solutions/kpi-alignment",
            description: "If you can measure it, you can misunderstand it.",
          },
          {
            label: "Middle Management Enablement™",
            path: "/solutions/middle-management",
            description: "Empowering leaders to lead without leading.",
          },
          {
            label: "Productivity Theater™",
            path: "/solutions/productivity-theater",
            description: "Work harder at appearing to work.",
          },
          {
            label: "Compliance & Policy Solutions™",
            path: "/solutions/compliance-policy",
            description: "Because accountability is a shared illusion.",
          },
          {
            label: "Communication Enhancement Tools™",
            path: "/solutions/communication-enhancement",
            description: "Say more. Mean less.",
          },
          {
            label: "Decision Support Systems™",
            path: "/solutions/decision-support",
            description: "Making decisions optional.",
          },
          {
            label: "Employee Experience Optimization™",
            path: "/solutions/employee-experience",
            description: "Because happy employees are statistically unnecessary.",
          },
        ],
      },
      {
        label: "Case Studies",
        path: "/case-studies",
      },
      {
        label: "Whitepapers",
        path: "/whitepapers",
      },
      {
        label: "Methodology",
        path: "/methodology",
      },
      {
        label: "Pricing",
        path: "/pricing",
      },
      {
        label: "About",
        style: "dropdown",
        children: [
          {
            label: "Company",
            path: "/about",
          },
          {
            label: "Leadership",
            path: "/leadership",
          },
          {
            label: "Contact",
            path: "/contact",
          },
        ],
      },
    ],
  },
  nav: [
    { label: "Solutions", path: "/solutions" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "Whitepapers", path: "/whitepapers" },
    { label: "Methodology", path: "/methodology" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
    { label: "Leadership", path: "/leadership" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: false,
  },
}
