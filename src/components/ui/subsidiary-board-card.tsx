import Image from "next/image"

export interface SubsidiaryBoardCardProps {
  subsiteName: string
  subsiteFavicon: string
  leaderPortrait: string | null
  nameThere: string
  titleThere: string
  blurb: string
  href: string
}

export function SubsidiaryBoardCard({
  subsiteName,
  subsiteFavicon,
  leaderPortrait,
  nameThere,
  titleThere,
  blurb,
  href,
}: SubsidiaryBoardCardProps) {
  const portraitSrc = leaderPortrait ?? subsiteFavicon

  return (
    <a
      href={href}
      className="flex gap-4 p-5 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors"
    >
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-secondary/10">
        <Image
          src={portraitSrc}
          alt={`${nameThere} — ${subsiteName}`}
          fill
          sizes="80px"
          className="object-cover"
        />
        <div className="absolute bottom-0 right-0 w-6 h-6 rounded-tl-md bg-background border-t border-l border-primary/10 p-0.5">
          <div className="relative w-full h-full">
            <Image
              src={subsiteFavicon}
              alt={`${subsiteName} logo`}
              fill
              sizes="24px"
              className="object-contain"
            />
          </div>
        </div>
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
