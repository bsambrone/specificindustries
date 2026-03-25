import Link from "next/link"

interface CTABannerProps {
  headline: string
  description?: string
  ctaText: string
  ctaHref: string
}

export function CTABanner({ headline, description, ctaText, ctaHref }: CTABannerProps) {
  return (
    <section className="py-16 px-4 bg-primary text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-heading font-bold mb-4">{headline}</h2>
        {description && <p className="text-white/80 mb-8">{description}</p>}
        <Link
          href={ctaHref}
          className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  )
}
