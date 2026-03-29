import Image from "next/image"

interface ClientQuoteProps {
  quote: string
  name: string
  role: string
  company: string
  image?: string
}

export function ClientQuote({ quote, name, role, company, image }: ClientQuoteProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-accent/10 rounded-2xl border border-accent/20 p-10">
          {image && (
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-accent/30 mb-6">
              <Image src={image} alt={name} fill className="object-cover object-top" />
            </div>
          )}
          <blockquote className="text-lg text-foreground italic leading-relaxed mb-6">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div>
            <p className="font-heading font-semibold text-foreground">{name}</p>
            <p className="text-sm text-foreground/60">
              {role}, {company}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
