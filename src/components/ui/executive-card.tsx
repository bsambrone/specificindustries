import Image from "next/image"

interface ExecutiveCardProps {
  name: string
  title: string
  credentials: string
  bio: string
  quote: string
  image: string
}

export function ExecutiveCard({ name, title, credentials, bio, quote, image }: ExecutiveCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="shrink-0">
        <div className="relative w-48 aspect-[3/4] overflow-hidden rounded-lg bg-secondary/20">
          <Image src={image} alt={name} fill className="object-cover object-top" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-heading font-semibold text-primary mb-1">{name}</h3>
        <p className="text-accent font-medium mb-1">{title}</p>
        <p className="text-xs text-foreground/50 uppercase tracking-wider mb-4">{credentials}</p>
        <p className="text-foreground/70 text-sm leading-relaxed mb-5">{bio}</p>
        <blockquote className="border-l-4 border-accent pl-4 text-foreground/80 italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>
    </div>
  )
}
