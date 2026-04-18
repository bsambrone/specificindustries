import { BrandCard } from "./brand-card"
import type { PortfolioBrand } from "@/sites/apex/data/portfolio-utils"
import type { VerticalMeta } from "@/sites/apex/data/verticals"

export interface VerticalSectionProps {
  meta: VerticalMeta
  brands: PortfolioBrand[]
  hrefFor: (subdomain: string) => string
  showViewAllLink?: boolean
  viewAllHref?: string
}

export function VerticalSection({
  meta,
  brands,
  hrefFor,
  showViewAllLink = false,
  viewAllHref,
}: VerticalSectionProps) {
  if (brands.length === 0) return null

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
            {meta.displayName}
          </h2>
          <span className="text-xs uppercase tracking-[0.15em] text-foreground/50 font-heading">
            {brands.length} {brands.length === 1 ? "brand" : "brands"}
          </span>
        </div>
        <p className="text-foreground/70 leading-relaxed max-w-3xl mb-8">
          {meta.shortDescription}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <BrandCard
              key={brand.subdomain}
              subdomain={brand.subdomain}
              config={brand.config}
              href={hrefFor(brand.subdomain)}
              compact
            />
          ))}
        </div>
        {showViewAllLink && viewAllHref && (
          <div className="mt-6">
            <a
              href={viewAllHref}
              className="text-sm font-heading text-primary hover:underline"
            >
              View all in {meta.displayName} →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
