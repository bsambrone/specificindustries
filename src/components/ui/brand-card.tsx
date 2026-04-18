import Image from "next/image"
import type { SiteConfig } from "@/themes"

export interface BrandCardProps {
  subdomain: string
  config: SiteConfig
  href: string
  compact?: boolean
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max - 1).trimEnd() + "…"
}

export function BrandCard({ subdomain, config, href, compact = false }: BrandCardProps) {
  const tagline = config.tagline ?? truncate(config.metadata.description, 80)
  const accent = config.theme.colors.primary

  return (
    <a
      href={href}
      className={
        compact
          ? "group flex items-start gap-3 p-4 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors h-full"
          : "group flex items-start gap-4 p-5 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors h-full"
      }
      style={{ borderTopColor: accent, borderTopWidth: "3px" }}
    >
      <div className={compact ? "relative w-10 h-10 flex-shrink-0" : "relative w-12 h-12 flex-shrink-0"}>
        <Image
          src={`/sites/${subdomain}/favicon.png`}
          alt={`${config.name} logo`}
          fill
          sizes={compact ? "40px" : "48px"}
          className="object-contain"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className={compact ? "text-base font-heading font-semibold text-primary mb-1 leading-tight" : "text-lg font-heading font-semibold text-primary mb-1 leading-tight"}>
          {config.name}
        </h3>
        <p className={compact ? "text-xs text-foreground/60 leading-snug" : "text-sm text-foreground/70 leading-snug"}>
          {tagline}
        </p>
      </div>
    </a>
  )
}
