// src/sites/pettential/pages/product-detail.tsx
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSiteHref } from "@/lib/site-href"
import { getProductBySlug, getProductsByDivision, getDivisionInfo } from "../data/products"
import { getAnimalTestimonialForProduct, getHumanTestimonialForProduct } from "../data/testimonials"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

interface ProductDetailProps {
  slug: string
}

export default async function ProductDetail({ slug }: ProductDetailProps) {
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const siteHref = await getSiteHref()
  const divisionInfo = getDivisionInfo(product.division)
  const animalTestimonial = getAnimalTestimonialForProduct(product.slug)
  const humanTestimonial = getHumanTestimonialForProduct(product.slug)
  const relatedProducts = getProductsByDivision(product.division)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3)

  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-[#111]/50">
          <Link href={siteHref("/shop")} className="hover:text-[#FF3366] underline underline-offset-2">Shop</Link>
          <span className="mx-2">→</span>
          <span className="text-[#111]/70">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Hero image */}
          <div className="relative aspect-square bg-white border border-[#111]/10 rounded-2xl overflow-hidden">
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>

          {/* Product info */}
          <div>
            {divisionInfo && (
              <span
                className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-[#111]"
                style={{ backgroundColor: divisionInfo.color }}
              >
                {divisionInfo.emoji} {divisionInfo.label}
              </span>
            )}
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#111] font-heading">{product.name}</h1>
            <p className="mt-4 text-lg italic text-[#111]/80">{product.tagline}</p>

            <div className="mt-6 text-4xl font-bold text-[#111]">{product.priceLabel}</div>

            <div className="mt-6">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                className="px-8 py-3 bg-[#CCFF00] hover:bg-[#b8e600] text-[#111] font-bold rounded-lg text-lg transition-colors"
                quips={[
                  "Added. They won't notice.",
                  "Performance incoming.",
                  "Your pet's potential awaits.",
                  "Bold move.",
                  "Stagnation: defeated.",
                ]}
              />
            </div>

            <p className="mt-8 text-[#111]/80 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#111] font-heading mb-6 text-center">Specifications</h2>
          <div className="max-w-lg mx-auto bg-white border border-[#111]/10 rounded-xl overflow-hidden">
            {product.specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex justify-between px-6 py-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}
              >
                <span className="text-[#111]/60">{spec.label}</span>
                <span className="text-[#111] font-medium text-right ml-4">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {(animalTestimonial || humanTestimonial) && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#111] font-heading mb-6 text-center">Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {animalTestimonial && (
                <div className="bg-[#1A1A1A] text-white rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10">
                      <Image src={animalTestimonial.image} alt={animalTestimonial.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#CCFF00]">{animalTestimonial.name}</div>
                      <div className="text-xs text-white/50">{animalTestimonial.species}</div>
                    </div>
                  </div>
                  <p className="text-sm text-white/80 italic">&ldquo;{animalTestimonial.quote}&rdquo;</p>
                </div>
              )}
              {humanTestimonial && (
                <div className="bg-white border border-[#111]/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#FAFAFA]">
                      <Image src={humanTestimonial.image} alt={humanTestimonial.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#111]">{humanTestimonial.name}</div>
                      <div className="text-xs text-[#111]/50">{humanTestimonial.title}</div>
                    </div>
                  </div>
                  <p className="text-sm text-[#111]/80 italic">&ldquo;{humanTestimonial.quote}&rdquo;</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#111] font-heading mb-6 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={siteHref(`/shop/${rp.slug}`)}
                  className="group bg-white border border-[#111]/10 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square bg-[#1A1A1A]/5">
                    <Image src={rp.heroImage} alt={rp.name} fill sizes="33vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-sm text-[#111] group-hover:text-[#FF3366] font-heading">{rp.name}</div>
                    <div className="text-sm font-bold text-[#111] mt-1">{rp.priceLabel}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to shop */}
        <div className="mt-16 text-center">
          <Link
            href={siteHref("/shop")}
            className="text-[#FF3366] font-bold underline underline-offset-4 hover:text-[#e6205c]"
          >
            ← Browse all products
          </Link>
        </div>
      </div>
    </section>
  )
}
