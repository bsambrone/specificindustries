import { config } from "./config"
import type { PageEntry } from "@/themes"
import ApexHome from "./pages/home"
import ApexAbout from "./pages/about"

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
}
