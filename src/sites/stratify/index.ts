import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import StratifyHome from "./pages/home"
import OpportunityPage, { metadata as opportunityMetadata } from "./pages/opportunity"
import TiersPage, { metadata as tiersMetadata } from "./pages/tiers"
import SuccessStoriesPage, { metadata as successStoriesMetadata } from "./pages/success-stories"
import LeadershipPage, { metadata as leadershipMetadata } from "./pages/leadership"

export { config }

export const pages: Record<string, PageEntry> = {
  "": StratifyHome,
  "opportunity": { component: OpportunityPage, metadata: opportunityMetadata },
  "tiers": { component: TiersPage, metadata: tiersMetadata },
  "success-stories": { component: SuccessStoriesPage, metadata: successStoriesMetadata },
  "leadership": { component: LeadershipPage, metadata: leadershipMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {}
