import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import CarbonNeutralOutrageHome from "./pages/home"
import ProgramsIndex, { metadata as programsMetadata } from "./pages/programs"
import ProgramDetail from "./pages/program-detail"
import AboutPage, { metadata as aboutMetadata } from "./pages/about"
import ImpactPage, { metadata as impactMetadata } from "./pages/impact"
import TakeActionPage, { metadata as takeActionMetadata } from "./pages/take-action"
import DonatePage, { metadata as donateMetadata } from "./pages/donate"
import { getProgramBySlug } from "./data/programs"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CarbonNeutralOutrageHome,
  "programs": { component: ProgramsIndex, metadata: programsMetadata },
  "about": { component: AboutPage, metadata: aboutMetadata },
  "impact": { component: ImpactPage, metadata: impactMetadata },
  "take-action": { component: TakeActionPage, metadata: takeActionMetadata },
  "donate": { component: DonatePage, metadata: donateMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  programs: {
    component: ProgramDetail,
    getMetadata: (slug: string) => {
      const program = getProgramBySlug(slug)
      return program
        ? {
            title: `${program.displayName} — Campaign for Sustainable Overreactions`,
            description: program.tagline,
            ogImage: program.heroImage,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProgramBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getProgramBySlug(slug)?.displayName,
    breadcrumbSectionLabel: "Programs",
  },
}
