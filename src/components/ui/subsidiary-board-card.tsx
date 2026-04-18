import Image from "next/image"

export interface SubsidiaryBoardCardProps {
  subsiteName: string
  subsiteFavicon: string
  nameThere: string
  titleThere: string
  blurb: string
  href: string
}

export function SubsidiaryBoardCard({
  subsiteName,
  subsiteFavicon,
  nameThere,
  titleThere,
  blurb,
  href,
}: SubsidiaryBoardCardProps) {
  return (
    <a
      href={href}
      className="flex gap-4 p-5 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors"
    >
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src={subsiteFavicon}
          alt={`${subsiteName} logo`}
          fill
          sizes="40px"
          className="object-contain"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 font-heading mb-0.5">{subsiteName}</p>
        <h4 className="text-base font-heading font-semibold text-primary leading-tight">{nameThere}</h4>
        <p className="text-xs text-foreground/60 uppercase tracking-wider font-heading mb-1">{titleThere}</p>
        {blurb && <p className="text-sm text-foreground/70 leading-snug">{blurb}</p>}
      </div>
    </a>
  )
}
