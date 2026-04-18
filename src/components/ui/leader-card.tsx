import Image from "next/image"
import Link from "next/link"

export interface LeaderCardProps {
  portraitImage: string
  name: string
  title: string
  bio?: string
  detailHref?: string
}

export function LeaderCard({ portraitImage, name, title, bio, detailHref }: LeaderCardProps) {
  const content = (
    <article className="flex flex-col gap-3 text-center">
      <div className="relative w-full aspect-square max-w-[200px] mx-auto overflow-hidden rounded-lg bg-secondary/10">
        <Image src={portraitImage} alt={name} fill sizes="200px" className="object-cover" />
      </div>
      <div>
        <h3 className="text-lg font-heading font-semibold text-primary">{name}</h3>
        <p className="text-sm text-foreground/60 uppercase tracking-wider font-heading">{title}</p>
      </div>
      {bio && <p className="text-sm text-foreground/70 leading-relaxed">{bio}</p>}
      {detailHref && (
        <span className="text-xs font-heading text-primary uppercase tracking-wider mt-1">
          View full history →
        </span>
      )}
    </article>
  )
  if (detailHref) {
    return (
      <Link href={detailHref} className="group block hover:opacity-90 transition-opacity">
        {content}
      </Link>
    )
  }
  return content
}
