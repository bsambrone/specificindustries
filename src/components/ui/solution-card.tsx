"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"

interface SolutionCardProps {
  name: string
  tagline: string
  productCount: number
  slug: string
  icon?: string
}

export function SolutionCard({ name, tagline, productCount, slug, icon }: SolutionCardProps) {
  const siteHref = useSiteLink()

  return (
    <Link href={siteHref(`/solutions/${slug}`)}>
      <div className="border border-primary/20 rounded-lg p-6 hover:border-accent hover:shadow-sm transition-all group">
        {icon && (
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
    </Link>
  )
}
