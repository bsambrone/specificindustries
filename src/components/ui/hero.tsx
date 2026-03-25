import Link from "next/link"

interface HeroProps {
  headline: string
  subheadline?: string
  ctaText?: string
  ctaHref?: string
}

export function Hero({ headline, subheadline, ctaText, ctaHref }: HeroProps) {
  return (
    <section className="py-20 px-4 text-center bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-heading font-bold text-foreground mb-6">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-xl text-foreground/70 mb-8">{subheadline}</p>
        )}
        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
