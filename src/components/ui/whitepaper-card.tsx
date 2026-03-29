"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"

interface WhitepaperCardProps {
  slug: string
  title: string
  type: "strategic" | "product"
  solutionArea: string
  readTime: string
  authors: string[]
}

export function WhitepaperCard({ slug, title, type, solutionArea, readTime, authors }: WhitepaperCardProps) {
  const siteHref = useSiteLink()

  return (
    <Link href={siteHref(`/whitepapers/${slug}`)}>
      <div className="border border-primary/20 rounded-lg p-6 hover:border-accent hover:shadow-sm transition-all group h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-block text-xs font-heading uppercase tracking-wider px-3 py-1 rounded ${
              type === "strategic"
                ? "bg-primary/10 text-primary"
                : "bg-accent/10 text-accent"
            }`}
          >
            {type}
          </span>
          <span className="text-xs text-foreground/50">{solutionArea}</span>
        </div>
        <h3 className="text-base font-heading font-semibold text-primary mb-4 leading-snug flex-1 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between text-xs text-foreground/50 mt-2 pt-3 border-t border-primary/10">
          <span>{readTime}</span>
          <span>{authors.join(", ")}</span>
        </div>
      </div>
    </Link>
  )
}
