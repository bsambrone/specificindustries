import Link from "next/link"

interface PromoBannerProps {
  headline: string
  subtext?: string
  ctaText?: string
  ctaHref?: string
}

export function PromoBanner({ headline, subtext, ctaText, ctaHref }: PromoBannerProps) {
  return (
    <section className="py-10 px-4 bg-gradient-to-r from-accent to-primary text-center">
      <div className="max-w-3xl mx-auto">
        <p className="text-xl md:text-2xl font-heading font-bold text-white">{headline}</p>
        {subtext && <p className="text-white/70 text-sm mt-2">{subtext}</p>}
        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-block mt-4 px-8 py-3 border border-white text-white font-heading text-sm tracking-wider uppercase hover:bg-white/10 transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
