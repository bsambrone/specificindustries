import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import StrategicVoidHome from "./pages/home"
import SolutionsIndex, { metadata as solutionsMetadata } from "./pages/solutions-index"
import CaseStudiesIndex, { metadata as caseStudiesMetadata } from "./pages/case-studies-index"
import WhitepapersIndex, { metadata as whitepapersMetadata } from "./pages/whitepapers-index"
import SolutionRouter from "./pages/solution-router"
import CaseStudyPage from "./pages/case-study-page"
import WhitepaperPage from "./pages/whitepaper-page"
import { getSolutionBySlug } from "./data/solutions"
import { getProductBySlug } from "./data/products"
import { getCaseStudyBySlug } from "./data/case-studies"
import { getWhitepaperBySlug } from "./data/whitepapers"

export { config }

export const pages: Record<string, PageEntry> = {
  "": StrategicVoidHome,
  "solutions": { component: SolutionsIndex, metadata: solutionsMetadata },
  "case-studies": { component: CaseStudiesIndex, metadata: caseStudiesMetadata },
  "whitepapers": { component: WhitepapersIndex, metadata: whitepapersMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  "solutions": {
    component: SolutionRouter,
    maxSegments: 2,
    getMetadata: (slug: string, segments?: string[]) => {
      if (segments && segments.length === 2) {
        const product = getProductBySlug(segments[1])
        const solution = getSolutionBySlug(segments[0])
        if (!product || !solution) return undefined
        return {
          title: `${product.name} — ${solution.name} — Strategic Void Consulting`,
          description: product.tagline,
        }
      }
      const solution = getSolutionBySlug(slug)
      return solution
        ? {
            title: `${solution.name} — Strategic Void Consulting`,
            description: solution.tagline,
          }
        : undefined
    },
    isValidSlug: (slug: string, segments?: string[]) => {
      if (segments && segments.length === 2) {
        const solution = getSolutionBySlug(segments[0])
        const product = getProductBySlug(segments[1])
        return !!solution && !!product && product.solutionArea === segments[0]
      }
      return !!getSolutionBySlug(slug)
    },
  },
  "case-studies": {
    component: CaseStudyPage,
    getMetadata: (slug: string) => {
      const caseStudy = getCaseStudyBySlug(slug)
      return caseStudy
        ? {
            title: `${caseStudy.title} — Strategic Void Consulting`,
            description: caseStudy.summary,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getCaseStudyBySlug(slug),
  },
  "whitepapers": {
    component: WhitepaperPage,
    getMetadata: (slug: string) => {
      const whitepaper = getWhitepaperBySlug(slug)
      return whitepaper
        ? {
            title: `${whitepaper.title} — Strategic Void Consulting`,
            description: whitepaper.subtitle,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getWhitepaperBySlug(slug),
  },
}
