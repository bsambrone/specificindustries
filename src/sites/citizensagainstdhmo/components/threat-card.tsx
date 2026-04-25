import Image from "next/image"
import Link from "next/link"
import type { Threat } from "@/sites/citizensagainstdhmo/data/threats"

interface ThreatCardProps {
  threat: Threat
}

export function ThreatCard({ threat }: ThreatCardProps) {
  return (
    <Link
      href={`/threats/${threat.slug}`}
      className="group block border border-accent/30 rounded-lg overflow-hidden bg-white hover:border-primary/40 transition-colors"
    >
      <div className="relative w-full aspect-[16/10] bg-secondary/10">
        <Image src={threat.heroImage} alt={threat.name} fill className="object-cover" />
      </div>
      <div className="p-5">
        <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">
          {categoryLabel(threat.category)}
        </p>
        <h3 className="text-lg font-heading font-semibold text-primary mb-2 leading-snug group-hover:text-secondary transition-colors">
          {threat.name}
        </h3>
        <p className="text-sm text-foreground/60 leading-relaxed">{threat.tagline}</p>
      </div>
    </Link>
  )
}

function categoryLabel(category: Threat["category"]): string {
  switch (category) {
    case "tech": return "Tech & AI"
    case "wellness": return "Wellness"
    case "ubiquity": return "Ubiquity"
    case "children": return "Children's Safety"
    case "climate": return "Climate"
    case "classic": return "Documented Hazard"
  }
}
