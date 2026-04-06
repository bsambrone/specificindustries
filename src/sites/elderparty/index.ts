import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getCoalitionBySlug } from "./data/coalitions"
import { getArticleBySlug } from "./data/news"
import { getProductBySlug } from "./data/products"
import ElderPartyHome from "./pages/home"
import ElderPartyPlatform, { metadata as platformMetadata } from "./pages/platform"
import ElderPartyCoalitions, { metadata as coalitionsMetadata } from "./pages/coalitions"
import CoalitionDetail from "./pages/coalition-detail"
import ElderPartyNews, { metadata as newsMetadata } from "./pages/news"
import NewsDetail from "./pages/news-detail"
import ElderPartyEvents, { metadata as eventsMetadata } from "./pages/events"
import ElderPartyVolunteer, { metadata as volunteerMetadata } from "./pages/volunteer"
import ElderPartyDonate, { metadata as donateMetadata } from "./pages/donate"
import ElderPartyCandidate, { metadata as candidateMetadata } from "./pages/candidate"
import ElderPartyLeadership, { metadata as leadershipMetadata } from "./pages/leadership"
import ElderPartyAbout, { metadata as aboutMetadata } from "./pages/about"
import ElderPartyShop, { metadata as shopMetadata } from "./pages/shop"
import ProductDetail from "./pages/product-detail"
import ElderPartyCart from "./pages/cart"
import ElderPartyCheckout from "./pages/checkout"
import ElderPartyContact, { metadata as contactMetadata } from "./pages/contact"
import ElderPartyPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import ElderPartyTerms, { metadata as termsMetadata } from "./pages/terms"

export { config }

export const pages: Record<string, PageEntry> = {
  "": ElderPartyHome,
  "platform": { component: ElderPartyPlatform, metadata: platformMetadata },
  "coalitions": { component: ElderPartyCoalitions, metadata: coalitionsMetadata },
  "news": { component: ElderPartyNews, metadata: newsMetadata },
  "events": { component: ElderPartyEvents, metadata: eventsMetadata },
  "volunteer": { component: ElderPartyVolunteer, metadata: volunteerMetadata },
  "donate": { component: ElderPartyDonate, metadata: donateMetadata },
  "candidate": { component: ElderPartyCandidate, metadata: candidateMetadata },
  "leadership": { component: ElderPartyLeadership, metadata: leadershipMetadata },
  "about": { component: ElderPartyAbout, metadata: aboutMetadata },
  "shop": { component: ElderPartyShop, metadata: shopMetadata },
  "cart": ElderPartyCart,
  "checkout": ElderPartyCheckout,
  "contact": { component: ElderPartyContact, metadata: contactMetadata },
  "privacy": { component: ElderPartyPrivacy, metadata: privacyMetadata },
  "terms": { component: ElderPartyTerms, metadata: termsMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  coalitions: {
    component: CoalitionDetail,
    getMetadata: (slug: string) => {
      const coalition = getCoalitionBySlug(slug)
      return coalition
        ? { title: `${coalition.name} — The Elder Party`, description: coalition.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getCoalitionBySlug(slug),
  },
  news: {
    component: NewsDetail,
    getMetadata: (slug: string) => {
      const article = getArticleBySlug(slug)
      return article
        ? { title: `${article.headline} — The Elder Party`, description: article.summary }
        : undefined
    },
    isValidSlug: (slug: string) => !!getArticleBySlug(slug),
  },
  shop: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Elder Party Campaign Store`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
