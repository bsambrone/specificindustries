import Image from "next/image"
import Link from "next/link"
import { getPortrait } from "@/data/testimonial-portraits"
import { getProductBySlug } from "../data/products"

export interface StatChip {
  label: string
  value: string
}

interface ScenarioCardProps {
  title: string
  situation: string
  beat: string
  outcome: string
  pullQuote: string
  illustration: string
  portraitSlug: string
  customerName: string
  customerRole: string
  accessoryUsed?: string
  statChips?: StatChip[]
  variant?: "card" | "hero"
  kind: "prevention" | "recovery"
}

export function ScenarioCard(props: ScenarioCardProps) {
  const {
    title, situation, beat, outcome, pullQuote,
    illustration, portraitSlug, customerName, customerRole,
    accessoryUsed, statChips, variant = "card", kind,
  } = props
  const portrait = getPortrait(portraitSlug)
  const accessory = accessoryUsed ? getProductBySlug(accessoryUsed) : undefined
  const isHero = variant === "hero"

  const badgeText = kind === "prevention" ? "Gamble Won" : "Gamble Lost"
  const badgeColor = kind === "prevention" ? "bg-accent text-secondary" : "bg-primary text-background"

  return (
    <article
      className={`group relative flex flex-col border border-foreground/15 bg-background overflow-hidden ${
        isHero ? "md:flex-row" : ""
      }`}
    >
      <div className={`relative ${isHero ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-[4/3]"} bg-secondary/10`}>
        <Image
          src={illustration}
          alt={title}
          fill
          sizes={isHero ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover"
        />
        <span
          className={`absolute top-3 left-3 ${badgeColor} px-3 py-1 text-[10px] tracking-[0.3em] uppercase font-heading font-semibold`}
        >
          {badgeText}
        </span>
      </div>
      <div className={`flex flex-col gap-4 p-6 ${isHero ? "md:w-1/2" : ""}`}>
        <h3 className="text-xl md:text-2xl font-heading font-semibold leading-tight">{title}</h3>
        <p className="text-sm text-foreground/70 leading-relaxed">{situation}</p>
        <p className="font-mono text-xs text-foreground/60 border-l-2 border-primary pl-3">{beat}</p>
        <p className="text-sm text-foreground leading-relaxed">{outcome}</p>
        <blockquote className="border-l-4 border-primary pl-4 py-1 italic text-foreground/90">
          &ldquo;{pullQuote}&rdquo;
        </blockquote>

        {statChips && statChips.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {statChips.map((chip) => (
              <span
                key={chip.label}
                className="font-mono text-[10px] tracking-wider uppercase border border-foreground/30 px-2 py-1 text-foreground/70"
              >
                <span className="text-primary">{chip.label}:</span> {chip.value}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 pt-4 border-t border-foreground/10">
          {portrait && (
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-foreground/20 flex-shrink-0">
              <Image src={portrait.image} alt={customerName} fill sizes="48px" className="object-cover" />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold">{customerName}</p>
            <p className="text-xs text-foreground/60">{customerRole}</p>
          </div>
        </div>

        {accessory && (
          <Link
            href={`/products/${accessory.slug}`}
            className="mt-2 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-primary hover:text-foreground transition-colors"
          >
            <span>Engaged:</span>
            <span className="font-heading font-semibold">{accessory.name}</span>
            <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </article>
  )
}
