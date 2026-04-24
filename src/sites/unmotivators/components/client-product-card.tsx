"use client"

import Image from "next/image"
import Link from "next/link"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { useSiteLink } from "@/hooks/use-site-link"

interface ClientProductCardProps {
  slug: string
  name: string
  price: string
  tagline: string
  image: string
  showAddToCart?: boolean
}

export function ClientProductCard({
  slug,
  name,
  price,
  tagline,
  image,
  showAddToCart = true,
}: ClientProductCardProps) {
  const siteHref = useSiteLink()
  const href = siteHref(`/products/${slug}`)

  return (
    <div className="border border-foreground/20 bg-background hover:border-foreground transition-colors">
      <Link href={href}>
        <div className="relative aspect-square bg-secondary/40">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-5">
        <Link href={href}>
          <h3 className="font-heading text-lg uppercase tracking-tight text-foreground leading-tight mb-1 hover:underline">
            {name}
          </h3>
        </Link>
        <p className="text-sm italic text-foreground/70 mb-4 leading-snug">{tagline}</p>
        <p className="font-heading text-xl text-accent mb-4">{price}</p>
        {showAddToCart && (
          <AddToCartButton
            slug={slug}
            productName={name}
            className="w-full px-4 py-2.5 bg-accent text-[#F5F3EE] font-heading uppercase tracking-wide hover:opacity-90 transition-opacity"
          />
        )}
      </div>
    </div>
  )
}
