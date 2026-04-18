import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import { getJournalEntryBySlug } from "./data/journal"
import MehHome from "./pages/home"
import MehProducts, { metadata as productsMetadata } from "./pages/products"
import ProductDetail from "./pages/product-detail"
import MehManifesto, { metadata as manifestoMetadata } from "./pages/manifesto"
import MehPress, { metadata as pressMetadata } from "./pages/press"
import MehJournal, { metadata as journalMetadata } from "./pages/journal"
import JournalEntryPage from "./pages/journal-entry"
import MehFaq, { metadata as faqMetadata } from "./pages/faq"
import MehAbout, { metadata as aboutMetadata } from "./pages/about"
import MehContact, { metadata as contactMetadata } from "./pages/contact"

export { config }

export const pages: Record<string, PageEntry> = {
  "": MehHome,
  "products": { component: MehProducts, metadata: productsMetadata },
  "manifesto": { component: MehManifesto, metadata: manifestoMetadata },
  "press": { component: MehPress, metadata: pressMetadata },
  "journal": { component: MehJournal, metadata: journalMetadata },
  "faq": { component: MehFaq, metadata: faqMetadata },
  "about": { component: MehAbout, metadata: aboutMetadata },
  "contact": { component: MehContact, metadata: contactMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  products: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const p = getProductBySlug(slug)
      return p
        ? { title: `${p.name} — Meh.`, description: p.tagline, ogImage: p.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
  journal: {
    component: JournalEntryPage,
    getMetadata: (slug: string) => {
      const e = getJournalEntryBySlug(slug)
      return e ? { title: `${e.title} — Meh. Journal`, description: e.excerpt } : undefined
    },
    isValidSlug: (slug: string) => !!getJournalEntryBySlug(slug),
  },
}
