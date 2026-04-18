import Image from "next/image"
import { SpecReadout } from "./spec-readout"
import type { Product } from "../data/products"

interface DemoSequenceBlockProps {
  product: Product
  engineerName?: string
  engineerTitle?: string
  pullQuote?: string
}

export function DemoSequenceBlock({
  product,
  engineerName = "Dr. Eleanor Whittaker",
  engineerTitle = "Head of Containment Engineering",
  pullQuote,
}: DemoSequenceBlockProps) {
  const frames = [
    { src: product.galleryImages[0] ?? product.heroImage, label: "Before" },
    { src: product.galleryImages[1] ?? product.heroImage, label: "Engaged" },
  ]

  const specRows = Object.entries(product.specs).slice(0, 5).map(([label, value]) => ({ label, value }))

  return (
    <section className="py-16 px-4 border-t border-foreground/10 odd:bg-secondary/5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10 items-start">
        <div className="md:col-span-3">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2 font-heading">Demonstration · {product.category.toUpperCase()}</p>
          <h3 className="text-3xl font-heading font-semibold mb-6">{product.name}</h3>
          <div className="grid grid-cols-2 gap-4">
            {frames.map((f) => (
              <figure key={f.label} className="relative aspect-[4/3] bg-background border border-foreground/15">
                <Image src={f.src} alt={`${product.name} ${f.label}`} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-secondary/90 text-background text-[10px] tracking-[0.3em] uppercase text-center py-1">
                  {f.label}
                </figcaption>
              </figure>
            ))}
          </div>
          {pullQuote && (
            <blockquote className="mt-6 border-l-4 border-primary pl-4 py-1 italic text-foreground/90">
              &ldquo;{pullQuote}&rdquo;
              <footer className="not-italic text-xs text-foreground/60 mt-2">
                — {engineerName}, {engineerTitle}
              </footer>
            </blockquote>
          )}
        </div>
        <div className="md:col-span-2">
          <SpecReadout title={`${product.name.toUpperCase()} · LIVE`} rows={specRows} variant="dark" />
        </div>
      </div>
    </section>
  )
}
