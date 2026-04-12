import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { products } from "../data/products"
import { CertifiedBadge } from "../components/CertifiedBadge"

export const metadata = {
  title: "Products — Boneless Water",
  description: "Our complete catalog of pharmaceutical-grade bone-free drinking water. Eight products, all independently verified.",
}

export default async function BonelessWaterProducts() {
  const siteHref = await getSiteHref()
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="ALL PRODUCTS INDEPENDENTLY VERIFIED" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">Our Products</h1>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            Eight clinical-grade hydration solutions, each processed through our proprietary 47-step deboning method and verified to a minimum of 99.9999% bone-free at point of bottling.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={siteHref(`/products/${product.slug}`)}
              className="group block border border-[#0c4a6e]/20 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
            >
              <div className="relative aspect-square bg-white">
                <Image
                  src={product.heroImage}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-4"
                />
              </div>
              <div className="p-4 border-t border-[#0c4a6e]/10">
                <div className="font-bold text-[#0c4a6e] group-hover:text-[#075985] text-base">{product.name}</div>
                <div className="text-xs text-[#0f172a]/60 mt-1">{product.format}</div>
                <p className="text-xs text-[#0f172a]/70 mt-2 line-clamp-2">{product.tagline}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-lg font-extrabold text-[#0f172a]">{product.priceLabel}</div>
                  <div className="text-[10px] font-bold text-[#dc2626]">{product.bonelessFreePercent}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
