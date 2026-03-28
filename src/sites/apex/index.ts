import { config } from "./config"
import type { PageEntry } from "@/themes"
import ApexHome from "./pages/home"
import ApexAbout from "./pages/about"
import ApexDisclaimer from "./pages/disclaimer"

export { config }

export const pages: Record<string, PageEntry> = {
  "": ApexHome,
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
}
