import { config } from "./config"
import type { PageEntry } from "@/themes"
import CleanSheetHome from "./pages/home"
import ServicesPage, { metadata as servicesMetadata } from "./pages/services"
import AboutPage, { metadata as aboutMetadata } from "./pages/about"
import LeadershipPage, { metadata as leadershipMetadata } from "./pages/leadership"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CleanSheetHome,
  "services": { component: ServicesPage, metadata: servicesMetadata },
  "about": { component: AboutPage, metadata: aboutMetadata },
  "leadership": { component: LeadershipPage, metadata: leadershipMetadata },
}
