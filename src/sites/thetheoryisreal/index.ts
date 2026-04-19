// src/sites/thetheoryisreal/index.ts
import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import Home from "./pages/home"
import Theories, { metadata as theoriesMeta } from "./pages/theories"
import TheoryDetail from "./pages/theory-detail"
import CategoryPage from "./pages/category"
import ForumIndex, { metadata as forumMeta } from "./pages/forum"
import ForumDynamic from "./pages/forum-dynamic"
import Evidence, { metadata as evidenceMeta } from "./pages/evidence"
import Shop, { metadata as shopMeta } from "./pages/shop"
import ProductDetail from "./pages/product-detail"
import Library, { metadata as libraryMeta } from "./pages/library"
import About, { metadata as aboutMeta } from "./pages/about"
import Contact, { metadata as contactMeta } from "./pages/contact"
import Privacy, { metadata as privacyMeta } from "./pages/privacy"
import Terms, { metadata as termsMeta } from "./pages/terms"
import Cart from "./pages/cart"
import Checkout from "./pages/checkout"
import { getTheoryBySlug, getCategoryByKey } from "./data/theories"
import { getProductBySlug } from "./data/products"
import { getBoardByKey } from "./data/forum-users"
import { getThreadBySlug } from "./data/forum"
import type { BoardKey, CategoryKey } from "./types"

export { config }

export const pages: Record<string, PageEntry> = {
  "": Home,
  "theories": { component: Theories, metadata: theoriesMeta },
  "forum": { component: ForumIndex, metadata: forumMeta },
  "evidence": { component: Evidence, metadata: evidenceMeta },
  "shop": { component: Shop, metadata: shopMeta },
  "library": { component: Library, metadata: libraryMeta },
  "about": { component: About, metadata: aboutMeta },
  "contact": { component: Contact, metadata: contactMeta },
  "privacy": { component: Privacy, metadata: privacyMeta },
  "terms": { component: Terms, metadata: termsMeta },
  "cart": Cart,
  "checkout": Checkout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  theories: {
    component: TheoryDetail,
    getMetadata: (slug) => {
      const t = getTheoryBySlug(slug)
      return t ? { title: `${t.title} — The Theory Is Real`, description: t.dek, ogImage: t.image } : undefined
    },
    isValidSlug: (slug) => !!getTheoryBySlug(slug),
    getBreadcrumbLabel: (slug) => getTheoryBySlug(slug)?.title,
    breadcrumbSectionLabel: "Theories",
  },
  category: {
    component: CategoryPage,
    getMetadata: (slug) => {
      const c = getCategoryByKey(slug as CategoryKey)
      return c ? { title: `${c.title} — The Theory Is Real`, description: c.tagline, ogImage: c.image } : undefined
    },
    isValidSlug: (slug) => !!getCategoryByKey(slug as CategoryKey),
    getBreadcrumbLabel: (slug) => getCategoryByKey(slug as CategoryKey)?.title,
    breadcrumbSectionLabel: "Categories",
  },
  products: {
    component: ProductDetail,
    getMetadata: (slug) => {
      const p = getProductBySlug(slug)
      return p ? { title: `${p.name} — The Theory Is Real`, description: p.tagline, ogImage: p.image } : undefined
    },
    isValidSlug: (slug) => !!getProductBySlug(slug),
    getBreadcrumbLabel: (slug) => getProductBySlug(slug)?.name,
    breadcrumbSectionLabel: "Shop",
  },
  forum: {
    component: ForumDynamic,
    maxSegments: 2,
    isValidSlug: (slug, segments) => {
      const board = getBoardByKey(slug)
      if (!board) return false
      if (segments && segments.length === 2) {
        return !!getThreadBySlug(board.key as BoardKey, segments[1])
      }
      return true
    },
    getMetadata: (slug, segments) => {
      const board = getBoardByKey(slug)
      if (!board) return undefined
      if (segments && segments.length === 2) {
        const t = getThreadBySlug(board.key as BoardKey, segments[1])
        return t ? { title: `${t.title} — ${board.title} — The Theory Is Real`, description: t.op.body.slice(0, 160) } : undefined
      }
      return { title: `${board.title} — The Theory Is Real`, description: board.tagline }
    },
    getBreadcrumbLabel: (slug, segments) => {
      if (segments && segments.length === 2) {
        const board = getBoardByKey(slug)
        if (!board) return undefined
        return getThreadBySlug(board.key as BoardKey, segments[1])?.title
      }
      return getBoardByKey(slug)?.title
    },
    breadcrumbSectionLabel: "Forum",
  },
}
