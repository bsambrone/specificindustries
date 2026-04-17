import type { PageEntry, DynamicRoute } from "@/themes"
import { config } from "./config"
import { getProductBySlug } from "./data/products"
import CarterAndFilsHome from "./pages/home"
import CarterAndFilsCellar, { metadata as cellarMetadata } from "./pages/cellar"
import OurStory, { metadata as ourStoryMetadata } from "./pages/our-story"
import Family, { metadata as familyMetadata } from "./pages/family"
import ProductDetail from "./pages/product-detail"
import WineClub, { metadata as wineClubMetadata } from "./pages/wine-club"
import Visit, { metadata as visitMetadata } from "./pages/visit"

export { config }

export const pages: Record<string, PageEntry> = {
  "": CarterAndFilsHome,
  "cellar": { component: CarterAndFilsCellar, metadata: cellarMetadata },
  "our-story": { component: OurStory, metadata: ourStoryMetadata },
  "family": { component: Family, metadata: familyMetadata },
  "wine-club": { component: WineClub, metadata: wineClubMetadata },
  "visit": { component: Visit, metadata: visitMetadata },
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  cellar: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Domaine Carter & Fils`, description: product.tagline, ogImage: product.image }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
