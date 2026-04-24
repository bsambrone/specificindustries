import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Institute for the Study of Pointless Metrics",
  subdomain: "pointlessmetrics",
  theme: {
    preset: "institute",
    colors: {
      primary: "#0f2b4f",     // deep institutional navy
      secondary: "#c8553d",   // vermilion
      accent: "#6b7a6b",      // slate sage
      background: "#f7f3e9",  // paper cream
      text: "#1a1d24",        // near-black ink
    },
    fonts: {
      heading: "lora",
      body: "inter",
    },
  },
  metadata: {
    title: "Institute for the Study of Pointless Metrics — In Data We Overtrust",
    description:
      "The Institute for the Study of Pointless Metrics (ISPM) publishes peer-reviewed findings on spurious correlations, sells precision instruments for quantifying the intangible, and credentials the next generation of Pointless Metrics Practitioners™.",
    ogImage: "/sites/pointlessmetrics/hero.png",
  },
  megaMenu: {
    items: [
      {
        label: "Research",
        style: "dropdown",
        children: [
          { label: "Findings Archive", path: "/findings" },
          { label: "Methodology", path: "/methodology" },
          { label: "Quarterly Report", path: "/products/quarterly-report" },
        ],
      },
      {
        label: "Shop",
        style: "mega",
        children: [
          { label: "Instruments", path: "/shop#instruments", description: "Wearables, desktop dashboards, precision fixtures" },
          { label: "Publications", path: "/shop#publications", description: "The Quarterly Report and the Correlation Almanac" },
          { label: "Advisory", path: "/shop#advisory", description: "Audits, coaching retainers, on-site measurement" },
          { label: "Credentialing", path: "/shop#credentialing", description: "The Certified Pointless Metrics Practitioner™ program" },
          { label: "Merchandise", path: "/shop#merchandise", description: "Wall plaques, vanity-URL stickers, pocket rulers" },
          { label: "All Products", path: "/shop" },
        ],
      },
      {
        label: "About",
        style: "dropdown",
        children: [
          { label: "The Institute", path: "/about" },
          { label: "Leadership", path: "/leadership" },
          { label: "Contact", path: "/contact" },
        ],
      },
    ],
  },
  nav: [
    { label: "Findings", path: "/findings" },
    { label: "Shop", path: "/shop" },
    { label: "Methodology", path: "/methodology" },
    { label: "About", path: "/about" },
    { label: "Leadership", path: "/leadership" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "professional-tech",
  tagline: "In data we overtrust.",
}
