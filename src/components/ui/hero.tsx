import Link from "next/link"
import Image from "next/image"

interface HeroProps {
  headline: string
  subheadline?: string
  ctaText?: string
  ctaHref?: string
  image?: string
}

export function Hero({ headline, subheadline, ctaText, ctaHref, image }: HeroProps) {
  return (
    <section className={`relative py-20 px-4 text-center ${image ? "" : "bg-secondary/30"}`}>
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
      )}
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-5xl font-heading font-bold mb-6 ${image ? "text-white" : "text-foreground"}`}>
          {headline}
        </h1>
        {subheadline && (
          <p className={`text-xl mb-8 ${image ? "text-white/80" : "text-foreground/70"}`}>
            {subheadline}
          </p>
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
