import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import StratifyHome from "./pages/home"
import OpportunityPage, { metadata as opportunityMetadata } from "./pages/opportunity"
import TiersPage, { metadata as tiersMetadata } from "./pages/tiers"

export { config }

export const pages: Record<string, PageEntry> = {
  "": StratifyHome,
  "opportunity": { component: OpportunityPage, metadata: opportunityMetadata },
  "tiers": { component: TiersPage, metadata: tiersMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}
