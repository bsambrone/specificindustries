import Image from "next/image"
import Link from "next/link"

interface GlossyProductHeroProps {
  name: string
  tagline: string
  image: string
  startingPrice: number
  subscriptionNote?: string
  ctaHref?: string
  ctaText?: string
  secondaryCtaHref?: string
  secondaryCtaText?: string
}

export function GlossyProductHero({
  name,
  tagline,
  image,
  startingPrice,
  subscriptionNote,
  ctaHref,
  ctaText = "Buy",
  secondaryCtaHref,
  secondaryCtaText = "Learn more",
}: GlossyProductHeroProps) {
  return (
    <section className="bg-background py-20 md:py-28 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-heading font-light tracking-tight text-primary mb-3">
          {name}
        </h1>
        <p className="text-xl md:text-2xl text-primary/70 font-light mb-12">
          {tagline}
        </p>
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-w-3xl mx-auto mb-12">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
        <div className="flex flex-col items-center gap-2 mb-8">
          <p className="text-lg text-primary">
            From <span className="font-semibold">${startingPrice}</span>
          </p>
          {subscriptionNote && (
            <p className="text-sm text-primary/60">{subscriptionNote}</p>
          )}
        </div>
        {(ctaHref || secondaryCtaHref) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaHref && (
              <Link
                href={ctaHref}
                className="inline-block px-8 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition-opacity"
              >
                {ctaText}
              </Link>
            )}
            {secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="inline-block px-8 py-3 rounded-full text-accent font-medium hover:underline"
              >
                {secondaryCtaText} &rsaquo;
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
