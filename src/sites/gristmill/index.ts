import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import GristmillHome from "./pages/home"
import ServicesIndex, { metadata as servicesMetadata } from "./pages/services-index"
import AboutPage, { metadata as aboutMetadata } from "./pages/about"
import ContactPage, { metadata as contactMetadata } from "./pages/contact"
import PrivacyPage, { metadata as privacyMetadata } from "./pages/privacy"
import TermsPage, { metadata as termsMetadata } from "./pages/terms"
import CaseStudiesIndex, { metadata as caseStudiesMetadata } from "./pages/case-studies-index"
import CaseStudyPage from "./pages/case-study-page"
import ServiceRouter from "./pages/service-router"
import { getArmBySlug } from "./data/arms"
import { getServiceBySlug } from "./data/services"
import { getCaseStudyBySlug } from "./data/case-studies"

export { config }

export const pages: Record<string, PageEntry> = {
  "": GristmillHome,
  "services": { component: ServicesIndex, metadata: servicesMetadata },
  "about": { component: AboutPage, metadata: aboutMetadata },
  "contact": { component: ContactPage, metadata: contactMetadata },
  "privacy": { component: PrivacyPage, metadata: privacyMetadata },
  "terms": { component: TermsPage, metadata: termsMetadata },
  "case-studies": { component: CaseStudiesIndex, metadata: caseStudiesMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  "services": {
    component: ServiceRouter,
    maxSegments: 2,
    getMetadata: (slug: string, segments?: string[]) => {
      if (segments && segments.length === 2) {
        const arm = getArmBySlug(segments[0])
        const service = getServiceBySlug(segments[1])
        if (!arm || !service || service.armSlug !== segments[0]) return undefined
        return {
          title: `${service.name} — ${arm.name} — Gristmill Partners`,
          description: service.tagline,
          ogImage: service.image,
        }
      }
      const arm = getArmBySlug(slug)
      return arm
        ? {
            title: `${arm.name} — Gristmill Partners`,
            description: arm.tagline,
            ogImage: arm.image,
          }
        : undefined
    },
    isValidSlug: (slug: string, segments?: string[]) => {
      if (segments && segments.length === 2) {
        const arm = getArmBySlug(segments[0])
        const service = getServiceBySlug(segments[1])
        return !!arm && !!service && service.armSlug === segments[0]
      }
      return !!getArmBySlug(slug)
    },
  },
  "case-studies": {
    component: CaseStudyPage,
    getMetadata: (slug: string) => {
      const cs = getCaseStudyBySlug(slug)
      return cs
        ? {
            title: `${cs.company} — Case Study — Gristmill Partners`,
            description: cs.headline,
          }
        : undefined
    },
    isValidSlug: (slug: string) => !!getCaseStudyBySlug(slug),
  },
}
