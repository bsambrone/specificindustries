import Image from "next/image"

interface ExecutiveQuoteProps {
  quote: string
  name: string
  title: string
  image: string
}

export function ExecutiveQuote({ quote, name, title, image }: ExecutiveQuoteProps) {
  return (
    <section className="py-16 px-4 bg-primary/5">
      <div className="max-w-3xl mx-auto">
        <div className="bg-background rounded-2xl border border-primary/10 p-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="shrink-0">
            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-accent/20">
              <Image src={image} alt={name} fill className="object-cover object-top" />
            </div>
          </div>
          <div>
            <blockquote className="text-lg text-foreground/80 italic leading-relaxed mb-4">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <div>
              <p className="font-heading font-semibold text-foreground">{name}</p>
              <p className="text-sm text-foreground/60">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
