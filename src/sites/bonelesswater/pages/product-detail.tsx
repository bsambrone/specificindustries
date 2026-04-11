import Image from "next/image"
import { notFound } from "next/navigation"
import { getProductBySlug } from "../data/products"
import { facts } from "../data/facts"
import { CertifiedBadge } from "../components/CertifiedBadge"
import { DidYouKnowCard } from "../components/DidYouKnowCard"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

interface ProductDetailProps {
  slug: string
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const product = getProductBySlug(slug)
  if (!product) notFound()

  // Pick a fact for this product page (rotates by slug character)
  const fact = facts[slug.charCodeAt(0) % facts.length]

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image gallery */}
          <div>
            <div className="relative aspect-square bg-white border border-[#0c4a6e]/20 rounded-lg overflow-hidden">
              <Image
                src={product.heroImage}
                alt={product.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                className="object-contain p-6"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="relative aspect-square bg-white border border-[#0c4a6e]/20 rounded overflow-hidden">
                <Image
                  src={product.detailImage}
                  alt={`${product.name} label detail`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square bg-white border border-[#0c4a6e]/20 rounded overflow-hidden">
                <Image
                  src={product.contextImage}
                  alt={`${product.name} in context`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product info */}
          <div>
            <CertifiedBadge size="sm" />
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#0c4a6e]">{product.name}</h1>
            <p className="mt-1 text-sm text-[#0f172a]/60">{product.format}</p>
            <p className="mt-4 text-lg italic text-[#0f172a]/80">{product.tagline}</p>

            <div className="mt-6 flex items-baseline gap-4">
              <div className="text-4xl font-extrabold text-[#0f172a]">{product.priceLabel}</div>
              <div className="text-sm font-bold text-[#dc2626]">{product.bonelessFreePercent} bone-free</div>
            </div>

            <div className="mt-6">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
              />
            </div>

            <div className="mt-8 space-y-4">
              {product.description.map((p, idx) => (
                <p key={idx} className="text-sm text-[#0f172a]/80 leading-relaxed">{p}</p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-[#0c4a6e]/20 rounded-lg p-4 bg-white">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#0c4a6e] mb-2">
                  What&apos;s Inside
                </div>
                <ul className="text-xs text-[#0f172a]/80 space-y-1">
                  {product.whatsInside.map((line, idx) => (
                    <li key={idx}>• {line}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-[#0c4a6e]/20 rounded-lg p-4 bg-white">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#dc2626] mb-2">
                  Certifications
                </div>
                <ul className="text-xs text-[#0f172a]/80 space-y-1">
                  {product.certifications.map((cert, idx) => (
                    <li key={idx}>✓ {cert}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Did You Know callout */}
        <div className="mt-12">
          <DidYouKnowCard fact={fact} />
        </div>
      </div>
    </section>
  )
}
