import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSiteHref } from "@/lib/site-href"
import { getProductBySlug } from "../data/products"
import { getTestimonialsForProduct } from "../data/testimonials"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

interface ProductDetailProps {
  slug: string
}

export default async function ProductDetail({ slug }: ProductDetailProps) {
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const siteHref = await getSiteHref()
  const testimonials = getTestimonialsForProduct(product.slug)

  return (
    <section className="bg-[#FFFDF8]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-[#2D2D2D]/50">
          <Link href={siteHref("/shop")} className="hover:text-[#7C9A82] underline underline-offset-2">Shop</Link>
          <span className="mx-2">→</span>
          <span className="text-[#2D2D2D]/70">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Hero image */}
          <div className="relative aspect-square bg-white border border-[#7C9A82]/15 rounded-2xl overflow-hidden">
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
            <p className="text-sm font-semibold tracking-widest uppercase text-[#D4A0A0]">
              Curated Gift Box
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#2D2D2D] font-heading">{product.name}</h1>
            <p className="mt-4 text-lg italic text-[#2D2D2D]/80">{product.tagline}</p>

            <div className="mt-6 text-4xl font-bold text-[#2D2D2D]">{product.priceLabel}</div>

            <div className="mt-6">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                className="px-8 py-3 bg-[#7C9A82] hover:bg-[#6B8972] text-white font-bold rounded-lg text-lg transition-colors"
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

            <p className="mt-8 text-[#2D2D2D]/80 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* What's Inside */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#7C9A82] font-heading mb-8 text-center">What&apos;s Inside</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {product.items.map((item) => (
              <div key={item.name} className="bg-white border border-[#7C9A82]/15 rounded-xl overflow-hidden flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-40 aspect-square sm:aspect-auto flex-shrink-0 bg-[#F5F0E8]/30">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 640px) 160px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="font-bold text-[#2D2D2D] font-heading">{item.name}</div>
                  <p className="mt-1 text-sm text-[#2D2D2D]/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#7C9A82] font-heading mb-8 text-center">What Recipients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div key={t.name + t.quote.slice(0, 20)} className="bg-white border border-[#7C9A82]/15 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#F5F0E8]">
                      <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#2D2D2D]">{t.name}</div>
                      <div className="text-xs text-[#2D2D2D]/60">{t.title}</div>
                    </div>
                  </div>
                  <p className="text-sm text-[#2D2D2D]/80 italic">&ldquo;{t.quote}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to shop CTA */}
        <div className="mt-16 text-center">
          <Link
            href={siteHref("/shop")}
            className="text-[#7C9A82] font-bold underline underline-offset-4 hover:text-[#6B8972]"
          >
            ← Browse all occasions
          </Link>
        </div>
      </div>
    </section>
  )
}
