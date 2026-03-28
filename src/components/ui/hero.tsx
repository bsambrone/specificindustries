import Image from "next/image"
import Link from "next/link"

interface HeroProps {
  headline: string
  subheadline?: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  image?: string
  dark?: boolean
}

export function Hero({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  image,
  dark = false,
}: HeroProps) {
  const hasCta = ctaText && ctaHref
  const hasSecondaryCta = secondaryCtaText && secondaryCtaHref
  const hasImage = !!image

  // Determine text colors
  const textWhite = hasImage || dark
  const headlineColor = textWhite ? "text-white" : "text-primary"
  const subColor = textWhite ? "text-white/80" : "text-foreground/60"

  return (
    <section
      className={`relative py-24 md:py-32 px-4 ${
        dark && !hasImage
          ? "bg-gradient-to-br from-primary to-accent/40"
          : hasImage
          ? ""
          : "bg-secondary/30"
      }`}
    >
      {hasImage && (
        <Image
          src={image}
          alt=""
          fill
          className="object-cover brightness-50"
          priority
        />
      )}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className={`text-4xl md:text-5xl font-heading font-bold ${headlineColor} mb-4`}>
          {headline}
        </h1>
        {subheadline && (
          <p className={`text-lg md:text-xl ${subColor} mb-8 max-w-xl mx-auto`}>
            {subheadline}
          </p>
        )}
        {(hasCta || hasSecondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {hasCta && (
              <Link
                href={ctaHref}
                className={`inline-block px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity ${
                  textWhite
                    ? "bg-white text-primary"
                    : "bg-primary text-white"
                }`}
              >
                {ctaText}
              </Link>
            )}
            {hasSecondaryCta && (
              <Link
                href={secondaryCtaHref}
                className="inline-block px-8 py-3 rounded-lg font-semibold border border-white/50 text-white hover:bg-white/10 transition-colors"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
