import { config } from "./config"
import type { PageEntry } from "@/themes"
import ApexHome from "./pages/home"
import ApexAbout from "./pages/about"
import ApexPortfolio from "./pages/portfolio"
import ApexDisclaimer from "./pages/disclaimer"
import ApexPrivacy from "./pages/privacy"
import ApexTerms from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": ApexHome,
  "portfolio": {
    component: ApexPortfolio,
    metadata: {
      title: "Portfolio — Specific Industries",
      description: "Our portfolio of brands serving the world's most specific industries, organized across five strategic verticals.",
    },
  },
  "about": {
    component: ApexAbout,
    metadata: {
      title: "About — Specific Industries",
      description: "Learn about Specific Industries, our mission to serve overlooked markets, and the team behind our portfolio of brands.",
    },
  },
  "disclaimer": {
    component: ApexDisclaimer,
    metadata: {
      title: "Disclaimer — Specific Industries",
      description: "Important information about the satirical and entertainment nature of Specific Industries subsidiary brands.",
    },
  },
  "privacy": {
    component: ApexPrivacy,
    metadata: {
      title: "Privacy Policy — Specific Industries",
      description: "How Specific Industries collects, uses, and protects your information across all our properties.",
    },
  },
  "terms": {
    component: ApexTerms,
    metadata: {
      title: "Terms of Use — Specific Industries",
      description: "Terms of use governing all Specific Industries properties including subdomain sites.",
    },
  },
}
