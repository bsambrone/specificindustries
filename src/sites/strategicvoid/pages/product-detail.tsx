"use client"

import Image from "next/image"
import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { getProductBySlug, getProductsBySolution } from "@/sites/strategicvoid/data/products"
import { getSolutionBySlug } from "@/sites/strategicvoid/data/solutions"
import { ProductCard } from "@/components/ui/product-card"

interface ProductDetailProps {
  solutionSlug: string
  productSlug: string
}

export default function ProductDetailPage({ solutionSlug, productSlug }: ProductDetailProps) {
  const siteHref = useSiteLink()
  const product = getProductBySlug(productSlug)
  const solution = getSolutionBySlug(solutionSlug)

  if (!product || !solution) return null

  const relatedProducts = getProductsBySolution(solutionSlug).filter(
    (p) => p.slug !== productSlug
  )

  return (
    <div>
      {/* Split Hero */}
      <section className="bg-secondary py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="relative aspect-square max-w-md mx-auto w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-3">
              <Link
                href={siteHref(`/solutions/${solutionSlug}`)}
                className="text-accent text-sm font-heading uppercase tracking-wider hover:opacity-80 transition-opacity"
              >
                {solution.name}
              </Link>
            </div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-foreground/70 mb-6 leading-relaxed">{product.tagline}</p>
            <div className="text-3xl font-heading font-bold text-accent mb-8">{product.price}</div>
            <Link
              href={siteHref("/contact")}
              className="inline-block bg-accent text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
            >
              Request a Demo
            </Link>
            {product.enterpriseTier && (
              <p className="mt-6 text-sm text-foreground/50 leading-relaxed">
                {product.enterpriseTier}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {product.description.map((paragraph, i) => (
            <p key={i} className="text-foreground/75 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Features & Specs */}
      {(product.features.length > 0 || product.specs.length > 0) && (
        <section className="py-16 px-6 bg-secondary/10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Features */}
            {product.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-6">Features</h2>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/75">
                      <span className="text-accent shrink-0 mt-0.5">✓</span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specs */}
            {product.specs.length > 0 && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                  Specifications
                </h2>
                <dl className="space-y-3">
                  {product.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex justify-between gap-4 py-2 border-b border-primary/10"
                    >
                      <dt className="text-foreground/50 text-sm">{spec.label}</dt>
                      <dd className="text-foreground/80 text-sm text-right font-medium">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-primary mb-10 text-center">
              More from {solution.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <ProductCard
                  key={related.slug}
                  slug={related.slug}
                  name={related.name}
                  price={related.price}
                  tagline={related.tagline}
                  image={related.image}
                  href={`/solutions/${solutionSlug}/${related.slug}`}
                  showAddToCart={false}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-secondary py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Ready to Deploy {product.name}?
          </h2>
          <p className="text-foreground/60 mb-8 leading-relaxed">
            Contact our team to discuss implementation, volume licensing, and the full range of
            Strategic Void solutions available for your organization.
          </p>
          <Link
            href={siteHref("/contact")}
            className="inline-block bg-accent text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Request a Demo
          </Link>
        </div>
      </section>
    </div>
  )
}
