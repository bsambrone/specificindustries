import { config } from "./config"
import type { PageEntry } from "@/themes"
import PointlessMetricsHome from "./pages/home"

export { config }

export const pages: Record<string, PageEntry> = {
  "": PointlessMetricsHome,
}
