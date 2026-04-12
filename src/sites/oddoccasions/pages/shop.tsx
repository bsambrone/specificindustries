import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { products, categories, getProductsByCategory } from "../data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

export const metadata = {
  title: "Shop — Odd Occasions",
  description: "Browse all 30 curated gift boxes for life's most specific moments. Workplace, social, digital, family, and milestone occasions.",
}

export default async function OddOccasionsShop() {
  const siteHref = await getSiteHref()

  return (
    <section className="bg-[#FFFDF8]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#D4A0A0]">
            Curated with care
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#2D2D2D] font-heading">
            All Occasions
          </h1>
          <p className="mt-3 text-[#2D2D2D]/70 max-w-2xl mx-auto">
            {products.length} gift boxes for moments that deserve more than a text message.
          </p>
        </div>

        {/* Category nav */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <a
              key={cat.key}
              href={`#${cat.anchor}`}
              className="px-4 py-2 text-sm font-semibold rounded-full border border-[#7C9A82]/20 text-[#7C9A82] hover:bg-[#7C9A82] hover:text-white transition-colors"
            >
              {cat.label}
            </a>
          ))}
        </div>

        {/* Product grid by category */}
        {categories.map((cat) => {
          const catProducts = getProductsByCategory(cat.key)
          return (
            <div key={cat.key} id={cat.anchor} className="mt-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#7C9A82] font-heading mb-6">{cat.label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catProducts.map((product) => (
                  <div
                    key={product.slug}
                    className="bg-white border border-[#7C9A82]/15 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                  >
                    <Link href={siteHref(`/shop/${product.slug}`)}>
                      <div className="relative aspect-square bg-[#F5F0E8]/30">
                        <Image
                          src={product.heroImage}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      <Link href={siteHref(`/shop/${product.slug}`)}>
                        <div className="font-bold text-[#2D2D2D] hover:text-[#7C9A82] font-heading">{product.name}</div>
                      </Link>
                      <p className="text-sm text-[#2D2D2D]/60 mt-1 line-clamp-2 flex-1">{product.tagline}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-lg font-bold text-[#2D2D2D]">{product.priceLabel}</div>
                        <AddToCartButton
                          slug={product.slug}
                          productName={product.name}
                          className="px-4 py-2 bg-[#7C9A82] hover:bg-[#6B8972] text-white text-sm font-semibold rounded-lg transition-colors"
                          quips={[
                            "Thoughtful choice.",
                            "They're going to love this.",
                            "Consider it curated.",
                            "Added with care.",
                            "A gesture worth making.",
                            "Box secured.",
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
