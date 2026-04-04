import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"

interface SolutionCardProps {
  name: string
  tagline: string
  productCount: number
  slug: string
  icon?: string
  image?: string
}

export async function SolutionCard({ name, tagline, productCount, slug, icon, image }: SolutionCardProps) {
  const siteHref = await getSiteHref()

  return (
    <Link href={siteHref(`/solutions/${slug}`)}>
      <div className="border border-primary/20 rounded-lg overflow-hidden hover:border-accent hover:shadow-sm transition-all group">
        {image && (
          <div className="relative aspect-[3/2] bg-secondary/20">
            <Image src={image} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        <div className="p-6">
          {icon && !image && (
            <div className="text-3xl mb-4">{icon}</div>
          )}
          <h3 className="text-lg font-heading font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="text-sm text-foreground/60 mb-4 leading-relaxed">{tagline}</p>
          <p className="text-xs text-accent font-medium uppercase tracking-wider">
            {productCount} {productCount === 1 ? "product" : "products"}
          </p>
        </div>
      </div>
    </Link>
  )
}
