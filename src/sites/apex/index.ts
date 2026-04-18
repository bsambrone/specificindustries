import { config } from "./config"
import type { DynamicRoute, PageEntry } from "@/themes"
import ApexHome from "./pages/home"
import ApexAbout from "./pages/about"
import ApexPortfolio from "./pages/portfolio"
import ApexCareers from "./pages/careers"
import ApexCareersApplied from "./pages/careers-applied"
import ApexNewsroom from "./pages/newsroom"
import ApexThesis from "./pages/thesis"
import ApexPartnerships from "./pages/partnerships"
import PartnershipsReceived from "./pages/partnerships-received"
import ApexDisclaimer from "./pages/disclaimer"
import ApexPrivacy from "./pages/privacy"
import ApexTerms from "./pages/terms"
import LeaderDetailRoute, { apexLeaderSlugs } from "./pages/leader-detail"
import CareerDetailRoute, { careerSlugs } from "./pages/career-detail"
import PressReleaseDetailRoute from "./pages/press-release-detail"
import { getApexLeaderBySlug } from "./data/leadership"
import { getJobBySlug } from "./data/careers"
import { getPressReleaseBySlug, pressReleaseSlugs } from "./data/press-releases"
import {
  articleSchema,
  jobPostingSchema,
  personSchema,
} from "@/lib/seo/schemas"

const SALARY_RE = /\$(\d[\d,]*)\s*(?:[–-])\s*\$?(\d[\d,]*)/
function parseSalary(summary: string): { min?: number; max?: number } | undefined {
  const m = summary.match(SALARY_RE)
  if (!m) return undefined
  const toNum = (s: string) => Number(s.replace(/,/g, ""))
  return { min: toNum(m[1]), max: toNum(m[2]) }
}

export { config }

const validLeaderSlugs = new Set(apexLeaderSlugs())
const validCareerSlugs = new Set(careerSlugs())
const validPressSlugs = new Set(pressReleaseSlugs())

export const dynamicRoutes: Record<string, DynamicRoute> = {
  "leadership": {
    component: LeaderDetailRoute,
    getMetadata: (slug: string) => {
      const leader = getApexLeaderBySlug(slug)
      if (!leader) return undefined
      return {
        title: `${leader.name} — ${leader.title} — Specific Industries`,
        description: leader.bio,
        ogImage: leader.portraitImage,
      }
    },
    isValidSlug: (slug: string) => validLeaderSlugs.has(slug),
    getBreadcrumbLabel: (slug: string) => getApexLeaderBySlug(slug)?.name,
    breadcrumbSectionLabel: "Leadership",
    getJsonLd: (slug: string) => {
      const leader = getApexLeaderBySlug(slug)
      if (!leader) return undefined
      return personSchema(
        "apex",
        `leadership/${leader.slug}`,
        {
          name: leader.name,
          slug: leader.slug,
          title: leader.title,
          bio: leader.bio,
          image: leader.portraitImage,
        },
        config
      )
    },
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
    getBreadcrumbLabel: (slug: string) => getJobBySlug(slug)?.title,
    breadcrumbSectionLabel: "Careers",
    getJsonLd: (slug: string) => {
      const job = getJobBySlug(slug)
      if (!job) return undefined
      const salary = parseSalary(job.compensation.summary)
      const descParts = [
        ...job.about,
        "Responsibilities:",
        ...job.responsibilities.map((r) => `• ${r}`),
        "Qualifications:",
        ...job.qualifications.map((q) => `• ${q}`),
      ]
      const remote = /remote/i.test(job.location)
      return jobPostingSchema(
        "apex",
        `careers/${job.slug}`,
        {
          title: job.title,
          slug: job.slug,
          description: descParts.join("\n"),
          employmentType: job.employmentType.toUpperCase().includes("PART")
            ? "PART_TIME"
            : "FULL_TIME",
          location: { remote, country: "US" },
          baseSalary: salary
            ? { min: salary.min, max: salary.max, currency: "USD", unit: "YEAR" }
            : undefined,
        },
        config
      )
    },
  },
  "newsroom": {
    component: PressReleaseDetailRoute,
    getMetadata: (slug: string) => {
      const release = getPressReleaseBySlug(slug)
      if (!release) return undefined
      return {
        title: `${release.headline} — Specific Industries`,
        description: release.lede,
      }
    },
    isValidSlug: (slug: string) => validPressSlugs.has(slug),
    getBreadcrumbLabel: (slug: string) => getPressReleaseBySlug(slug)?.headline,
    breadcrumbSectionLabel: "Newsroom",
    getJsonLd: (slug: string) => {
      const release = getPressReleaseBySlug(slug)
      if (!release) return undefined
      return articleSchema(
        "apex",
        `newsroom/${release.slug}`,
        {
          headline: release.headline,
          slug: release.slug,
          description: release.subhead ?? release.lede,
          datePublished: release.dateIso,
          author: "Specific Industries",
          section: "Press Releases",
        },
        config,
        "NewsArticle"
      )
    },
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
  "newsroom": {
    component: ApexNewsroom,
    metadata: {
      title: "Newsroom — Specific Industries",
      description: "The latest press releases from Specific Industries and its portfolio companies.",
    },
  },
  "thesis": {
    component: ApexThesis,
    metadata: {
      title: "Investment Thesis — Specific Industries",
      description: "The investment thesis behind the Specific Industries portfolio. The SPECIFIC Evaluation Framework, our criteria, and our track record.",
    },
  },
  "partnerships": {
    component: ApexPartnerships,
    metadata: {
      title: "Strategic Acquisitions & Partnerships — Specific Industries",
      description: "Submit your industry for evaluation. Specific Industries acquires overlooked markets with fewer than 11,000 participants.",
    },
  },
  "partnerships/received": {
    component: PartnershipsReceived,
    metadata: {
      title: "Submission Received — Specific Industries",
      description: "Your industry submission has been received.",
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
