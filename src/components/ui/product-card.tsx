import Image from "next/image"
import Link from "next/link"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { useSiteLink } from "@/hooks/use-site-link"

interface ProductCardProps {
  slug: string
  name: string
  price: string
  tagline: string
  image: string
  showAddToCart?: boolean
}

export function ProductCard({ slug, name, price, tagline, image, showAddToCart = true }: ProductCardProps) {
  const siteHref = useSiteLink()

  return (
    <div className="border border-primary/10 rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
      <Link href={siteHref(`/products/${slug}`)}>
        <div className="relative aspect-square bg-secondary/10">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-4 text-center">
        <Link href={siteHref(`/products/${slug}`)}>
          <h3 className="text-lg font-heading font-semibold text-primary mb-1">{name}</h3>
        </Link>
        <p className="text-sm text-foreground/60 mb-2">{tagline}</p>
        <p className="text-lg font-semibold text-accent mb-3">{price}</p>
        {showAddToCart && <AddToCartButton slug={slug} productName={name} />}
      </div>
    </div>
  )
}
