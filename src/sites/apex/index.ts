import { config } from "./config"
import type { DynamicRoute, PageEntry } from "@/themes"
import ApexHome from "./pages/home"
import ApexAbout from "./pages/about"
import ApexPortfolio from "./pages/portfolio"
import ApexCareers from "./pages/careers"
import ApexCareersApplied from "./pages/careers-applied"
import ApexDisclaimer from "./pages/disclaimer"
import ApexPrivacy from "./pages/privacy"
import ApexTerms from "./pages/terms"
import LeaderDetailRoute, { apexLeaderSlugs } from "./pages/leader-detail"
import CareerDetailRoute, { careerSlugs } from "./pages/career-detail"
import { getApexLeaderBySlug } from "./data/leadership"
import { getJobBySlug } from "./data/careers"

export { config }

const validLeaderSlugs = new Set(apexLeaderSlugs())
const validCareerSlugs = new Set(careerSlugs())

export const dynamicRoutes: Record<string, DynamicRoute> = {
  "leadership": {
    component: LeaderDetailRoute,
    getMetadata: (slug: string) => {
      const leader = getApexLeaderBySlug(slug)
      if (!leader) return undefined
      return {
        title: `${leader.name} — ${leader.title} — Specific Industries`,
        description: leader.bio,
      }
    },
    isValidSlug: (slug: string) => validLeaderSlugs.has(slug),
  },
  "careers": {
    component: CareerDetailRoute,
    getMetadata: (slug: string) => {
      const job = getJobBySlug(slug)
      if (!job) return undefined
      return {
        title: `${job.title} — Careers — Specific Industries`,
        description: job.summary,
      }
    },
    isValidSlug: (slug: string) => validCareerSlugs.has(slug),
  },
}

export const pages: Record<string, PageEntry> = {
  "": ApexHome,
  "portfolio": {
    component: ApexPortfolio,
    metadata: {
      title: "Portfolio — Specific Industries",
      description: "Our portfolio of brands serving the world's most specific industries, organized across five strategic verticals.",
    },
  },
  "careers": {
    component: ApexCareers,
    metadata: {
      title: "Careers — Specific Industries",
      description: "Join a portfolio of brands serving markets that arguably should not exist. 25+ open positions across all five verticals.",
    },
  },
  "careers/applied": {
    component: ApexCareersApplied,
    metadata: {
      title: "Application Received — Specific Industries",
      description: "Thank you. Your application has been received.",
    },
  },
  "about": {
    component: ApexAbout,
    metadata: {
      title: "About — Specific Industries",
      description: "Learn about Specific Industries, our mission to serve overlooked markets, and the team behind our portfolio of brands.",
    },
  },
  "disclaimer": {
    component: ApexDisclaimer,
    metadata: {
      title: "Disclaimer — Specific Industries",
      description: "Important information about the satirical and entertainment nature of Specific Industries subsidiary brands.",
    },
  },
  "privacy": {
    component: ApexPrivacy,
    metadata: {
      title: "Privacy Policy — Specific Industries",
      description: "How Specific Industries collects, uses, and protects your information across all our properties.",
    },
  },
  "terms": {
    component: ApexTerms,
    metadata: {
      title: "Terms of Use — Specific Industries",
      description: "Terms of use governing all Specific Industries properties including subdomain sites.",
    },
  },
}
