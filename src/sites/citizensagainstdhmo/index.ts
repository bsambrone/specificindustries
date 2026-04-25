import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import CitizensAgainstDhmoHome from "./pages/home"
import ThreatsIndexPage, { metadata as threatsMetadata } from "./pages/threats"
import ThreatDetailPage from "./pages/threat-detail"
import StoriesIndexPage, { metadata as storiesMetadata } from "./pages/stories"
import StoryDetailPage from "./pages/story-detail"
import SourcesIndexPage, { metadata as sourcesMetadata } from "./pages/sources"
import SourceDetailPage from "./pages/source-detail"
import TakeActionPage, { metadata as takeActionMetadata } from "./pages/take-action"
import ImpactPage, { metadata as impactMetadata } from "./pages/impact"
import LeadershipPage, { metadata as leadershipMetadata } from "./pages/leadership"
import AboutPage, { metadata as aboutMetadata } from "./pages/about"
import ContactPage, { metadata as contactMetadata } from "./pages/contact"
import PrivacyPage, { metadata as privacyMetadata } from "./pages/privacy"
import TermsPage, { metadata as termsMetadata } from "./pages/terms"
import { getThreatBySlug } from "./data/threats"
import { getStoryBySlug } from "./data/stories"
import { getSourceBySlug } from "./data/sources"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CitizensAgainstDhmoHome,
  "threats": { component: ThreatsIndexPage, metadata: threatsMetadata },
  "stories": { component: StoriesIndexPage, metadata: storiesMetadata },
  "sources": { component: SourcesIndexPage, metadata: sourcesMetadata },
  "take-action": { component: TakeActionPage, metadata: takeActionMetadata },
  "impact": { component: ImpactPage, metadata: impactMetadata },
  "leadership": { component: LeadershipPage, metadata: leadershipMetadata },
  "about": { component: AboutPage, metadata: aboutMetadata },
  "contact": { component: ContactPage, metadata: contactMetadata },
  "privacy": { component: PrivacyPage, metadata: privacyMetadata },
  "terms": { component: TermsPage, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  threats: {
    component: ThreatDetailPage,
    getMetadata: (slug: string) => {
      const threat = getThreatBySlug(slug)
      return threat
        ? { title: `${threat.name} — Citizens Against DHMO`, description: threat.tagline, ogImage: threat.heroImage }
        : undefined
    },
    isValidSlug: (slug: string) => !!getThreatBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getThreatBySlug(slug)?.name,
    breadcrumbSectionLabel: "The Threats",
  },
  stories: {
    component: StoryDetailPage,
    getMetadata: (slug: string) => {
      const story = getStoryBySlug(slug)
      return story
        ? { title: `${story.name} — Survivor Story — Citizens Against DHMO`, description: story.pullQuote, ogImage: story.portrait }
        : undefined
    },
    isValidSlug: (slug: string) => !!getStoryBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getStoryBySlug(slug)?.name,
    breadcrumbSectionLabel: "Stories",
  },
  sources: {
    component: SourceDetailPage,
    getMetadata: (slug: string) => {
      const source = getSourceBySlug(slug)
      return source
        ? { title: `${source.name} — Where It Hides — Citizens Against DHMO`, description: source.tagline, ogImage: source.heroImage }
        : undefined
    },
    isValidSlug: (slug: string) => !!getSourceBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getSourceBySlug(slug)?.name,
    breadcrumbSectionLabel: "Where It Hides",
  },
}
