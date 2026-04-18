import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import StrategicVoidHome from "./pages/home"
import SolutionsIndex, { metadata as solutionsMetadata } from "./pages/solutions-index"
import CaseStudiesIndex, { metadata as caseStudiesMetadata } from "./pages/case-studies-index"
import WhitepapersIndex, { metadata as whitepapersMetadata } from "./pages/whitepapers-index"
import LeadershipPage, { metadata as leadershipMetadata } from "./pages/leadership"
import ContactPage, { metadata as contactMetadata } from "./pages/contact"
import PrivacyPage, { metadata as privacyMetadata } from "./pages/privacy"
import TermsPage, { metadata as termsMetadata } from "./pages/terms"
import MethodologyPage, { metadata as methodologyMetadata } from "./pages/methodology"
import PricingPage, { metadata as pricingMetadata } from "./pages/pricing"
import AboutPage, { metadata as aboutMetadata } from "./pages/about"
import SolutionRouter from "./pages/solution-router"
import CaseStudyPage from "./pages/case-study-page"
import WhitepaperPage from "./pages/whitepaper-page"
import { getSolutionBySlug } from "./data/solutions"
import { getProductBySlug } from "./data/products"
import { getCaseStudyBySlug } from "./data/case-studies"
import { getWhitepaperBySlug } from "./data/whitepapers"
import { articleSchema, productSchema, serviceSchema } from "@/lib/seo/schemas"

export { config }

export const pages: Record<string, PageEntry> = {
  "": StrategicVoidHome,
  "solutions": { component: SolutionsIndex, metadata: solutionsMetadata },
  "case-studies": { component: CaseStudiesIndex, metadata: caseStudiesMetadata },
  "whitepapers": { component: WhitepapersIndex, metadata: whitepapersMetadata },
  "methodology": { component: MethodologyPage, metadata: methodologyMetadata },
  "pricing": { component: PricingPage, metadata: pricingMetadata },
  "about": { component: AboutPage, metadata: aboutMetadata },
  "leadership": { component: LeadershipPage, metadata: leadershipMetadata },
  "contact": { component: ContactPage, metadata: contactMetadata },
  "privacy": { component: PrivacyPage, metadata: privacyMetadata },
  "terms": { component: TermsPage, metadata: termsMetadata },
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
          ogImage: product.image,
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
    breadcrumbSectionLabel: "Solutions",
    getBreadcrumbLabel: (slug: string, segments?: string[]) => {
      if (segments && segments.length === 2) {
        return getProductBySlug(segments[1])?.name
      }
      return getSolutionBySlug(slug)?.name
    },
    getJsonLd: (slug: string, segments?: string[]) => {
      if (segments && segments.length === 2) {
        const product = getProductBySlug(segments[1])
        if (!product) return undefined
        return productSchema(
          "strategicvoid",
          `solutions/${segments[0]}/${product.slug}`,
          {
            name: product.name,
            slug: product.slug,
            description: Array.isArray(product.description)
              ? product.description.join(" ")
              : product.description,
            tagline: product.tagline,
            image: product.image,
            price: product.price,
            category: product.solutionArea,
          },
          config.name
        )
      }
      const solution = getSolutionBySlug(slug)
      if (!solution) return undefined
      return serviceSchema(
        "strategicvoid",
        `solutions/${solution.slug}`,
        {
          name: solution.name,
          slug: solution.slug,
          description: Array.isArray(solution.description)
            ? solution.description.join(" ")
            : solution.tagline,
          serviceType: "Business Consulting",
          areaServed: "Global",
        },
        config
      )
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
    getBreadcrumbLabel: (slug: string) => getCaseStudyBySlug(slug)?.title,
    breadcrumbSectionLabel: "Case Studies",
    getJsonLd: (slug: string) => {
      const cs = getCaseStudyBySlug(slug)
      if (!cs) return undefined
      return articleSchema(
        "strategicvoid",
        `case-studies/${cs.slug}`,
        {
          headline: cs.title,
          slug: cs.slug,
          description: cs.summary,
          section: cs.solutionArea,
          keywords: [cs.company, cs.industry, cs.solutionArea],
        },
        config,
        "Article"
      )
    },
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
    getBreadcrumbLabel: (slug: string) => getWhitepaperBySlug(slug)?.title,
    breadcrumbSectionLabel: "Whitepapers",
    getJsonLd: (slug: string) => {
      const wp = getWhitepaperBySlug(slug)
      if (!wp) return undefined
      return articleSchema(
        "strategicvoid",
        `whitepapers/${wp.slug}`,
        {
          headline: wp.title,
          slug: wp.slug,
          description: wp.subtitle,
          author: wp.authors,
          section: wp.solutionArea,
        },
        config,
        "Article"
      )
    },
  },
}
