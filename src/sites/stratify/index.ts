import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import StratifyHome from "./pages/home"
import OpportunityPage, { metadata as opportunityMetadata } from "./pages/opportunity"

export { config }

export const pages: Record<string, PageEntry> = {
  "": StratifyHome,
  "opportunity": { component: OpportunityPage, metadata: opportunityMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}
