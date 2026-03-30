import Image from "next/image"

interface ExecutiveCardProps {
  name: string
  title: string
  credentials: string
  bio: string
  highlights?: { label: string; value: string }[]
  publications?: string[]
  quote: string
  image: string
}

export function ExecutiveCard({ name, title, credentials, bio, highlights, publications, quote, image }: ExecutiveCardProps) {
  return (
    <div className="border border-primary/10 rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Photo */}
        <div className="shrink-0">
          <div className="relative w-full md:w-56 aspect-[4/5] bg-secondary/20">
            <Image src={image} alt={name} fill className="object-cover object-top" />
          </div>
        </div>

        {/* Header info — overlaps on mobile, beside photo on desktop */}
        <div className="flex-1 p-6">
          <h3 className="text-2xl font-heading font-semibold text-primary">{name}</h3>
          <p className="text-accent font-medium mt-1">{title}</p>
          <p className="text-xs text-foreground/40 tracking-wider mt-2">{credentials}</p>

          {/* Bio — shorter now */}
          <p className="text-sm text-foreground/70 leading-relaxed mt-4">{bio}</p>

          {/* Quote */}
          <blockquote className="border-l-2 border-accent/40 pl-4 mt-4 text-sm text-foreground/60 italic">
            &ldquo;{quote}&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Structured highlights + publications */}
      {(highlights || publications) && (
        <div className="border-t border-primary/10 px-6 py-5">
          {highlights && highlights.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {highlights.map((h, i) => (
                <div key={i} className="flex justify-between py-1.5 border-b border-primary/5 last:border-0">
                  <span className="text-xs text-foreground/40">{h.label}</span>
                  <span className="text-xs text-foreground/70 font-medium text-right ml-4">{h.value}</span>
                </div>
              ))}
            </div>
          )}

          {publications && publications.length > 0 && (
            <div className="mt-4">
              <span className="text-xs text-foreground/40 uppercase tracking-wider">Publications & Talks</span>
              <ul className="mt-2 space-y-1">
                {publications.map((pub, i) => (
                  <li key={i} className="text-xs text-foreground/60 flex items-start gap-2">
                    <span className="text-accent mt-0.5 shrink-0">—</span>
                    {pub}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
