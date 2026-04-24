import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import CarbonNeutralOutrageHome from "./pages/home"
import ProgramsIndex, { metadata as programsMetadata } from "./pages/programs"
import ProgramDetail from "./pages/program-detail"
import { getProgramBySlug } from "./data/programs"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CarbonNeutralOutrageHome,
  "programs": { component: ProgramsIndex, metadata: programsMetadata },
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
