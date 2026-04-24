import { config } from "./config"
import type { PageEntry } from "@/themes"
import PointlessMetricsHome from "./pages/home"
import PointlessMetricsAbout, { metadata as aboutMetadata } from "./pages/about"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PointlessMetricsHome,
  "about": { component: PointlessMetricsAbout, metadata: aboutMetadata },
}
