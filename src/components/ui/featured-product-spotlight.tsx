import Image from "next/image"
import Link from "next/link"

interface FeaturedProductSpotlightProps {
  image: string
  eyebrow?: string
  title: string
  description: string
  ctaText: string
  ctaHref: string
  imagePosition?: "left" | "right"
}

export function FeaturedProductSpotlight({
  image,
  eyebrow,
  title,
  description,
  ctaText,
  ctaHref,
  imagePosition = "right",
}: FeaturedProductSpotlightProps) {
  const imageBlock = (
    <div className="relative min-h-[300px] md:min-h-[400px] bg-secondary/10">
      <Image src={image} alt={title} fill className="object-cover" />
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
      {eyebrow && (
        <span className="text-accent text-xs font-heading tracking-[0.2em] uppercase mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
        {title}
      </h2>
      <p className="text-foreground/70 mb-6 leading-relaxed">{description}</p>
      <div>
        <Link
          href={ctaHref}
          className="inline-block px-8 py-3 bg-primary text-white font-heading text-sm tracking-wider uppercase hover:opacity-90 transition-opacity"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  )

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </section>
  )
}
