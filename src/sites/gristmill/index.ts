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
import { articleSchema, serviceSchema } from "@/lib/seo/schemas"

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
    breadcrumbSectionLabel: "Services",
    getBreadcrumbLabel: (slug: string, segments?: string[]) => {
      if (segments && segments.length === 2) {
        return getServiceBySlug(segments[1])?.name
      }
      return getArmBySlug(slug)?.name
    },
    getJsonLd: (slug: string, segments?: string[]) => {
      if (segments && segments.length === 2) {
        const service = getServiceBySlug(segments[1])
        if (!service) return undefined
        return serviceSchema(
          "gristmill",
          `services/${segments[0]}/${service.slug}`,
          {
            name: service.name,
            slug: service.slug,
            description: Array.isArray(service.description)
              ? service.description.join(" ")
              : service.shortDescription,
            image: service.image,
            serviceType: "Business Consulting",
            areaServed: "United States",
          },
          config
        )
      }
      const arm = getArmBySlug(slug)
      if (!arm) return undefined
      return serviceSchema(
        "gristmill",
        `services/${arm.slug}`,
        {
          name: arm.name,
          slug: arm.slug,
          description: Array.isArray(arm.overview)
            ? arm.overview.join(" ")
            : arm.tagline,
          image: arm.image,
          serviceType: "Business Consulting",
          areaServed: "United States",
        },
        config
      )
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
    getBreadcrumbLabel: (slug: string) => getCaseStudyBySlug(slug)?.company,
    breadcrumbSectionLabel: "Case Studies",
    getJsonLd: (slug: string) => {
      const cs = getCaseStudyBySlug(slug)
      if (!cs) return undefined
      return articleSchema(
        "gristmill",
        `case-studies/${cs.slug}`,
        {
          headline: cs.company,
          slug: cs.slug,
          description: cs.headline,
          keywords: [cs.company, cs.industry, cs.location, ...cs.engagedArms],
        },
        config,
        "Article"
      )
    },
  },
}
