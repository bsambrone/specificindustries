import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import { getJournalEntryBySlug } from "./data/journal"
import { articleSchema, productSchema } from "@/lib/seo/schemas"
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
import MehPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import MehTerms, { metadata as termsMetadata } from "./pages/terms"
import MehCart from "./pages/cart"
import MehCheckout from "./pages/checkout"

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
  "privacy": { component: MehPrivacy, metadata: privacyMetadata },
  "terms": { component: MehTerms, metadata: termsMetadata },
  "cart": MehCart,
  "checkout": MehCheckout,
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
    getBreadcrumbLabel: (slug: string) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Products",
    getJsonLd: (slug: string) => {
      const p = getProductBySlug(slug)
      if (!p) return undefined
      return productSchema(
        "meh",
        `products/${p.slug}`,
        {
          name: p.name,
          slug: p.slug,
          description: p.longDescription.join(" "),
          tagline: p.tagline,
          image: p.image,
          price: p.price,
          category: p.category,
        },
        config.name
      )
    },
  },
  journal: {
    component: JournalEntryPage,
    getMetadata: (slug: string) => {
      const e = getJournalEntryBySlug(slug)
      return e ? { title: `${e.title} — Meh. Journal`, description: e.excerpt } : undefined
    },
    isValidSlug: (slug: string) => !!getJournalEntryBySlug(slug),
    getBreadcrumbLabel: (slug: string) => getJournalEntryBySlug(slug)?.title,
    breadcrumbSectionLabel: "Journal",
    getJsonLd: (slug: string) => {
      const e = getJournalEntryBySlug(slug)
      if (!e) return undefined
      return articleSchema(
        "meh",
        `journal/${e.slug}`,
        {
          headline: e.title,
          slug: e.slug,
          description: e.excerpt,
          datePublished: e.publishedDate,
          author: e.author,
        },
        config,
        "BlogPosting"
      )
    },
  },
}
