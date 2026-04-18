import Image from "next/image"
import Link from "next/link"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { ConsultationButton } from "./ConsultationButton"
import { getSiteHref } from "@/lib/site-href"
import type { Product } from "../data/products"

interface PrivatrixProductCardProps {
  product: Product
}

export async function PrivatrixProductCard({ product }: PrivatrixProductCardProps) {
  const siteHref = await getSiteHref()
  const detailHref = siteHref(`/products/${product.slug}`)
  const priceDisplay = product.priceLabel ?? "Contact Sales"
  const tierLabel = product.tier === "enterprise" ? "Enterprise" : "Self-Serve"
  const tierBadgeClass =
    product.tier === "enterprise"
      ? "bg-accent text-white"
      : "bg-secondary/10 text-secondary"

  return (
    <div className="border border-primary/10 rounded-lg overflow-hidden hover:border-primary/30 transition-colors bg-white flex flex-col">
      <Link href={detailHref}>
        <div className="relative aspect-square bg-primary/5">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${tierBadgeClass}`}>
            {tierLabel}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-foreground/50">
            {product.category}
          </span>
        </div>
        <Link href={detailHref}>
          <h3 className="text-lg font-heading font-semibold text-primary mb-1 hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-foreground/60 mb-3 flex-1">{product.tagline}</p>
        <p className="text-base font-semibold text-primary mb-3">{priceDisplay}</p>
        {product.tier === "self-serve" ? (
          <AddToCartButton
            slug={product.slug}
            productName={product.name}
            className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          />
        ) : (
          <ConsultationButton
            productName={product.name}
            className="w-full px-4 py-2 bg-accent text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          />
        )}
      </div>
    </div>
  )
}
