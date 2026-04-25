import Image from "next/image"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { getProductBySlug } from "@/sites/boomfun/data/products"

interface ProductDetailProps {
  slug: string
}

export default function BoomfunProductDetail({ slug }: ProductDetailProps) {
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative aspect-square border-4 border-primary/20 bg-secondary/10 rounded-sm overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
            {product.badge && (
              <div className="absolute top-4 right-4 bg-secondary text-background font-heading px-4 py-2 uppercase tracking-widest text-sm transform rotate-[-6deg] shadow-lg">
                {product.badge}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-foreground/60 mb-1">
              Item №{product.itemNumber}  ·  Stock No. {product.stockNumber}
            </div>
            <h1 className="text-4xl font-heading font-bold text-primary uppercase leading-tight mb-2">
              {product.name}
            </h1>
            <p className="italic text-lg text-foreground/70 mb-6">{product.tagline}</p>

            <div className="space-y-4 mb-8">
              {product.description.map((paragraph, idx) => (
                <p key={idx} className="text-foreground/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="border-2 border-dashed border-primary/40 bg-accent/10 px-4 py-3 mb-6 flex items-baseline gap-3">
              <span className="text-xs uppercase tracking-widest text-foreground/60">Catalog Price</span>
              <span className="text-3xl font-heading font-bold text-primary">{product.priceLabel}</span>
            </div>

            <AddToCartButton slug={product.slug} productName={product.name} />
          </div>
        </div>

        {/* What's in the Box */}
        <div className="mt-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary uppercase mb-4">
              What&apos;s In the Box
            </h2>
            <ul className="space-y-2">
              {product.whatsInBox.map((item, idx) => (
                <li key={idx} className="flex gap-2 text-foreground/80">
                  <span className="text-secondary font-bold">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety Note */}
          <div className="border-4 border-primary/30 bg-accent/10 p-6 relative">
            <div className="absolute -top-3 left-4 bg-background px-3 text-sm font-heading uppercase tracking-widest text-primary">
              Safety Notes (Read Carefully)
            </div>
            <p className="text-foreground/80 leading-relaxed italic pt-2">
              {product.safetyNote}
            </p>
          </div>
        </div>

        {/* Testimonial pull-quote */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl font-heading italic text-primary leading-relaxed mb-4">
            &ldquo;{product.testimonial.quote}&rdquo;
          </blockquote>
          <div className="text-sm text-foreground/70">
            — {product.testimonial.name}
            {product.testimonial.age ? `, age ${product.testimonial.age}` : ""}
            , {product.testimonial.city}
          </div>
        </div>
      </div>
    </section>
  )
}
