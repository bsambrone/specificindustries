import { config } from "./config"
import type { PageEntry } from "@/themes"
import PointlessMetricsHome from "./pages/home"
import PointlessMetricsAbout, { metadata as aboutMetadata } from "./pages/about"
import PointlessMetricsMethodology, { metadata as methodologyMetadata } from "./pages/methodology"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PointlessMetricsHome,
  "about": { component: PointlessMetricsAbout, metadata: aboutMetadata },
  "methodology": { component: PointlessMetricsMethodology, metadata: methodologyMetadata },
}
