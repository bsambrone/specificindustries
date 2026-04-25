import Image from "next/image"
import Link from "next/link"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { getSiteHref } from "@/lib/site-href"

interface CatalogProductCardProps {
  slug: string
  itemNumber: number
  stockNumber: string
  name: string
  tagline: string
  price: string
  image: string
  badge?: "NEW!" | "BESTSELLER!" | "SALE!"
}

export async function CatalogProductCard({
  slug,
  itemNumber,
  stockNumber,
  name,
  tagline,
  price,
  image,
  badge,
}: CatalogProductCardProps) {
  const siteHref = await getSiteHref()
  const resolvedHref = siteHref(`/products/${slug}`)

  return (
    <div className="relative border-2 border-primary/20 bg-background rounded-sm overflow-hidden group">
      {/* Item # corner badge (top-left) */}
      <div className="absolute top-0 left-0 z-10 bg-primary text-background px-3 py-1 text-sm font-heading tracking-wider">
        ITEM №{itemNumber}
      </div>

      {/* Starburst badge (top-right) */}
      {badge && (
        <div className="absolute top-3 right-3 z-10 w-16 h-16 flex items-center justify-center bg-secondary text-background font-heading text-xs transform rotate-[-12deg] shadow-md"
          style={{
            clipPath:
              "polygon(50% 0%, 61% 20%, 84% 6%, 78% 31%, 100% 50%, 78% 69%, 84% 94%, 61% 80%, 50% 100%, 39% 80%, 16% 94%, 22% 69%, 0% 50%, 22% 31%, 16% 6%, 39% 20%)",
          }}
        >
          {badge}
        </div>
      )}

      {/* Product image */}
      <Link href={resolvedHref}>
        <div className="relative aspect-square bg-secondary/10">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
      </Link>

      {/* Body */}
      <div className="p-4">
        <div className="text-xs font-mono text-foreground/50 mb-1 uppercase tracking-widest">
          Stock No. {stockNumber}
        </div>
        <Link href={resolvedHref}>
          <h3 className="text-xl font-heading font-bold text-primary leading-tight mb-1 uppercase">
            {name}
          </h3>
        </Link>
        <p className="text-sm italic text-foreground/70 mb-4 leading-snug">{tagline}</p>

        {/* Clip-coupon price box */}
        <div className="border-2 border-dashed border-primary/50 px-3 py-2 mb-3 text-center bg-accent/10">
          <div className="text-[10px] uppercase tracking-widest text-foreground/60 leading-none mb-1">
            Catalog Price
          </div>
          <div className="text-2xl font-heading font-bold text-primary leading-none">
            {price}
          </div>
        </div>

        <AddToCartButton slug={slug} productName={name} />
      </div>
    </div>
  )
}
